import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items per page
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        console.log(result.data);
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete_employee/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employee.slice(indexOfFirstItem, indexOfLastItem);

  const renderTable = () => {
    return (
      <tbody>
        {currentItems.map((e) => (
          <tr key={e.id}>
            <td>{e.name}</td>
            <td>
              <img
                src={`http://localhost:3000/Employees/` + e.image}
                className="employee_image"
                alt="Employee"
              />
            </td>
            <td>{e.email}</td>
            <td>{e.address}</td>
            <td>{e.salary}</td>
            <td>
              <Link
                to={`/dashboard/edit_employee/` + e.id}
                className="btn bi-pencil btn-info btn-sm me-2"
              >
                Edit
              </Link>
              <button
                className="btn bi-trash btn-warning btn-sm"
                onClick={() => handleDelete(e.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-5 mt-3">
      <hr></hr>
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link
        to="/dashboard/add_employee"
        className="btn bi-person-add btn-success"
      >
        Add Employee
      </Link>
      <hr></hr>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          {renderTable()}
        </table>
        <hr></hr>
        <div className="pagination">
          <button
            className="btn bi-arrow-left-circle btn-success"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>{currentPage}</span>
          <button
            className="btn bi-arrow-right-circle btn-success"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(employee.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
        <hr></hr>
      </div>
    </div>
  );
};

export default Employee;
