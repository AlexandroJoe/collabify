import React, { useState } from "react";
import logo from "./logo.png";

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignUp,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;

  const [emailErrorSU, setEmailErrorSU] = useState("");
  const [passwordErrorSU, setPasswordErrorSU] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;

  const register = () => {
    if (password === confirmPassword) {
      handleSignUp(email, password);
    } else {
      setConfirmError("Passwords do not match");
    }
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    if (!hasAccount && !emailRegex.test(inputEmail)) {
      setEmailErrorSU("Please enter a valid email address");
    } else {
      setEmailErrorSU("");
    }
    setShowError(false); // Reset showError state
  };

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    if (!hasAccount && !passwordRegex.test(inputPassword)) {
      setPasswordErrorSU(
        "Password must contain at least 8 characters, including one numeric digit and one uppercase letter"
      );
    } else {
      setPasswordErrorSU("");
    }
    setShowError(false); // Reset showError state
  };

  const handleConfirmPasswordChange = (e) => {
    const inputConfirmPassword = e.target.value;
    setConfirmPassword(inputConfirmPassword);
    if (!hasAccount && inputConfirmPassword !== password) {
      setConfirmError("Passwords do not match");
    } else {
      setConfirmError("");
    }
    setShowError(false); // Reset showError state
  };

  const handleSignToggle = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setEmailErrorSU("");
    setPasswordErrorSU("");
    setConfirmError("");
    setShowError(false); // Reset showError state
    setHasAccount(!hasAccount);
  };

  const handleLoginClick = () => {
    setShowError(true);
    handleLogin();
  };

  const isSignUpDisabled =
    !hasAccount || emailErrorSU || passwordErrorSU || confirmError;

  return (
    <section className="login">
      <div className="appName">
        <img src={logo} alt="Logo" />
        <h1>Collabify</h1>
      </div>
      <div className="loginContainer">
        {hasAccount ? (
          <>
            <h1 className="title">Login to Collabify</h1>
            <label>Email</label>
            <input
              type="text"
              autoFocus
              required
              value={email}
              onChange={handleEmailChange}
            />
            {showError && email && <p className="errorMsg">{emailError}</p>}
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            {showError && password && <p className="errorMsg">{passwordError}</p>}
          </>
        ) : (
          <>
            <h1 className="title">Join us at Collabify</h1>
            <label>Email</label>
            <input
              type="text"
              autoFocus
              required
              value={email}
              onChange={handleEmailChange}
            />
            {!hasAccount && showError && email && (
              <p className="errorMsgSU">{emailErrorSU}</p>
            )}
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            {!hasAccount && showError && password && (
              <p className="errorMsgSU">{passwordErrorSU}</p>
            )}
            <label>Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {showError && confirmPassword && (
              <p className="errorMsg">{confirmError}</p>
            )}
          </>
        )}
        <div className="btnContainer">
          {hasAccount ? (
            <>
              <button onClick={handleLoginClick}>Login</button>
              <p>
                Don't have an account?{" "}
                <span onClick={handleSignToggle}>Sign up</span>
              </p>
            </>
          ) : (
            <>
              <button onClick={register} disabled={isSignUpDisabled}>
                Sign up
              </button>
              <p>
                Have an account? <span onClick={handleSignToggle}>Sign in</span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
