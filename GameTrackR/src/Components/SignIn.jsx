import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [canSubmitUserName, setCanSubmitUserName] = useState(true);
  const [canSubmitPassword, setCanSubmitPassword] = useState(true);
  const navigate = useNavigate();

  function checkIfSameUserName() {
    setCanSubmitUserName(true);
    props.allProfiles.forEach((elem) => {
      if (elem.userName === userName) {
        setCanSubmitUserName(false);
      }
    });
  }

  function checkIfSamePassword() {
    setCanSubmitPassword(true);
    if (confirmedPassword !== password) {
      setCanSubmitPassword(false);
    }
  }

  useEffect(() => {
    checkIfSameUserName();
  }, [userName, props.allProfiles]);

  useEffect(() => {
    checkIfSamePassword();
  }, [confirmedPassword]);

  async function handleSubmit(event) {
    event.preventDefault();
    const objectToPost = {
      email,
      userName,
      password,
    };

    if (canSubmitUserName && canSubmitPassword) {
      try {
        const response = await axios.post(
          "https://ironrest.fly.dev/api/GameTrackR_UserData",
          objectToPost
        );
        props.setUser(userName);
        navigate("/user-profile");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div style={{ backgroundColor: "black" }}>
      <NavBar user={props.user} />
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="mailAdress">Mail Adress :</label>
          <input
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="userName">
            {canSubmitUserName ? (
              <p>Username :</p>
            ) : (
              <p className="error-user-name-message">
                This Username is already taken, please choose another one.
              </p>
            )}
          </label>
          <input
            type="text"
            onChange={(event) => setUserName(event.target.value)}
          />
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <label htmlFor="password2">
            {canSubmitPassword ? (
              <p>Confirm your password :</p>
            ) : (
              <p className="error-user-name-message">
                Beware ! Your password is not the same.
              </p>
            )}{" "}
          </label>
          <input
            type="password"
            onChange={(event) => setConfirmedPassword(event.target.value)}
          />
          <button>
            <h1>Create your account !</h1>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
