import React, { useState } from "react";
import "./styles.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userWarning, setuserWarning] = useState(true);
  const [userSignUp, setuserSignUp] = useState(false);

  const handleLogin = () => {};

  return (
    <div>
      <div className="container">
        <div className="items__container">
          <form className="login__form" onClick={handleLogin}>
            <h1>Login here</h1>
            <h4>Email</h4>
            <input
              type="email"
              value={email}
              placeholder="Please Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <h4>Password</h4>
            <input
              type="password"
              value={password}
              placeholder="Please enter your password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {userWarning && <p className="warning">{userWarning}</p>}

            <button type="submit" className="login__btn">
              Login
            </button>
            <button className="login__btn" onClick={() => setuserSignUp(true)}>
              Sign Up?
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
