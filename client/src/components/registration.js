import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Registration() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);
  const [loginMsg, setLoginMsg] = useState("");
  const [role, setRole] = useState("user");
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
      role: role,
    }).then((response) => {
      console.log(response);
    });
  };

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (!response.data.auth) {
        setLoginStatus(false);
        if (response.data.message) {
          setLoginMsg(response.data.message);
        }
      } else {
        setLoginStatus(true);
        localStorage.setItem("token", response.data.token);
        if (response.data.row[0].role == "admin") {
          setAdmin(true);
        }
        // console.log(response.data.row[0].role);
      }
    });
  };

  const userAuthenticated = () => {
    Axios.get("http://localhost:3001/userAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      // console.log(response);
      if (admin) {
        navigate("/");
      } else {
        navigate("/viewer");
      }
    });
  };

  const handleOnChange = () => {
    setRole("admin");
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);
  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="text"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <input type="checkbox" onChange={handleOnChange} />
        As admin?
        <button onClick={register}>Register</button>
      </div>

      <div className="login">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={login}>Login</button>
        <h1>{loginMsg}</h1>
        {loginStatus && (
          <button onClick={userAuthenticated}>Check if authenticated</button>
        )}
      </div>
    </div>
  );
}
