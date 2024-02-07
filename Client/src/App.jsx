import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Employee from "./Components/Employee";
import Category from "./Components/Category";
import Profile from "./Components/Profile";
import AddCategory from "./Components/AddCategory";
import AddEmployee from "./Components/AddEmployee";
import AddCookstove from "./Components/AddCookstove";
import EditEmployee from "./Components/EditEmployee";
import Start from "./Components/Start";
import EmployeeLogin from "./Components/EmployeeLogin";
import EmployeeDetail from "./Components/EmployeeDetail";
import PrivateRoute from "./Components/PrivateRoute";
import Cookstove from "./Components/CookStove";
import AddAdmin from "./Components/AddAdmin";
import EditAdmin from "./Components/EditAdmin";
import ViewCookstoves from "./Components/ViewCookstoves";
import ViewEmployees from "./Components/ViewEmployees";
import EditCookstove from "./Components/EditCookstove";
import EmpEditCs from "./Components/EmpEditCs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/adminlogin" element={<Login />}></Route>
        <Route path="/employee_login" element={<EmployeeLogin />}></Route>
        <Route path="/employee_detail/:id" element={<EmployeeDetail />}></Route>
        <Route path="/edit_cook/:id" element={<EmpEditCs />}></Route>

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="" element={<Home />}></Route>
          <Route path="/dashboard/employee" element={<Employee />}></Route>
          <Route path="/dashboard/category" element={<Category />}></Route>
          <Route path="/dashboard/cookstove" element={<Cookstove />}></Route>
          <Route path="/dashboard/add_admin" element={<AddAdmin />}></Route>

          <Route
            path="/dashboard/view_cookstove"
            element={<ViewCookstoves />}
          ></Route>
          <Route
            path="/dashboard/view_employee"
            element={<ViewEmployees />}
          ></Route>

          <Route
            path="/dashboard/add_category"
            element={<AddCategory />}
          ></Route>
          <Route
            path="/dashboard/add_employee"
            element={<AddEmployee />}
          ></Route>
          <Route
            path="/dashboard/edit_employee/:id"
            element={<EditEmployee />}
          ></Route>
          <Route
            path="/dashboard/edit_cookstove/:id"
            element={<EditCookstove />}
          ></Route>
          <Route
            path="/dashboard/edit_admin/:id"
            element={<EditAdmin />}
          ></Route>
          <Route
            path="/dashboard/add_cookstove"
            element={<AddCookstove />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
