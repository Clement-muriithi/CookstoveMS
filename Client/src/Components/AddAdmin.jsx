import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddAdmin = () => {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/auth/add_admin", { admin })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-5 mt-3">
      <Link
        to={`/dashboard`}
        className="btn bi-arrow-left-circle btn-success btn-sm me-2"
      ></Link>
      <hr />
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="p-3  rounded w-50 border">
          <h3 className="text-center">Add Admin</h3>

          <form className="row g-1" onSubmit={handleSubmit}>
            <div className="col-12">
              <label htmlFor="inputEmail" className="form-label">
                Enter Email
              </label>
              <input
                type="email"
                className="form-control rounded-0"
                id="inputEmail"
                name="email"
                placeholder="Enter Email"
                onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputPassword" className="form-label">
                Enter Password
              </label>
              <input
                type="password"
                className="form-control rounded-0"
                id="inputPassword4"
                placeholder="Enter Password"
                onChange={(e) =>
                  setAdmin({ ...admin, password: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="btn bi bi-person-plus-fill btn-success w-100"
              >
                Add Admin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
