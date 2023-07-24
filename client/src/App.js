import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Receipe from "./pages/Receipe";
import SavedReceipe from "./pages/SavedReceipe";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import CreateReceipe from "./pages/createReceipe";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/auth" Component={Auth} />
        <Route path="/receipes" Component={Receipe} />
        <Route path="savedreceipes" Component={SavedReceipe} />
        <Route path="/signup" Component={Signup} />
        <Route path="/createreceipe" Component={CreateReceipe} />
      </Routes>
    </Router>
  );
}
export default App;
