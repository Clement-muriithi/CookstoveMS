import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [cookstoves, setCooks] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    adminRecords();
    cookstoveCount();
  }, []);

  const adminRecords = () => {
    axios.get("http://localhost:3000/auth/admin_records").then((result) => {
      if (result.data.Status) {
        setAdmins(result.data.Result);
      } else {
        alert(result.data.Error);
      }
    });
  };

  const adminCount = () => {
    axios.get("http://localhost:3000/auth/admin_count").then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      }
    });
  };

  const employeeCount = () => {
    axios.get("http://localhost:3000/auth/employee_count").then((result) => {
      if (result.data.Status) {
        setEmployeeTotal(result.data.Result[0].employee);
      }
    });
  };

  const salaryCount = () => {
    axios.get("http://localhost:3000/auth/salary_count").then((result) => {
      if (result.data.Status) {
        setSalaryTotal(result.data.Result[0].salaryOFEmp);
      } else {
        alert(result.data.Error);
      }
    });
  };

  const cookstoveCount = () => {
    axios.get("http://localhost:3000/auth/cookstove_count").then((result) => {
      if (result.data.Status) {
        setCooks(result.data.Result[0].noOfcooks);
      } else {
        alert(result.data.Error);
      }
    });
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete_admin/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div className="container-fluid">
      <hr />
      <nav className="navbar navbar-expand-sm  navbar-dark">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to={`/dashboard/add_admin`}
                className="btn shadow-sm bi-plus-circle btn btn-sm mt-2 me-2"
              >
                - Add Admin
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/dashboard/view_cookstove`}
                className="btn shadow-sm bi bi-fire btn btn-sm mt-2 me-2"
              >
                - CookStoves
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/dashboard/view_employee`}
                className="btn shadow-sm bi-person-lines-fill btn btn-sm mt-2 me-2"
              >
                - Employees
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <hr />
      <div className="p-3 container d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3  shadow-sm">
          <div className="text-center pb-1">
            <h4>Admins</h4>
          </div>
          <hr />
          <div className="d-flex mt-4 justify-content-between">
            <h6>Total:</h6>
            <h6>{adminTotal}</h6>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3  shadow">
          <div className="text-center pb-1">
            <h4>Employees</h4>
          </div>
          <hr />
          <div className="d-flex mt-4 justify-content-between">
            <h6>Total:</h6>
            <h6>{employeeTotal}</h6>
          </div>
          <hr />
          <div className="d-flex mt-4 justify-content-between">
            <h6>Total Salary</h6>

            <h6>: Ksh {salaryTotal}</h6>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3  shadow-sm">
          <div className="text-center pb-1">
            <h4>Cookstoves</h4>
          </div>
          <hr />
          <div className="d-flex mt-4 justify-content-between">
            <h6>Total:</h6>
            <h6>{cookstoves}</h6>
          </div>
        </div>
      </div>
      <hr />
      <h3 className="d-flex justify-content-center align-items-center">
        ADMINS
      </h3>
      <div className="d-flex   justify-content-center container-fluid">
        <table className=" m-4 justify-content-center rounded align-items-center shadow">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {admins.map((e) => (
              <tr key={e.id}>
                <span className="m-2">
                  {" "}
                  <td>{e.email}</td>
                </span>
                <td>
                  <Link
                    to={`/dashboard/edit_admin/` + e.id}
                    className="m-1 btn bi-pencil btn-info btn-sm"
                  >
                    Edit
                  </Link>
                  <button
                    className=" m-2 btn bi-trash btn-warning btn-sm"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr></hr>
    </div>
  );
};

export default Home;
