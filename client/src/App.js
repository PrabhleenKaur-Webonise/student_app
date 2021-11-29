import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const getInitialState = () => {
    const gender = "Male";
    return gender;
  };

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [dept, setDept] = useState("IT");
  const [gender, setGender] = useState(getInitialState);

  const [newName, setNewName] = useState("");

  const [studentList, setStudentList] = useState([]);

  const [deptList, setDeptList] = useState([]);

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const handleDepartment = (e) => {
    setDept(e.target.value);
  };

  // FUNCTIONS ---------------------------------------------------------------------------------------------------------------------------------------

  const getDepartments = () => {
    Axios.get("http://localhost:3001/departments").then((response) => {
      setDeptList(response.data);
    });
  };

  const addDepartment = () => {
    Axios.post("http://localhost:3001/createDepartment", {
      dept: dept,
    }).then((response) => {
      console.log("New Department Added!");
    });
  };

  const getStudents = () => {
    Axios.get("http://localhost:3001/students").then((response) => {
      setStudentList(response.data);
    });
  };

  const addStudent = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      dob: dob,
      dept: dept,
      gender: gender,
    }).then(() => {
      setStudentList([
        ...studentList,
        {
          name: name,
          dob: dob,
          dept: dept,
          gender: gender,
        },
      ]);
    });
  };

  const updateStudent = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      name: newName,
    }).then((response) => {
      setStudentList(
        studentList.map((val) => {
          return val.id == id
            ? {
                id: val.id,
                name: newName,
                dob: val.dob,
                dept: val.dept,
                gender: val.gender,
              }
            : val;
        })
      );
    });
  };

  const deleteStudent = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setStudentList(
        studentList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  //  RETURN THE PAGE WITH FORM AND LIST --------------------------------------------------------------------------------------------------------------
  return (
    <div className="App">
      <div className="information">
        <label>Name</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Date of Birth</label>
        <input
          type="text"
          onChange={(event) => {
            setDob(event.target.value);
          }}
        />

        <label>Department</label>
        <div className="dept">
          <div>
            <select onClick={getDepartments} onChange={handleDepartment}>
              {deptList.map((val, key) => {
                return <option>{val.name}</option>;
              })}
            </select>
            <input
              type="text"
              placeholder="New Dept..."
              onChange={(event) => {
                setDept(event.target.value);
              }}
            />
            <button
              onClick={() => {
                addDepartment();
              }}
            >
              Add Dept
            </button>
          </div>
        </div>

        <label>Gender</label>
        <select onChange={handleGender}>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <button onClick={addStudent}>Add Student</button>
      </div>

      <div className="students">
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
              <div>
                <input
                  type="text"
                  placeholder="New Name..."
                  onChange={(event) => {
                    setNewName(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateStudent(val.id);
                  }}
                >
                  Update
                </button>
                <div>
                  <button
                    className="delete"
                    onClick={() => {
                      deleteStudent(val.id);
                    }}
                  >
                    Delete Student
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
