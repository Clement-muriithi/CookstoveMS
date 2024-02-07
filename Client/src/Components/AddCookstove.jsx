import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddCookstove = () => {
  const [cookstove, setCookstove] = useState({
    Modelname: "",
    Location: "",
    Manufacturer: "",
    Fueltype: "",
    Installationdate: "",
    Category_id: "",
    Image: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Modelname", cookstove.Modelname);
    formData.append("Location", cookstove.Location);
    formData.append("Manufacturer", cookstove.Manufacturer);
    formData.append("Fueltype", cookstove.Fueltype);
    formData.append("Installationdate", cookstove.Installationdate);
    formData.append("Category_id", cookstove.Category_id);
    formData.append("Image", cookstove.Image);

    axios
      .post("http://localhost:3000/auth/add_cookstove", formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/cookstove");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-3 mt-3 ">
      <Link
        to={`/dashboard/cookstove`}
        className="btn bi-arrow-left-circle btn-success btn-sm me-2"
      ></Link>
      <hr />
      <div className="d-flex justify-content-center align-items-center mt-3">
        <div className="p-3 rounded w-50 border">
          <h3 className="text-center">Add coock stove</h3>
          <hr></hr>
          <form className="row g-1" onSubmit={handleSubmit}>
            <div className="col-12">
              <label htmlfor="inputModelName" className="form-label">
                Model Name
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputModelName"
                placeholder="Enter Model Name"
                onChange={(e) =>
                  setCookstove({ ...cookstove, Modelname: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <label htmlfor="inputLocation" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputLocation"
                placeholder="Enter cookstove Location"
                autoComplete="on"
                onChange={(e) =>
                  setCookstove({ ...cookstove, Location: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <label htmlfor="inputmanufacturer" className="form-label">
                Manufacturer
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputmanufacturer"
                placeholder="Enter Manufacturer"
                onChange={(e) =>
                  setCookstove({ ...cookstove, Manufacturer: e.target.value })
                }
              />
              <label htmlfor="inputFuelType" className="form-label">
                Fuel Type
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputFuelType"
                placeholder="Enter Fuel Type"
                autoComplete="on"
                onChange={(e) =>
                  setCookstove({ ...cookstove, Fueltype: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <label htmlfor="inputInstallationDate" className="form-label">
                Installation Date
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputInstallationDate"
                placeholder="Date"
                autoComplete="off"
                onChange={(e) =>
                  setCookstove({
                    ...cookstove,
                    Installationdate: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-12">
              <label htmlfor="inputCategoryID" className="form-label">
                Category ID
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputCategoryID"
                placeholder="Enter Category ID"
                autoComplete="on"
                onChange={(e) =>
                  setCookstove({ ...cookstove, Category_id: e.target.value })
                }
              />
            </div>
            <div className="col-12 mb-3">
              <label className="form-label" htmlfor="inputGroupFile01">
                Select Image
              </label>
              <input
                type="file"
                className="form-control rounded-0"
                id="inputGroupFile01"
                name="Image"
                onChange={(e) =>
                  setCookstove({ ...cookstove, Image: e.target.files[0] })
                }
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100">
                Add Stove Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCookstove;
