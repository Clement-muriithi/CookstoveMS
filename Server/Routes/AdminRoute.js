import express from "express";
import pool from "../utils/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const router = express.Router();

// Admin LogIn Checker/ uses jwt
router.post("/adminlogin", (req, res) => {
  const email = req.body.email;
  const enteredPassword = req.body.password;

  const sql = "SELECT * FROM admin WHERE email = $1";
  pool.query(sql, [email], (err, result) => {
    if (err) {
      return res.json({ loginStatus: false, Error: "Query error" });
    }

    if (result.rows.length > 0) {
      const storedPassword = result.rows[0].password;

      // Compare entered password with stored hashed password
      bcrypt.compare(enteredPassword, storedPassword, (compareErr, isMatch) => {
        if (compareErr) {
          return res.json({
            loginStatus: false,
            Error: "Password comparison error",
          });
        }

        if (isMatch) {
          // Passwords match, generate and send JWT token
          const token = jwt.sign(
            { role: "admin", email: email, id: result.rows[0].id },
            "jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.json({ loginStatus: true });
        } else {
          // Passwords don't match
          return res.json({
            loginStatus: false,
            Error: "Wrong email or password",
          });
        }
      });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
});
//Image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine the destination based on the route(Employee or Cookstove)
    const destinationFolder = req.route.path.includes("cookstove")
      ? "Public/Cookstoves"
      : "Public/Employees";
    cb(null, destinationFolder);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
//^^^^^^Image Upload^^^^^^
// Category Getter to populate on form
router.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  pool.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query 56 Error" });
    return res.json({ Status: true, Result: result.rows });
  });
});

// Category upload for Employees
router.post("/add_category", (req, res) => {
  const sql = "INSERT INTO category (name) VALUES ($1)";
  pool.query(sql, [req.body.category], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query 65 Error" });
      return res.json({ Status: true });
  });
});

// Employee Details Upload
router.post("/add_employee", upload.single("image"), (req, res) => {
  const sql = `INSERT INTO employee 
      (name, email, password, address, salary, image, category_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  
  bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) return res.json({ Status: false, Error: "Query 92 Error" });
      
      const values = [
          req.body.name,
          req.body.email,
          hash,
          req.body.address,
          req.body.salary,
          req.file.filename,
          req.body.category_id,
      ];
      
      pool.query(sql, values, (err, result) => {
          if (err) return res.json({ Status: false, Error: err });
          return res.json({ Status: true });
      });
  });
});

// Cookstove details upload
router.post("/add_cookstove", upload.single("Image"), (req, res) => {
  
  const sql = `INSERT INTO cookstove 
  ("Modelname", "Location", "Manufacturer", "Fueltype", "Installationdate", "Category_id", "Image") 
  VALUES ($1, $2, $3, $4, $5, $6, $7)`;


 const values = [
        req.body.Modelname,
        req.body.Location,
        req.body.Manufacturer,
        req.body.Fueltype,
        req.body.Installationdate,
        req.body.Category_id,
        req.file.filename,
      ];
      
      pool.query(sql, values, (queryErr, result) => {
        if (queryErr) {
          return res.json({
            Status: false,
            Error: "Query Error: " + queryErr.message,
          });
        }
  
        return res.json({ Status: true });
      });
  });


// Admin Details Upload
router.post("/add_admin", (req, res) => {
  const sql = "INSERT INTO admin (email, password) VALUES ($1, $2)";
  // Check if the password is provided
  if (!req.body.admin.password) {
    return res.json({ Status: false, Error: "Password is required" });
  }

  // Hash the password
  bcrypt.hash(req.body.admin.password, 10, (hashErr, hash) => {
    if (hashErr) {
      return res.json({
        Status: false,
        Error: "Hashing Error: " + hashErr.message,
      });
    }

    const values = [req.body.admin.email, hash];

    // Insert into the database
    pool.query(sql, values, (queryErr, result) => {
      if (queryErr) {
        return res.json({
          Status: false,
          Error: "Query Error: " + queryErr.message,
        });
      }

      return res.json({ Status: true });
    });
  });
});

// Admin Update Details Upload
router.put("/update_admin/:id", (req, res) => {
  const sql = "UPDATE admin SET email = $2, password = $3 WHERE id = $1";

  // Hash the password
  bcrypt.hash(req.body.admin.password, 10, (hashErr, hash) => {
    if (hashErr) {
      return res.json({
        Status: false,
        Error: "Hashing Error: " + hashErr.message,
      });
    }

    const values = [req.body.admin.email, hash, req.params.id];

    // Update the database
    pool.query(sql, values, (queryErr, result) => {
      if (queryErr) {
        return res.json({
          Status: false,
          Error: "Query 168 Error: " + queryErr.message,
        });
      }

      return res.json({ Status: true });
    });
  });
});
// Employee Details Getter to populate on form
router.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee";
  pool.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query 202 Error" });
    return res.json({ Status: true, Result: result.rows });
  });
});

// Employee Details Getter by id populate on Edit Employee
router.get("/get_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = $1";
  pool.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query 212 Error" });
    return res.json({ Status: true, Result: result.rows });
  });
});

// Cookstove Details Getter by id populate on Edit Cookstove
router.get("/get_cookstove/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM cookstove WHERE id = $1";
  pool.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query 222 Error" });
    return res.json({ Status: true, Result: result.rows });
  });
});

// Cookstove details Getter to populate on form
router.get("/cookstove", (req, res) => {
  const sql = "SELECT * FROM cookstove";
  pool.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query 231 Error" });
    return res.json({ Status: true, Result: result.rows});
  });
});

// Employee Details Updater to Database
router.put("/edit_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employee 
        SET name = $1, email = $2, salary = $3, address = $4, category_id = $5
        WHERE id = $6`;

  const values = [
    req.body.name,
    req.body.email,
    req.body.salary,
    req.body.address,
    req.body.category_id,
    id,
  ];

  pool.query(sql, values, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query 253 Error" });
    return res.json({ Status: true, Result: result.rows });
  });
});

// Cookstove Details Updater to Database
router.put("/update_cookstove/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE cookstove 
        SET ModelName = $1, Location = $2, Manufacturer = $3, FuelType = $4, InstallationDate = $5, Category_Id = $6
        WHERE id = $7`;

  const values = [
    req.body.ModelName,
    req.body.Location,
    req.body.Manufacturer,
    req.body.FuelType,
    req.body.InstallationDate,
    req.body.Category_Id,
    id,
  ];

  pool.query(sql, values, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query 276 Error" + err });
    return res.json({ Status: true, Result: result.rows });
  });
});

// Employee Details Delete
router.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM employee WHERE id = $1";

  pool.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query 287 Error" + err });
    return res.json({ Status: true, Result: result.rows });
  });
});

// Category Details Delete
router.delete("/delete_category/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM category WHERE id = $1";

  pool.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query 298 Error" + err });
    return res.json({ Status: true, Result: result.rows });
  });
});

// Admin Details Delete
router.delete("/delete_admin/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM admin WHERE id = $1";

  pool.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query 309 Error" + err });
    return res.json({ Status: true, Result: result.rows });
  });
});

// CookStove Details Delete
router.delete("/delete_cookstove/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM cookstove WHERE id = $1";

  pool.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query 320 Error" + err });
    return res.json({ Status: true, Result: result.rows });
  });
});

// Admin count Getter to populate on Card
router.get("/admin_count", (req, res) => {
  const sql = "SELECT COUNT(id) AS admin FROM admin";

  pool.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query 330 Error" + err });
    return res.json({ Status: true, Result: result.rows });
  });
});

// Employee count Getter to populate on Card
router.get("/employee_count", (req, res) => {
  const sql = "SELECT COUNT(id) AS employee FROM employee";

  pool.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query 340 Error" + err });
    return res.json({ Status: true, Result: result.rows });
  });
});
// Cookstove count Getter to populate on Card
router.get("/cookstove_count", (req, res) => {
  const sql = "SELECT COUNT(id) AS noOfcooks FROM cookstove";

  pool.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query 340 Error" + err });
    return res.json({ Status: true, Result: result.rows });
  });
});
// Employee Salary count Getter to populate on Card
router.get("/salary_count", (req, res) => {
  const sql = "SELECT SUM(salary) AS salaryOFEmp FROM employee";
  pool.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query 350 Error" + err });
    return res.json({ Status: true, Result: result.rows });
  });
});

// Admin Details Getter to populate on form
router.get("/admin_records", (req, res) => {
  const sql = "SELECT * FROM admin";

  pool.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query 370 Error" + err });
    return res.json({ Status: true, Result: result.rows });
  });
});

// Admin Account Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as adminRouter };