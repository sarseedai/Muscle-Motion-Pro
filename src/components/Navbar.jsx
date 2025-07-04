import { Home, Dumbbell, BarChart2, List, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const linkClass = "flex items-center gap-2 font-medium text-xl transition";
  const activeClass = "text-purple-600";
  const inactiveClass = "text-gray-700 hover:text-purple-600";

  const links = [
    { to: "/", label: "Dashboard", icon: Home },
    { to: "/workout", label: "Workout Builder", icon: Dumbbell },
    { to: "/progress", label: "Progress", icon: BarChart2 },
    { to: "/exercises", label: "Exercises", icon: List },
    { to: "/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="bg-gray-100 shadow-sm">
      <div className="flex justify-center gap-10 py-3">
        {links.map(({ to, label, icon: Icon }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className={`${linkClass} ${location.pathname === to ? activeClass : inactiveClass}`}
          >
            <Icon size={20} /> {label}
          </button>
        ))}
      </div>
    </div>
  );
}
