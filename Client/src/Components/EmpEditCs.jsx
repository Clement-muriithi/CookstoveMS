import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";

const EmpEditCs = () => {
  const { id } = useParams();
  const [cookstove, setCookstove] = useState({
    ModelName: "",
    Location: "",
    Manufacturer: "",
    FuelType: "",
    InstallationDate: "",
    Category_Id: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/get_cookstove/" + id)
      .then((result) => {
        setCookstove({
          ...cookstove,
          ModelName: result.data.Result[0].ModelName,
          Location: result.data.Result[0].Location,
          Manufacturer: result.data.Result[0].Manufacturer,
          FuelType: result.data.Result[0].FuelType,
          InstallationDate: result.data.Result[0].InstallationDate,
          Category_Id: result.data.Result[0].Category_Id,
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
          setShowAlert(true);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center loginPage">
      <Link
        to={`/`}
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
                value={cookstove.ModelName}
                onChange={(e) =>
                  setCookstove({ ...cookstove, ModelName: e.target.value })
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
                value={cookstove.FuelType}
                onChange={(e) =>
                  setCookstove({ ...cookstove, FuelType: e.target.value })
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
                value={cookstove.InstallationDate}
                onChange={(e) =>
                  setCookstove({
                    ...cookstove,
                    InstallationDate: e.target.value,
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
                value={cookstove.Category_Id}
                onChange={(e) =>
                  setCookstove({ ...cookstove, Category_Id: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100">
                Update Stove Data
              </button>
            </div>
          </form>
          {showAlert && (
            <Alert
              variant="success"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              <Alert.Heading>Success!</Alert.Heading>
              <p>The stove data has been successfully updated.</p>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmpEditCs;
