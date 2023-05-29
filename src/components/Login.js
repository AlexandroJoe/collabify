import React from "react";

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    // confirmation,
    setPassword,
    handleLogin,
    handleSignUp,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;

const register = () => {
  handleSignUp(email, password)
}

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
        <input type="text" autofocus required value={email} onChange={(e) => setEmail(e.target.value)}/>
        <p class="errorMsg">{emailError}</p>
        <label>Password</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
        {/* <label>Confirmation</label>
        <input type="password" required value={confirmation} onChange={(e) => setPassword(e.target.value)}/> */}
        <p className="errorMsg">{passwordError}</p>
        <div className="btnContainer">
            {hasAccount ? (
                <>
                <button onClick={handleLogin}>Login</button>
                <p>Don't have an acccount <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                </>
            ) : (
                <>
                <button onClick={register}>Sign up</button>
                <p>Have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                </>
            )
        }
        </div>
    </div>

  </section>)
};

export default Login;
