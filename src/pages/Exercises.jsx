import { useState } from "react";
import { Search, Plus } from "lucide-react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function Exercises() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const muscleGroups = ["All", "Chest", "Back", "Shoulders", "Arms", "Legs", "Core"];
  const equipmentTypes = ["All", "Barbell", "Dumbbell", "Bodyweight", "Machine", "Cable"];

  const exercises = [
    { id: "1", name: "Bench Press", muscle: "Chest", equipment: "Barbell", difficulty: "Intermediate", description: "Classic chest compound movement" },
    { id: "2", name: "Incline Dumbbell Press", muscle: "Chest", equipment: "Dumbbell", difficulty: "Intermediate", description: "Upper chest focus" },
    { id: "3", name: "Chest Fly Machine", muscle: "Chest", equipment: "Machine", difficulty: "Beginner", description: "Isolation chest exercise" },
    { id: "4", name: "Push Ups", muscle: "Chest", equipment: "Bodyweight", difficulty: "Beginner", description: "Basic bodyweight exercise" },
    { id: "5", name: "Cable Crossovers", muscle: "Chest", equipment: "Cable", difficulty: "Intermediate", description: "Shaping chest exercise" },
    { id: "6", name: "Deadlift", muscle: "Back", equipment: "Barbell", difficulty: "Advanced", description: "Builds entire posterior chain" },
    { id: "7", name: "Lat Pulldown", muscle: "Back", equipment: "Machine", difficulty: "Beginner", description: "Vertical pull for lats" },
    { id: "8", name: "Seated Cable Row", muscle: "Back", equipment: "Cable", difficulty: "Beginner", description: "Horizontal pull for mid-back" },
    { id: "9", name: "Pull Ups", muscle: "Back", equipment: "Bodyweight", difficulty: "Intermediate", description: "Upper back and lats" },
    { id: "10", name: "One Arm Dumbbell Row", muscle: "Back", equipment: "Dumbbell", difficulty: "Beginner", description: "Unilateral back work" },
    { id: "11", name: "Shoulder Press", muscle: "Shoulders", equipment: "Barbell", difficulty: "Intermediate", description: "Builds shoulder strength" },
    { id: "12", name: "Arnold Press", muscle: "Shoulders", equipment: "Dumbbell", difficulty: "Intermediate", description: "Full shoulder activation" },
    { id: "13", name: "Lateral Raises", muscle: "Shoulders", equipment: "Dumbbell", difficulty: "Beginner", description: "Isolation for side delts" },
    { id: "14", name: "Machine Shoulder Press", muscle: "Shoulders", equipment: "Machine", difficulty: "Beginner", description: "Controlled shoulder press" },
    { id: "15", name: "Bicep Curl", muscle: "Arms", equipment: "Barbell", difficulty: "Beginner", description: "Basic biceps exercise" },
    { id: "16", name: "Hammer Curl", muscle: "Arms", equipment: "Dumbbell", difficulty: "Beginner", description: "Targets brachialis & forearm" },
    { id: "17", name: "Tricep Pushdown", muscle: "Arms", equipment: "Cable", difficulty: "Beginner", description: "Tricep isolation" },
    { id: "18", name: "Tricep Dips", muscle: "Arms", equipment: "Bodyweight", difficulty: "Intermediate", description: "Compound triceps move" },
    { id: "19", name: "Squat", muscle: "Legs", equipment: "Barbell", difficulty: "Intermediate", description: "King of leg exercises" },
    { id: "20", name: "Leg Press", muscle: "Legs", equipment: "Machine", difficulty: "Beginner", description: "Quad focused machine move" },
    { id: "21", name: "Lunges", muscle: "Legs", equipment: "Bodyweight", difficulty: "Beginner", description: "Single leg strength" },
    { id: "22", name: "Leg Extension", muscle: "Legs", equipment: "Machine", difficulty: "Beginner", description: "Quad isolation" },
    { id: "23", name: "Romanian Deadlift", muscle: "Legs", equipment: "Barbell", difficulty: "Intermediate", description: "Hamstrings and glutes" },
    { id: "24", name: "Plank", muscle: "Core", equipment: "Bodyweight", difficulty: "Beginner", description: "Core endurance hold" },
    { id: "25", name: "Cable Crunch", muscle: "Core", equipment: "Cable", difficulty: "Beginner", description: "Weighted ab exercise" },
    { id: "26", name: "Russian Twist", muscle: "Core", equipment: "Bodyweight", difficulty: "Beginner", description: "Rotational core movement" },
  ];

  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscle = selectedMuscle === "All" || ex.muscle === selectedMuscle;
    const matchesType = selectedType === "All" || ex.equipment === selectedType;
    return matchesSearch && matchesMuscle && matchesType;
  });

  const getBadgeColor = (difficulty) => {
    if (difficulty === "Beginner") return "bg-green-100 text-green-800";
    if (difficulty === "Intermediate") return "bg-yellow-100 text-yellow-800";
    if (difficulty === "Advanced") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col">
      <Header />
      <Navbar />
      <div className="bg-gray-50 p-4 shadow flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded px-8 py-2 focus:outline-none focus:ring"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {muscleGroups.map((group) => (
            <button
              key={group}
              onClick={() => setSelectedMuscle(group)}
              className={`px-3 py-1 rounded text-sm ${
                selectedMuscle === group ? "bg-purple-600 text-white" : "bg-white border"
              }`}
            >
              {group}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {equipmentTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded text-sm ${
                selectedType === type ? "bg-green-600 text-white" : "bg-white border"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Exercise Library</h2>
        {filteredExercises.length === 0 && (
          <p className="text-gray-500 italic">No exercises match your filters.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map((ex) => (
            <div key={ex.id} className="bg-white rounded shadow p-4 hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{ex.name}</h3>
                  <p className="text-gray-500 text-sm">{ex.description}</p>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs bg-gray-100 rounded px-2 py-0.5">{ex.muscle}</span>
                <span className="text-xs border rounded px-2 py-0.5">{ex.equipment}</span>
                <span className={`text-xs rounded px-2 py-0.5 ${getBadgeColor(ex.difficulty)}`}>
                  {ex.difficulty}
                </span>
              </div>
              <div className="bg-gray-100 rounded mt-3 h-28 flex items-center justify-center text-gray-400 text-sm">
                Demo / GIF
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}