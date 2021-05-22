import React, { useState } from "react";
import "./styles.css";

import SignUp from "../../components/signup/index";
import { getUserById } from "../../api-urls";
import axios from "axios";
import { sha512 } from "js-sha512";
import { useHistory } from "react-router";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userWarning, setuserWarning] = useState(true);
  const [userSignUp, setuserSignUp] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    axios.get(getUserById + email).then((res) => {
      if (res.data && res.data.password === sha512(password)) {
        localStorage.setItem("user", JSON.stringify(res.data));
        history.push("/");
        window.location.reload();
      } else {
        setuserWarning("email or password is not valid");
      }
    });
  };

  if (userSignUp) {
    return <SignUp />;
  }

  return (
    <div>
      <div className="container">
        <div className="items__container">
          <form className="login__form" onSubmit={(e) => handleLogin(e)}>
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
              Register?
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
