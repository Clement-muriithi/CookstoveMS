import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";

const ViewCookstoves = () => {
  const [cookstove, setCookstove] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/cookstove")
      .then((result) => {
        if (result.data.Status) {
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Cookstove List</h3>
      </div>
      <Link
        to={`/dashboard`}
        className="btn bi-arrow-left-circle btn-success btn-sm me-2"
      ></Link>
      <Row className="mt-3">
        {currentItems.map((item) => (
          <Col key={item.id} sm={6} lg={3} className="mb-4">
            <Card style={{ height: "100%" }}>
              <Card.Img
                variant="top"
                src={`http://localhost:3000/Cookstoves/` + item.Image}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{item.ModelName}</Card.Title>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Location: {item.Location}</li>
                  <li className="list-group-item">
                    Manufacturer: {item.Manufacturer}
                  </li>
                  <li className="list-group-item">FuelType: {item.FuelType}</li>
                  <li className="list-group-item">
                    InstallationDate: {item.InstallationDate}
                  </li>
                  <li className="list-group-item">
                    Category_Id: {item.Category_Id}
                  </li>
                </ul>
                <div className="mt-2">
                  <Link
                    to={`/dashboard/edit_cookstove/` + item.id}
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
        ))}
      </Row>
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
          disabled={currentPage === Math.ceil(cookstove.length / itemsPerPage)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ViewCookstoves;
