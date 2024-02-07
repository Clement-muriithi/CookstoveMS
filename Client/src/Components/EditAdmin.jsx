import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

const EditAdmin = () => {
  const { id } = useParams();
  const [admin, setAdmins] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/admin_records/" + id)
      .then((result) => {
        setAdmins({
          ...admin,
          email: result.data.Result[0].email,
          password: result.data.Result[0].password,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:3000/auth/update_admin/" + id, { admin })
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
    <div className="px-3 mt-3 ">
      <Link
        to={`/dashboard`}
        className="btn bi-arrow-left-circle btn-success btn-sm me-2"
      ></Link>
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="p-3 border rounded">
              <h3 className="text-center mb-4">Edit Admin</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="inputEmail" className="form-label">
                    Enter Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail"
                    name="email"
                    placeholder="Enter Email"
                    value={admin.email}
                    onChange={(e) =>
                      setAdmins({ ...admin, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputPassword" className="form-label">
                    Enter Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                    name="password"
                    placeholder="Enter Password"
                    onChange={(e) =>
                      setAdmins({ ...admin, password: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-success w-100">
                    Edit Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAdmin;
