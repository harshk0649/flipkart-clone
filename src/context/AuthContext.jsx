import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: true, 
        user: action.payload,
        error: null 
      };
    case 'LOGIN_FAILURE':
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: false, 
        user: null,
        error: action.payload 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        isAuthenticated: false, 
        user: null,
        error: null 
      };
    case 'UPDATE_PROFILE':
      return { 
        ...state, 
        user: { ...state.user, ...action.payload }
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null
};

// Mock users database (in real app, this would be API calls)
const mockUsers = [
  {
    id: 1,
    email: 'demo@flipkart.com',
    password: 'demo123',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+91 9876543210',
    addresses: [
      {
        id: 1,
        type: 'Home',
        name: 'John Doe',
        phone: '+91 9876543210',
        address: '123 Main Street, Apartment 4B',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        isDefault: true
      }
    ],
    orders: [],
    wishlist: []
  }
];

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('flipkart_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('flipkart_user');
      }
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock database
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('flipkart_user', JSON.stringify(userWithoutPassword));
        dispatch({ type: 'LOGIN_SUCCESS', payload: userWithoutPassword });
        return { success: true };
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Signup function
  const signup = async (userData) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user
      const newUser = {
        id: mockUsers.length + 1,
        ...userData,
        addresses: [],
        orders: [],
        wishlist: []
      };
      
      mockUsers.push(newUser);
      
      const { password: _, ...userWithoutPassword } = newUser;
      localStorage.setItem('flipkart_user', JSON.stringify(userWithoutPassword));
      dispatch({ type: 'LOGIN_SUCCESS', payload: userWithoutPassword });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('flipkart_user');
    dispatch({ type: 'LOGOUT' });
  };

  // Update profile function
  const updateProfile = (profileData) => {
    const updatedUser = { ...state.user, ...profileData };
    localStorage.setItem('flipkart_user', JSON.stringify(updatedUser));
    dispatch({ type: 'UPDATE_PROFILE', payload: profileData });
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    signup,
    logout,
    updateProfile,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
