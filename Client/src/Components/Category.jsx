import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Category = () => {
  const [category, setCategory] = useState([]);

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
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete_category/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div className="px-5 mt-3">
      <hr />
      <div className="d-flex justify-content-center">
        <h3 style={{ fontWeight: "bold" }}>Category List</h3>
      </div>
      <Link to="/dashboard/add_category" className="btn btn-success">
        Add Category
      </Link>
      <hr />
      <div className="mt-3">
        <table
          className="table"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
        >
          <thead>
            <tr>
              <th style={{ color: "#405d27", fontWeight: "bold" }}>Name</th>
              <th style={{ color: "#405d27", fontWeight: "bold" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {category.map((c) => (
              <tr key={c.id}>
                <td style={{ color: "#3e4444", fontWeight: "bold" }}>
                  {c.name}
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(c.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr />
    </div>
  );
};

export default Category;
