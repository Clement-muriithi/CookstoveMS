import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:3000/auth/add_category",
        { category }
      );

      if (result.data.Status) {
        navigate("/dashboard/category");
      } else {
        alert(result.data.Error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-5 mt-3 ">
      <Link
        to={`/dashboard/category`}
        className="btn bi-arrow-left-circle btn-success btn-sm me-2"
      ></Link>
      <hr />
      <div className="d-flex justify-content-center align-items-center h-75">
        <div className="p-3 rounded w-40 border">
          <h2>Add Category</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                <strong>Category:</strong>
              </label>
              <input
                type="text"
                name="category"
                placeholder="Enter Category"
                className="form-control rounded-0"
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <button className="btn btn-success w-100 rounded-0 mb-2">
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
