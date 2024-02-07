import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";

const ViewEmployees = () => {
  const [employee, setEmployee] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items per page
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderCard = (item) => (
    <Col key={item.id} sm={6} lg={3} className="mb-4">
      <Card style={{ height: "100%" }}>
        <Card.Img
          variant="top"
          src={`http://localhost:3000/Employees/` + item.image}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Email: {item.email}</li>
            <li className="list-group-item">Address: {item.address}</li>
            <li className="list-group-item">Salary: {item.salary}</li>
          </ul>
          <div className="mt-2">
            <Link
              to={`/dashboard/edit_employee/` + item.id}
              className="btn btn-info btn-sm me-2"
            >
              Edit
            </Link>
            <Button
              variant="warning"
              size="sm"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link
        to={`/dashboard`}
        className="btn bi-arrow-left-circle btn-success btn-sm me-2"
      ></Link>
      <Row className="mt-3">{currentItems.map(renderCard)}</Row>
      <div className="pagination">
        <Button
          variant="success"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <span>{currentPage}</span>
        <Button
          variant="success"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(employee.length / itemsPerPage)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ViewEmployees;
