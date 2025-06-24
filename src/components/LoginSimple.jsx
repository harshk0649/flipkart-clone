import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginSimple = ({ isOpen, onClose, switchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting login with:", { email, password });
    const result = await login(email, password);
    if (result.success) {
      onClose();
    }
  };

  const fillDemo = () => {
    setEmail("demo@flipkart.com");
    setPassword("demo123");
  };

  if (!isOpen) return null;

  const modalStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "9999",
  };

  const containerStyle = {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "8px",
    width: "450px",
    maxWidth: "90vw",
    position: "relative",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "15px",
    right: "20px",
    background: "none",
    border: "none",
    fontSize: "28px",
    cursor: "pointer",
    color: "#666",
    lineHeight: "1",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "8px",
    marginTop: "0",
    color: "#333",
  };

  const subtitleStyle = {
    fontSize: "14px",
    color: "#666",
    marginBottom: "25px",
  };

  const demoBoxStyle = {
    marginBottom: "25px",
    padding: "15px",
    backgroundColor: "#f0f8ff",
    borderRadius: "6px",
    border: "1px solid #2196f3",
  };

  const demoButtonStyle = {
    padding: "8px 16px",
    backgroundColor: "#2196f3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "8px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#333",
    fontSize: "14px",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "2px solid #ddd",
    borderRadius: "6px",
    fontSize: "16px",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: "#2196f3",
  };

  const submitButtonStyle = {
    width: "100%",
    padding: "14px",
    backgroundColor: loading ? "#ccc" : "#2874f0",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: loading ? "not-allowed" : "pointer",
    fontWeight: "600",
    marginTop: "10px",
  };

  const errorStyle = {
    backgroundColor: "#ffebee",
    color: "#c62828",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "20px",
    fontSize: "14px",
  };

  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={containerStyle} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={closeButtonStyle}>
          ×
        </button>

        <h2 style={titleStyle}>Login</h2>
        <p style={subtitleStyle}>
          Get access to your Orders, Wishlist and Recommendations
        </p>

        {error && <div style={errorStyle}>{error}</div>}

        <div style={demoBoxStyle}>
          <div style={{ marginBottom: "8px", fontSize: "14px" }}>
            <strong>Demo Account:</strong>
            <br />
            Email: demo@flipkart.com
            <br />
            Password: demo123
          </div>
          <button type="button" onClick={fillDemo} style={demoButtonStyle}>
            Fill Demo Credentials
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              placeholder="Enter your email"
              required
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" disabled={loading} style={submitButtonStyle}>
            {loading ? "Signing In..." : "Login"}
          </button>

          <div
            style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}
          >
            <span style={{ color: "#666" }}>New to Flipkart? </span>
            <button
              type="button"
              onClick={switchToSignup}
              style={{
                background: "none",
                border: "none",
                color: "#2874f0",
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "14px",
              }}
            >
              Create an account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSimple;
