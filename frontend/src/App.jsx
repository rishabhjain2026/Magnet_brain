import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/TaskList" element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
        <Route path="/add" element={<ProtectedRoute><TaskForm /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}
