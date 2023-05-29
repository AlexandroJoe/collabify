import React, { useState } from "react";

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
  } = props;

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    if (!hasAccount && !passwordRegex.test(inputPassword)) {
      setPasswordError(
        "Password must contain at least 8 characters, including one numeric digit and one uppercase letter"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const inputConfirmPassword = e.target.value;
    setConfirmPassword(inputConfirmPassword);
    if (!hasAccount && inputConfirmPassword !== password) {
      setConfirmError("Passwords do not match");
    } else {
      setConfirmError("");
    }
  };

  const isSignUpDisabled = hasAccount || emailError || passwordError || confirmError;

  return (
    <section className="login">
      <div>
        <h1 className="appName">Collabify</h1>
      </div>
      <div className="loginContainer">
        {hasAccount ? (
          <>
            <h1 className="title">Login to Collabify</h1>
          </>
        ) : (
          <h1 className="title">Join us at Collabify</h1>
        )}
        <label>Username</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={handleEmailChange}
        />
        {!hasAccount && <p className="errorMsg">{emailError}</p>}
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        {!hasAccount && <p className="errorMsg">{passwordError}</p>}
        {!hasAccount && (
          <>
            <label>Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <p className="errorMsg">{confirmError}</p>
          </>
        )}
        <div className="btnContainer">
          {hasAccount ? (
            <>
              <button onClick={handleLogin}>Login</button>
              <p>
                Don't have an account?{" "}
                <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
              </p>
            </>
          ) : (
            <>
              <button onClick={register} disabled={isSignUpDisabled}>
                Sign up
              </button>
              <p>
                Have an account?{" "}
                <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
