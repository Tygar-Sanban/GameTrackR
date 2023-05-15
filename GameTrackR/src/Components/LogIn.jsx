import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogIn(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [validProfile, setValidProfile] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    props.getAllProfiles();
  }, []);

  function checkIfValidProfile() {
    console.log("checking");
    props.allProfiles.map((elem) => {
      console.log(
        "elem.username",
        elem.userName,
        "username",
        userName,
        "elem.password",
        elem.password,
        "password",
        password
      );
      if (elem.userName === userName && elem.password === password) {
        props.setUser(elem);
        delete elem.password;
        localStorage.setItem("user", JSON.stringify(elem));
        navigate("/user-profile");
        return;
      } else {
        setValidProfile(false);
        console.log("denied");
        return;
      }
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    checkIfValidProfile();
  }

  return !validProfile ? (
    <div style={{ backgroundColor: "black" }}>
      <NavBar user={props.user?.userName} />
      <div>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="userName">
            <p className="error-user-name-message">
              The username might be incorrect
            </p>
          </label>
          <input
            type="text"
            onChange={(event) => setUserName(event.target.value)}
          />
          <label htmlFor="password" className="error-user-name-message">
            <p className="error-user-name-message">
              The password might be incorrect
            </p>
          </label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button>
            <h1>Log in !</h1>
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div style={{ backgroundColor: "black" }}>
      <NavBar user={props.user?.userName} />
      <div>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="userName">Username :</label>
          <input
            type="text"
            onChange={(event) => setUserName(event.target.value)}
          />
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button>
            <h1>Log in !</h1>
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
