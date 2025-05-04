import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/favorites"
          element={token ? <Favorites /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
