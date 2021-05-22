import React, { useState } from "react";
import "./styles.css";
import LogIn from "../../pages/login/index";
import { createUser } from "../../api-urls";
import axios from "axios";
import { sha512 } from "js-sha512";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [userWarning, setuserWarning] = useState(true);
  const [userLogIn, setuserLogIn] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      gender: gender,
      name: name,
      password: sha512(password),
      phone: phone,
    };
    axios
      .post(createUser, newUser)
      .then((res) => {
        alert("User created");
        setuserLogIn(true);
      })
      .catch((err) => {
        alert("Something went wrong");
        console.log(err);
      });
  };

  if (userLogIn) {
    return <LogIn />;
  }

  return (
    <div>
      <div className="container">
        <div className="items__container">
          <form className="login__form" onSubmit={(e) => handleSignUp(e)}>
            <h1>Sign Up Here</h1>
            <h4>Enter Your Name</h4>
            <input
              type="text"
              value={name}
              placeholder="Please Enter your Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <h4>Enter Your Email</h4>
            <input
              type="email"
              value={email}
              placeholder="Please Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <h4>Set Your Password</h4>
            <input
              type="password"
              value={password}
              placeholder="Please enter your password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <h4>Enter your Phone Number</h4>
            <input
              type="tel"
              value={phone}
              placeholder="Please enter your phone"
              autoComplete="current-password"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <div className="gender">
              <input
                className="radio--btn"
                type="radio"
                id="male"
                name="gender"
                value="Female"
                onChange={(e) => setGender(e.target.value)}
                defaultChecked
              />
              <label htmlFor="male">Male</label>

              <input
                className="radio--btn"
                type="radio"
                id="female"
                name="gender"
                value="Female"
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="female">Female</label>
            </div>
            {userWarning && <p className="warning">{userWarning}</p>}

            <button type="submit" className="login__btn">
              Sign Up
            </button>
            <button className="login__btn" onClick={() => setuserLogIn(true)}>
              Log In Here
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
