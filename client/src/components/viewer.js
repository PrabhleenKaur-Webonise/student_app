import "../App.css";
import Axios from "axios";
import React, { useEffect, useState } from "react";
export default function Viewer() {
  const [studentList, setStudentList] = useState([]);
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setRole(response.data.user[0].role);
        setUsername(response.data.user[0].username);
        // console.log(response);
      }
    });
  }, []);

  // FUNCTIONS ---------------------------------------------------------------------------------------------------------------------------------------
  const getStudents = () => {
    Axios.get("http://localhost:3001/students").then((response) => {
      setStudentList(response.data);
    });
  };

  return (
    <div className="students">
      <div>
        <h1>Username: {username}</h1>
        <h1>Role: {role}</h1>
      </div>
      <button className="showStudents" onClick={getStudents}>
        Show students
      </button>

      {studentList.map((val, key) => {
        return (
          <div className="student">
            <div>
              <h3>ID: {val.id}</h3>
              <h3>Name: {val.name}</h3>
              <h3>Birth Date: {val.dob}</h3>
              <h3>Department: {val.dept}</h3>
              <h3>Gender: {val.gender}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
