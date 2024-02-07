import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditCookstove = () => {
  const { id } = useParams();
  const [cookstove, setCookstove] = useState({
    Modelname: "",
    Location: "",
    Manufacturer: "",
    Fueltype: "",
    Installationdate: "",
    Category_id: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/get_cookstove/" + id)
      .then((result) => {
        console.log("Cookstove data:", result.data);
        setCookstove({
          ...cookstove,
          Modelname: result.data.Result[0].Modelname,
          Location: result.data.Result[0].Location,
          Manufacturer: result.data.Result[0].Manufacturer,
          Fueltype: result.data.Result[0].Fueltype,
          Installationdate: result.data.Result[0].Installationdate,
          Category_id: result.data.Result[0].Category_id,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/auth/update_cookstove/" + id, cookstove)
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
          <h3 className="text-center">Edit coock stove</h3>
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
                value={cookstove.Modelname}
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
                value={cookstove.Location}
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
                value={cookstove.Manufacturer}
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
                value={cookstove.Fueltype}
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
                value={cookstove.Installationdate}
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
                value={cookstove.Category_id}
                onChange={(e) =>
                  setCookstove({ ...cookstove, Category_id: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100">
                Update Stove Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCookstove;
