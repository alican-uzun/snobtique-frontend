import React from "react";
import "./App.css";
import { AuthProvider } from "./auth/AuthContext";
import Router from "./components/Router/Router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <Router></Router>
    </AuthProvider>
  );
}

export default App;