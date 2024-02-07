import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
    category_id: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/auth/get_employee/" + id)
      .then((result) => {
        setEmployee({
          ...employee,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          address: result.data.Result[0].address,
          salary: result.data.Result[0].salary,
          category_id: result.data.Result[0].category_id,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/auth/edit_employee/" + id, employee)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-3 mt-3 ">
      <Link
        to={`/dashboard/employee`}
        className="btn bi-arrow-left-circle btn-success btn-sm me-2"
      ></Link>
      <hr></hr>
      <div className="d-flex justify-content-center align-items-center mt-3">
        <div
          className="p-3 rounded w-50 border"
          style={{ background: "#82b74b" }}
        >
          <h3 className="text-center" style={{ color: "#3e4444" }}>
            Edit Employee
          </h3>
          <form className="row g-1" onSubmit={handleSubmit}>
            <div className="col-12">
              <label
                htmlFor="inputName"
                className="form-label"
                style={{ color: "#3e4444", fontWeight: "bold" }}
              >
                Name
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputName"
                placeholder="Enter Name"
                value={employee.name}
                onChange={(e) =>
                  setEmployee({ ...employee, name: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <label
                htmlFor="inputEmail4"
                className="form-label"
                style={{ color: "#3e4444", fontWeight: "bold" }}
              >
                Email
              </label>
              <input
                type="email"
                className="form-control rounded-0"
                id="inputEmail4"
                placeholder="Enter Email"
                autoComplete="off"
                value={employee.email}
                onChange={(e) =>
                  setEmployee({ ...employee, email: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <label
                htmlFor="inputSalary"
                className="form-label"
                style={{ color: "#3e4444", fontWeight: "bold" }}
              >
                Salary
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputSalary"
                placeholder="Enter Salary"
                autoComplete="off"
                value={employee.salary}
                onChange={(e) =>
                  setEmployee({ ...employee, salary: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <label
                htmlFor="inputAddress"
                className="form-label"
                style={{ color: "#3e4444", fontWeight: "bold" }}
              >
                Address
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputAddress"
                placeholder="1234 Main St"
                autoComplete="off"
                value={employee.address}
                onChange={(e) =>
                  setEmployee({ ...employee, address: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <label
                htmlFor="category"
                className="form-label"
                style={{ color: "#3e4444", fontWeight: "bold" }}
              >
                Category
              </label>
              <select
                name="category"
                id="category"
                className="form-select"
                onChange={(e) =>
                  setEmployee({ ...employee, category_id: e.target.value })
                }
                style={{ color: "#3e4444" }}
              >
                {category.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100">
                Edit Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
