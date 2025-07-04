import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Workout from "./pages/Workout";
import Progress from "./pages/Progress";
import Exercises from "./pages/Exercises";
import Profile from "./pages/Profile.jsx";
import AuthPage from "./pages/AuthPage.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/progress" element={<Progress />} />∑
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
