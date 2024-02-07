import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Start = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3000/verify")
      .then((result) => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/employee_detail/" + result.data.id);
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded border loginForm col-md-6 col-lg-4">
        <h3 className="text-center mb-4">Login As</h3>
        <div className="d-flex flex-column">
          <button
            type="button"
            className="btn mb-3 btn-success"
            onClick={() => {
              navigate("/employee_login");
            }}
          >
            EMPLOYEE
          </button>
          <button
            type="button"
            className="btn mb-3 btn-success"
            onClick={() => {
              navigate("/adminlogin");
            }}
          >
            ADMIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
