import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EmpCookstove from "./EmpCookstove";
import EmployeeAddCs from "./EmployeeAddCs";
import EmpEditCs from "./EmpEditCs";

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState([]);
  const [displayComponent, setDisplayComponent] = useState("addCs");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/employee/detail/${id}`)
      .then((result) => {
        setEmployee(result.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/employee/logout")
      .then((result) => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid loginPage">
      <div className="row flex-nowrap shadow">
        <div
          className="col-auto col-md-3 col-xl-2 px-sm-2 px-0"
          style={{ background: "#82b74b", minHeight: "100vh" }}
        >
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
            <Link className="d-flex align-items-center pt-10 pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
              <img
                src={`http://localhost:3000/Employees/${employee.image}`}
                className="emp_det_image img-fluid rounded-circle"
                alt="Employee"
              />
              <h6 className="m-2">{employee.name}</h6>
            </Link>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center">
              <li className="w-100">
                <Link
                  className="nav-link bi bi-view-stacked px-0 align-middle text-white"
                  onClick={() => setDisplayComponent("viewCs")}
                >
                  View CookStoves
                </Link>
              </li>
              <li className="w-100">
                <Link
                  className="nav-link bi bi-file-plus px-0 align-middle text-white"
                  onClick={() => setDisplayComponent("addCs")}
                >
                  Add CookStoves
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
                <div>
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div
            className="p-2 d-flex justify-content-center shadow navbar"
            style={{ background: "#405d27" }}
          >
            <h4 style={{ color: "white" }}>Cookstove Management System</h4>
            <p className="m-2">Email: {employee.email}</p>
          </div>
          {displayComponent === "addCs" && <EmployeeAddCs />}
          {displayComponent === "viewCs" && <EmpCookstove />}
          {displayComponent === "editCs" && <EmpEditCs />}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
