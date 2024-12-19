import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"
import Dashboard from "./Component/Dashboard.jsx";
import './App.css'
import Login from "./Component/Login.jsx";
import AddNewDoctor from "./Component/AddNewDoctor.jsx"
import Messages from "./Component/Messages.jsx";
import Doctors from "./Component/Doctors.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import AddNewAdmin from "./Component/AddNewAdmin.jsx"
import { Context } from "./main.jsx";
import Sidebar from "./Component/Sidebar.jsx";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        console.log("Error in fetching admin data",error);
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);
  return (
    <>
      <Router>
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctors/addnew" element={<AddNewDoctor />} />
          <Route path="/admin/addnew" element={<AddNewAdmin/>} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/doctors" element={<Doctors />} />
        </Routes>
        <ToastContainer position='top-center' />
      </Router>

    </>
  )
}

export default App;