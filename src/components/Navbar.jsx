import { Home, Dumbbell, BarChart2, List, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const linkClass = "flex items-center gap-2 font-medium text-gray-700 text-xl hover:text-purple-600 transition";

export default function Navbar() {
const navigate = useNavigate();

  return (
    <div className="bg-gray-100 shadow-sm">
      <div className="flex justify-center gap-30 py-3">
        <button onClick={()=>{navigate('/')}} className={linkClass}>
          <Home size={20} /> Dashboard
        </button>
        <button onClick={()=>{navigate('/workout')}} className={linkClass}>
          <Dumbbell size={20} /> Workout Builder
        </button>
        <button onClick={()=>{navigate('/progress')}} className={linkClass}>
          <BarChart2 size={20} /> Progress
        </button>
        <button onClick={()=>{navigate('/exercises')}} className={linkClass}>
          <BarChart2 size={20} /> Exercises
        </button>
        <button onClick={()=>{navigate('/profile')}} className={linkClass}>
          <BarChart2 size={20} /> Profile
        </button>
        
      </div>
    </div>
  );
}
