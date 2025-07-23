import React, { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Plus, Trash2, Play, Clock } from "lucide-react";

// Updated exerciseLibrary with defaultWeight in kilograms
const exerciseLibrary = [
  { id: "chest-1", name: "Bench Press", bodyPart: "Chest", defaultSets: 3, defaultReps: 10, defaultWeight: 61 },
  { id: "chest-2", name: "Incline Bench Press", bodyPart: "Chest", defaultSets: 3, defaultReps: 10, defaultWeight: 52 },
  { id: "chest-3", name: "Chest Fly", bodyPart: "Chest", defaultSets: 3, defaultReps: 12, defaultWeight: 18 },
  { id: "chest-4", name: "Push Ups", bodyPart: "Chest", defaultSets: 3, defaultReps: 15, defaultWeight: 0 },
  { id: "chest-5", name: "Decline Bench Press", bodyPart: "Chest", defaultSets: 3, defaultReps: 10, defaultWeight: 57 },

  { id: "back-1", name: "Pull Ups", bodyPart: "Back", defaultSets: 3, defaultReps: 10, defaultWeight: 0 },
  { id: "back-2", name: "Barbell Row", bodyPart: "Back", defaultSets: 3, defaultReps: 10, defaultWeight: 52 },
  { id: "back-3", name: "Lat Pulldown", bodyPart: "Back", defaultSets: 3, defaultReps: 12, defaultWeight: 45 },

  { id: "legs-1", name: "Squats", bodyPart: "Legs", defaultSets: 3, defaultReps: 10, defaultWeight: 70 },
  { id: "legs-2", name: "Leg Press", bodyPart: "Legs", defaultSets: 3, defaultReps: 10, defaultWeight: 102 },
  { id: "legs-3", name: "Lunges", bodyPart: "Legs", defaultSets: 3, defaultReps: 12, defaultWeight: 16 },
  { id: "legs-4", name: "Leg Extensions", bodyPart: "Legs", defaultSets: 3, defaultReps: 12, defaultWeight: 39 },
  { id: "legs-5", name: "Hamstring Curl", bodyPart: "Legs", defaultSets: 3, defaultReps: 12, defaultWeight: 34 },

  { id: "shoulders-1", name: "Overhead Press", bodyPart: "Shoulders", defaultSets: 3, defaultReps: 10, defaultWeight: 36 },
  { id: "shoulders-2", name: "Lateral Raise", bodyPart: "Shoulders", defaultSets: 3, defaultReps: 12, defaultWeight: 7 },
  { id: "shoulders-3", name: "Front Raise", bodyPart: "Shoulders", defaultSets: 3, defaultReps: 12, defaultWeight: 7 },

  { id: "arms-1", name: "Barbell Curl", bodyPart: "Arms", defaultSets: 3, defaultReps: 12, defaultWeight: 27 },
  { id: "arms-2", name: "Tricep Pushdown", bodyPart: "Arms", defaultSets: 3, defaultReps: 12, defaultWeight: 25 },
  { id: "arms-3", name: "Hammer Curl", bodyPart: "Arms", defaultSets: 3, defaultReps: 12, defaultWeight: 14 },
];

export default function Workout() {
  const [exercises, setExercises] = useState([]);

  const addExercise = (exercise) => {
    setExercises([
      ...exercises,
      {
        ...exercise,
        sets: exercise.defaultSets,
        reps: exercise.defaultReps,
        weight: exercise.defaultWeight,
        rest: 60,
        id: Date.now(),
      },
    ]);
  };

  const removeExercise = (id) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
  };

  const updateExercise = (id, key, value) => {
    setExercises(
      exercises.map((exercise) =>
        exercise.id === id ? { ...exercise, [key]: value } : exercise
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-4 sm:ml-64">
        <Header title="Workout" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1 space-y-2">
            <h2 className="text-lg font-semibold">Exercise Library</h2>
            {exerciseLibrary.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-white p-3 rounded-xl shadow hover:bg-gray-100 cursor-pointer"
                onClick={() => addExercise(exercise)}
              >
                <h3 className="font-medium">{exercise.name}</h3>
                <p className="text-sm text-gray-500">{exercise.bodyPart}</p>
              </div>
            ))}
          </div>

          <div className="md:col-span-3 space-y-4">
            <h2 className="text-lg font-semibold">My Workout</h2>
            {exercises.length === 0 ? (
              <p className="text-gray-500">No exercises added yet.</p>
            ) : (
              exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="bg-white p-4 rounded-xl shadow space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-lg">{exercise.name}</h3>
                    <button onClick={() => removeExercise(exercise.id)}>
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    <div>
                      <label className="block text-sm">Sets</label>
                      <input
                        type="number"
                        className="w-full border rounded px-2 py-1"
                        value={exercise.sets}
                        onChange={(e) =>
                          updateExercise(exercise.id, "sets", Number(e.target.value))
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm">Reps</label>
                      <input
                        type="number"
                        className="w-full border rounded px-2 py-1"
                        value={exercise.reps}
                        onChange={(e) =>
                          updateExercise(exercise.id, "reps", Number(e.target.value))
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm">Weight (kg)</label>
                      <input
                        type="number"
                        className="w-full border rounded px-2 py-1"
                        value={exercise.weight}
                        onChange={(e) =>
                          updateExercise(exercise.id, "weight", Number(e.target.value))
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm">Rest (sec)</label>
                      <input
                        type="number"
                        className="w-full border rounded px-2 py-1"
                        value={exercise.rest}
                        onChange={(e) =>
                          updateExercise(exercise.id, "rest", Number(e.target.value))
                        }
                      />
                    </div>
                    <div className="flex items-end">
                      <button className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded shadow">
                        <Play className="w-4 h-4" /> Start
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
