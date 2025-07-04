import React, { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Plus, Trash2, Play, Clock } from "lucide-react";
import Timer from "../components/Timer";

export default function WorkoutBuilder() {
  const [workoutName, setWorkoutName] = useState("Push Day");
  const [exercises, setExercises] = useState([
    {
      id: "1",
      name: "Bench Press",
      sets: [
        { reps: 10, weight: 60, completed: false },
        { reps: 8, weight: 70, completed: false },
        { reps: 6, weight: 80, completed: false },
      ],
    },
  ]);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  const addExercise = () => {
    const newExercise = {
      id: Date.now().toString(),
      name: "New Exercise",
      sets: [{ reps: 10, weight: 0, completed: false }],
    };
    setExercises([...exercises, newExercise]);
  };

  const addSet = (exerciseId) => {
    setExercises(
      exercises.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: [...exercise.sets, { reps: 10, weight: 0, completed: false }],
            }
          : exercise
      )
    );
  };

  const updateSet = (exerciseId, setIndex, field, value) => {
    setExercises(
      exercises.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.map((set, idx) =>
                idx === setIndex ? { ...set, [field]: value } : set
              ),
            }
          : exercise
      )
    );
  };

  const toggleSetCompleted = (exerciseId, setIndex) => {
    setExercises(
      exercises.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.map((set, idx) =>
                idx === setIndex ? { ...set, completed: !set.completed } : set
              ),
            }
          : exercise
      )
    );
    if (!showTimer) setShowTimer(true);
  };

  const removeExercise = (exerciseId) => {
    setExercises(exercises.filter((exercise) => exercise.id !== exerciseId));
  };

  const startWorkout = () => {
    setIsWorkoutActive(true);
  };

  const endWorkout = () => {
    setIsWorkoutActive(false);
    setShowTimer(false);
    console.log("Workout completed:", { workoutName, exercises });
  };

  return (
    <div>
      <Header />
      <Navbar />

      <div className="p-4 max-w-7xl mx-auto space-y-6">
        {/* Workout Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{workoutName}</h1>
            <p className="text-gray-600">Build and track your custom workout</p>
          </div>
          <div className="flex gap-2">
            {!isWorkoutActive ? (
              <button
                onClick={startWorkout}
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Workout
              </button>
            ) : (
              <button
                onClick={endWorkout}
                className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                End Workout
              </button>
            )}
          </div>
        </div>

        {showTimer && (
          <div className="mb-6">
            <Timer />
          </div>
        )}

        {/* Exercises List */}
        <div className="space-y-6">
          {exercises.map((exercise, exerciseIndex) => (
            <div
              key={exercise.id}
              className="bg-white shadow rounded-lg p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md font-semibold">
                    {exerciseIndex + 1}
                  </span>
                  <input
                    type="text"
                    value={exercise.name}
                    onChange={(e) => {
                      const newExercises = [...exercises];
                      newExercises[exerciseIndex].name = e.target.value;
                      setExercises(newExercises);
                    }}
                    className="text-lg font-semibold border border-gray-300 rounded-md px-3 py-1"
                  />
                </div>
                <button
                  onClick={() => removeExercise(exercise.id)}
                  className="text-red-600 hover:text-red-800 transition"
                  aria-label="Remove exercise"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Sets Header */}
              <div className="grid grid-cols-4 gap-4 mb-2 text-sm font-semibold text-gray-600">
                <div>Set</div>
                <div>Reps</div>
                <div>Weight (kg)</div>
                <div>Complete</div>
              </div>

              {/* Sets */}
              <div className="space-y-3">
                {exercise.sets.map((set, setIndex) => (
                  <div
                    key={setIndex}
                    className="grid grid-cols-4 gap-4 items-center"
                  >
                    <div
                      className={`px-2 py-1 rounded-md font-medium ${
                        set.completed
                          ? "bg-green-200 text-green-800"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      Set {setIndex + 1}
                    </div>
                    <input
                      type="number"
                      min={0}
                      value={set.reps}
                      onChange={(e) =>
                        updateSet(
                          exercise.id,
                          setIndex,
                          "reps",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="text-center border border-gray-300 rounded-md px-2 py-1"
                    />
                    <input
                      type="number"
                      min={0}
                      value={set.weight}
                      onChange={(e) =>
                        updateSet(
                          exercise.id,
                          setIndex,
                          "weight",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="text-center border border-gray-300 rounded-md px-2 py-1"
                    />
                    <button
                      onClick={() => toggleSetCompleted(exercise.id, setIndex)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        set.completed
                          ? "bg-green-600 text-white"
                          : "border border-gray-400 text-gray-700"
                      }`}
                    >
                      {set.completed ? "✓" : "○"}
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addSet(exercise.id)}
                className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-md font-semibold"
              >
                <Plus className="inline w-5 h-5 mr-2" />
                Add Set
              </button>
            </div>
          ))}

          <div className="border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-600 transition-colors">
            <button
              onClick={addExercise}
              className="w-full py-8 text-gray-600 hover:text-purple-700 font-semibold"
            >
              <Plus className="inline w-6 h-6 mr-2" />
              Add Exercise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
