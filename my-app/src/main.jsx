import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
//import { Router, Routes } from "react-router";
import PatientTable from "./PatientTable.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./Form.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/patients" element={<PatientTable />} />
        <Route path="/register" element={<Form />} />
        <Route path="/" element={<Form />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
