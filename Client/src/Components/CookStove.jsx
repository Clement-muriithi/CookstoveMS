import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Cookstove = () => {
  const [cookstove, setCookstove] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/cookstove")
      .then((result) => {
        if (result.data.Status) {
          console.log(result);
          setCookstove(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete_cookstove/" + id)
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
  const currentItems = cookstove.slice(indexOfFirstItem, indexOfLastItem);

  const renderTable = () => {
    return (
      <tbody>
        {currentItems.map((e) => (
          <tr key={e.id}>
            <td>{e.Modelname}</td>
            <td>
              <img
                src={`http://localhost:3000/Cookstoves/${e.Image}`}
                className="employee_image"
                alt="Cookstove"
              />
            </td>
            <td>{e.Location}</td>
            <td>{e.Manufacturer}</td>
            <td>{e.Fueltype}</td>
            <td>{e.Installationdate}</td>
            <td>{e.Category_id}</td>
            <td>
              <Link
                to={`/dashboard/edit_cookstove/` + e.id}
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
      <hr />
      <div className="d-flex justify-content-center">
        <h3>Cookstove List</h3>
      </div>
      <Link
        to="/dashboard/add_cookstove"
        className="btn bi bi-plus-circle btn-success"
      >
        Add Cookstove
      </Link>
      <hr />
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>ModelName</th>
              <th>Image</th>
              <th>Location</th>
              <th>Manufacturer</th>
              <th>FuelType</th>
              <th>InstallationDate</th>
              <th>Category_Id</th>
              <th>Action</th>
            </tr>
          </thead>
          {renderTable()}
        </table>
        <hr />
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
            disabled={
              currentPage === Math.ceil(cookstove.length / itemsPerPage)
            }
          >
            Next
          </button>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default Cookstove;
