import React, { createContext, useContext, useReducer, useEffect } from "react";

// Simple mock-only authentication for now
const apiService = null;

const AuthContext = createContext();

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case "CLEAR_ERROR":
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
  error: null,
};

// Mock authentication - no external database needed

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("flipkart_user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
      } catch (error) {
        localStorage.removeItem("flipkart_user");
      }
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    dispatch({ type: "LOGIN_START" });

    try {
      // Try API first, fallback to mock if API fails
      if (apiService) {
        try {
          const response = await apiService.login(email, password);

          if (response.success && response.data) {
            const userData = response.data.user;
            localStorage.setItem("flipkart_user", JSON.stringify(userData));
            localStorage.setItem("auth_token", response.data.token);
            dispatch({ type: "LOGIN_SUCCESS", payload: userData });
            return { success: true };
          } else {
            throw new Error("Login failed");
          }
        } catch (apiError) {
          console.warn(
            "API login failed, trying mock login:",
            apiError.message
          );
        }
      } else {
        console.log("API service not available, using mock login");
      }

      // Fallback to mock login
      if (email === "demo@flipkart.com" && password === "demo123") {
        const mockUser = {
          id: 1,
          email: "demo@flipkart.com",
          firstName: "John",
          lastName: "Doe",
          phone: "+91 9876543210",
        };
        localStorage.setItem("flipkart_user", JSON.stringify(mockUser));
        dispatch({ type: "LOGIN_SUCCESS", payload: mockUser });
        return { success: true };
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      const errorMessage = error.message || "Invalid email or password";
      dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Signup function
  const signup = async (userData) => {
    dispatch({ type: "LOGIN_START" });

    try {
      // Try API first, fallback to mock if API fails
      if (apiService) {
        try {
          const response = await apiService.signup(userData);

          if (response.success && response.data) {
            const userInfo = response.data.user;
            localStorage.setItem("flipkart_user", JSON.stringify(userInfo));
            localStorage.setItem("auth_token", response.data.token);
            dispatch({ type: "LOGIN_SUCCESS", payload: userInfo });
            return { success: true };
          } else {
            throw new Error("Signup failed");
          }
        } catch (apiError) {
          console.warn(
            "API signup failed, using mock signup:",
            apiError.message
          );
        }
      } else {
        console.log("API service not available, using mock signup");
      }

      // Fallback to mock signup
      const mockUser = {
        id: Date.now(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
      };
      localStorage.setItem("flipkart_user", JSON.stringify(mockUser));
      dispatch({ type: "LOGIN_SUCCESS", payload: mockUser });
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || "Signup failed";
      dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("flipkart_user");
    localStorage.removeItem("auth_token");
    if (apiService && apiService.setToken) {
      apiService.setToken(null);
    }
    dispatch({ type: "LOGOUT" });
  };

  // Update profile function
  const updateProfile = (profileData) => {
    const updatedUser = { ...state.user, ...profileData };
    localStorage.setItem("flipkart_user", JSON.stringify(updatedUser));
    dispatch({ type: "UPDATE_PROFILE", payload: profileData });
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const value = {
    ...state,
    login,
    signup,
    logout,
    updateProfile,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
