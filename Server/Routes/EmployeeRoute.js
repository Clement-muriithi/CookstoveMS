import express from 'express';
import pool from '../utils/database.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

// Employee LogIn Checker/ uses jwt
router.post("/employee_login", (req, res) => {
  const sql = "SELECT * FROM employee WHERE email = $1";
  pool.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.rows.length > 0) {
      bcrypt.compare(req.body.password, result.rows[0].password, (err, response) => {
        if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
        if (response) {
          const email = result.rows[0].email;
          const token = jwt.sign(
            { role: "employee", email: email, id: result.rows[0].id },
            "jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie('token', token);
          return res.json({ loginStatus: true, id: result.rows[0].id });
        }
      });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
});

// Employee Getter with ID
router.get('/detail/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = $1";
  pool.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false });
    return res.json(result.rows);
  });
});

// LogOut for Employees
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ Status: true });
});

export { router as EmployeeRouter };
