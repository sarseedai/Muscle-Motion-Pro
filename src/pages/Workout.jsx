"use client";

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Trash2,
  GripVertical,
  Clock,
  Flame,
  Dumbbell,
  ChevronRight,
  ChevronDown,
  Plus,
  Minus,
} from "lucide-react";
import Timer from "../components/Timer";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const exerciseLibrary = [
  { id: "chest-1", name: "Bench Press", bodyPart: "Chest", defaultSets: 3, defaultReps: 10, defaultWeight: 135 },
  { id: "chest-2", name: "Incline Bench Press", bodyPart: "Chest", defaultSets: 3, defaultReps: 10, defaultWeight: 115 },
  { id: "chest-3", name: "Chest Fly", bodyPart: "Chest", defaultSets: 3, defaultReps: 12, defaultWeight: 40 },
  { id: "chest-4", name: "Push Ups", bodyPart: "Chest", defaultSets: 3, defaultReps: 15, defaultWeight: 0 },
  { id: "chest-5", name: "Decline Bench Press", bodyPart: "Chest", defaultSets: 3, defaultReps: 10, defaultWeight: 125 },
  { id: "chest-6", name: "Cable Crossover", bodyPart: "Chest", defaultSets: 3, defaultReps: 12, defaultWeight: 30 },

  { id: "back-1", name: "Deadlift", bodyPart: "Back", defaultSets: 3, defaultReps: 8, defaultWeight: 185 },
  { id: "back-2", name: "Pull Ups", bodyPart: "Back", defaultSets: 3, defaultReps: 10, defaultWeight: 0 },
  { id: "back-3", name: "Bent-over Row", bodyPart: "Back", defaultSets: 3, defaultReps: 10, defaultWeight: 95 },
  { id: "back-4", name: "Lat Pulldown", bodyPart: "Back", defaultSets: 3, defaultReps: 12, defaultWeight: 80 },
  { id: "back-5", name: "Seated Cable Row", bodyPart: "Back", defaultSets: 3, defaultReps: 12, defaultWeight: 70 },
  { id: "back-6", name: "T-Bar Row", bodyPart: "Back", defaultSets: 3, defaultReps: 10, defaultWeight: 90 },

  { id: "legs-1", name: "Squat", bodyPart: "Legs", defaultSets: 3, defaultReps: 10, defaultWeight: 185 },
  { id: "legs-2", name: "Leg Press", bodyPart: "Legs", defaultSets: 3, defaultReps: 12, defaultWeight: 220 },
  { id: "legs-3", name: "Lunges", bodyPart: "Legs", defaultSets: 3, defaultReps: 12, defaultWeight: 30 },
  { id: "legs-4", name: "Leg Curl", bodyPart: "Legs", defaultSets: 3, defaultReps: 12, defaultWeight: 60 },
  { id: "legs-5", name: "Leg Extension", bodyPart: "Legs", defaultSets: 3, defaultReps: 12, defaultWeight: 65 },
  { id: "legs-6", name: "Calf Raise", bodyPart: "Legs", defaultSets: 3, defaultReps: 15, defaultWeight: 45 },

  { id: "shoulders-1", name: "Overhead Press", bodyPart: "Shoulders", defaultSets: 3, defaultReps: 10, defaultWeight: 60 },
  { id: "shoulders-2", name: "Lateral Raise", bodyPart: "Shoulders", defaultSets: 3, defaultReps: 15, defaultWeight: 15 },
  { id: "shoulders-3", name: "Front Raise", bodyPart: "Shoulders", defaultSets: 3, defaultReps: 15, defaultWeight: 15 },
  { id: "shoulders-4", name: "Face Pulls", bodyPart: "Shoulders", defaultSets: 3, defaultReps: 15, defaultWeight: 25 },
  { id: "shoulders-5", name: "Arnold Press", bodyPart: "Shoulders", defaultSets: 3, defaultReps: 10, defaultWeight: 50 },
  { id: "shoulders-6", name: "Shrugs", bodyPart: "Shoulders", defaultSets: 3, defaultReps: 12, defaultWeight: 70 },

  { id: "arms-1", name: "Bicep Curls", bodyPart: "Arms", defaultSets: 3, defaultReps: 12, defaultWeight: 25 },
  { id: "arms-2", name: "Tricep Dips", bodyPart: "Arms", defaultSets: 3, defaultReps: 12, defaultWeight: 0 },
  { id: "arms-3", name: "Hammer Curls", bodyPart: "Arms", defaultSets: 3, defaultReps: 12, defaultWeight: 25 },
  { id: "arms-4", name: "Tricep Pushdown", bodyPart: "Arms", defaultSets: 3, defaultReps: 12, defaultWeight: 40 },
  { id: "arms-5", name: "Preacher Curl", bodyPart: "Arms", defaultSets: 3, defaultReps: 10, defaultWeight: 35 },
  { id: "arms-6", name: "Skull Crushers", bodyPart: "Arms", defaultSets: 3, defaultReps: 10, defaultWeight: 40 },

  { id: "core-1", name: "Plank", bodyPart: "Core", defaultSets: 3, defaultReps: 60, defaultWeight: 0 },
  { id: "core-2", name: "Russian Twists", bodyPart: "Core", defaultSets: 3, defaultReps: 30, defaultWeight: 10 },
  { id: "core-3", name: "Leg Raises", bodyPart: "Core", defaultSets: 3, defaultReps: 15, defaultWeight: 0 },
  { id: "core-4", name: "Mountain Climbers", bodyPart: "Core", defaultSets: 3, defaultReps: 40, defaultWeight: 0 },
  { id: "core-5", name: "Bicycle Crunches", bodyPart: "Core", defaultSets: 3, defaultReps: 25, defaultWeight: 0 },
  { id: "core-6", name: "Hanging Leg Raises", bodyPart: "Core", defaultSets: 3, defaultReps: 12, defaultWeight: 0 },
];

const bodyParts = ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core"];

export default function Workout() {
  const [workoutName, setWorkoutName] = useState("");
  const [showTimer, setShowTimer] = useState(false);
  const [collapsedParts, setCollapsedParts] = useState([...bodyParts]);
  const [collapsedRoutines, setCollapsedRoutines] = useState(true);
  const [workout, setWorkout] = useState([]);
  const [savedRoutines, setSavedRoutines] = useState([]);

  const togglePart = (part) => {
    setCollapsedParts((prev) =>
      prev.includes(part) ? prev.filter((p) => p !== part) : [...prev, part]
    );
  };

  const toggleRoutines = () => {
    setCollapsedRoutines((prev) => !prev);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    if (source.droppableId !== "workout" && destination.droppableId === "workout") {
      const template = exerciseLibrary.find((ex) => ex.id === draggableId);
      if (template) {
        const newItem = {
          id: draggableId + Date.now(),
          name: template.name,
          bodyPart: template.bodyPart,
          sets: template.defaultSets,
          reps: template.defaultReps,
          weight: template.defaultWeight,
          restMinutes: 1,
          restSeconds: 30,
        };
        const updated = Array.from(workout);
        updated.splice(destination.index, 0, newItem);
        setWorkout(updated);
      }
    } else if (source.droppableId === "workout" && destination.droppableId === "workout") {
      const updated = Array.from(workout);
      const [moved] = updated.splice(source.index, 1);
      updated.splice(destination.index, 0, moved);
      setWorkout(updated);
    }
  };

  const removeExercise = (id) => setWorkout(workout.filter((ex) => ex.id !== id));
  const updateField = (id, field, value) =>
    setWorkout(workout.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex)));

  const addSet = (id) =>
    setWorkout(workout.map((ex) => (ex.id === id ? { ...ex, sets: ex.sets + 1 } : ex)));

  const removeSet = (id) =>
    setWorkout(workout.map((ex) => (ex.id === id && ex.sets > 1 ? { ...ex, sets: ex.sets - 1 } : ex)));

  const totalDuration = workout.reduce(
    (total, ex) => total + ex.sets * 2 + ex.sets * (ex.restMinutes + ex.restSeconds / 60),
    0
  );
  const totalCalories = workout.reduce((total, ex) => total + ex.sets * ex.reps * 0.5, 0);

  const saveCurrentRoutine = () => {
    if (!workoutName.trim()) {
      toast.warn("Please enter a workout name before saving.");
      return;
    }
    if (workout.length === 0) {
      toast.warn("Add some exercises before saving.");
      return;
    }

    const routine = {
      id: "routine-" + Date.now(),
      name: workoutName.trim(),
      exercises: workout,
    };

    setSavedRoutines((prev) => [routine, ...prev]);
    setWorkoutName("");
    setWorkout([]);
    toast.success("Routine saved!");
  };

  const loadRoutine = (routine) => {
    setWorkout(routine.exercises);
    setWorkoutName(routine.name);
  };

  const removeRoutine = (id) => {
    setSavedRoutines((prev) => prev.filter((r) => r.id !== id));
    toast.info("Routine removed");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <Navbar />
      <div className="mx-auto px-4 md:px-6 lg:px-8 space-y-8 max-w-none">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-indigo-700 tracking-wide drop-shadow-md select-none">
            Workout Builder
          </h1>
          <button
            onClick={() => setShowTimer(!showTimer)}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-5 py-3 rounded hover:bg-indigo-700 transition"
          >
            <Clock className="w-5 h-5" />
            <span className="text-lg">{showTimer ? "Hide Timer" : "Show Timer"}</span>
          </button>
        </div>

        {showTimer && <Timer />}

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 space-y-6">
              <div className="bg-white p-5 rounded shadow border border-gray-200">
                <h2 className="font-semibold mb-4 text-gray-800 text-lg">Exercise Library</h2>
                <p className="text-xs text-gray-500 mb-4">Drag exercises to your workout</p>
                <div className="space-y-3">
                  {bodyParts.map((part) => (
                    <div key={part} className="bg-gray-50 border rounded border-gray-200">
                      <button
                        onClick={() => togglePart(part)}
                        className="w-full flex justify-between items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-100 transition font-medium"
                      >
                        <span>{part}</span>
                        {collapsedParts.includes(part) ? (
                          <ChevronRight className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                      {!collapsedParts.includes(part) && (
                        <Droppable droppableId={`library-${part}`} isDropDisabled={true}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="p-2 space-y-2 max-h-72 overflow-y-auto"
                            >
                              {exerciseLibrary
                                .filter((ex) => ex.bodyPart === part)
                                .map((ex, idx) => (
                                  <Draggable key={ex.id} draggableId={ex.id} index={idx}>
                                    {(prov) => (
                                      <div
                                        ref={prov.innerRef}
                                        {...prov.draggableProps}
                                        {...prov.dragHandleProps}
                                        className="p-3 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 cursor-grab transition"
                                      >
                                        {ex.name}
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Saved Routines Section */}
              <div className="bg-white p-5 rounded shadow border border-gray-200">
                <button
                  onClick={toggleRoutines}
                  className="w-full flex justify-between items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-100 transition font-semibold text-lg"
                >
                  <span>Saved Routines</span>
                  {collapsedRoutines ? (
                    <ChevronRight className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                {!collapsedRoutines && (
                  <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                    {savedRoutines.length === 0 ? (
                      <p className="text-gray-500 text-sm italic px-2">No saved routines.</p>
                    ) : (
                      savedRoutines.map((routine) => (
                        <div
                          key={routine.id}
                          className="p-3 bg-white border border-gray-300 rounded text-gray-700 text-sm hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                          title={routine.name}
                        >
                          <span
                            className="flex-grow"
                            onClick={() => loadRoutine(routine)}
                          >
                            {routine.name}
                          </span>
                          <button
                            onClick={() => removeRoutine(routine.id)}
                            className="text-red-600 hover:text-red-800 ml-3"
                            title="Remove routine"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-8 space-y-6">
              <input
                type="text"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                placeholder="Enter workout name..."
                className="w-full px-5 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
              />
              <div className="flex justify-between text-gray-600 text-base font-medium">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{Math.round(totalDuration)} min</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Flame className="w-5 h-5" />
                  <span>{Math.round(totalCalories)} cal</span>
                </div>
              </div>

              <Droppable droppableId="workout">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[300px] p-5 border-2 rounded ${
                      snapshot.isDraggingOver
                        ? "border-indigo-400 bg-indigo-50"
                        : "border-gray-300 bg-white"
                    } space-y-4 transition`}
                  >
                    {workout.length === 0 && (
                      <div className="text-center text-gray-500">
                        <Dumbbell className="w-12 h-12 mx-auto mb-3" />
                        <p className="text-lg">Drag exercises here to build your workout</p>
                      </div>
                    )}

                    {workout.map((ex, idx) => (
                      <Draggable key={ex.id} draggableId={ex.id} index={idx}>
                        {(prov) => (
                          <div
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                            className="bg-gray-50 border border-gray-200 rounded p-3 shadow-sm space-y-2"
                          >
                            <div className="grid grid-cols-12 gap-4 items-center">
                              <div {...prov.dragHandleProps} className="cursor-grab text-gray-400">
                                <GripVertical className="w-6 h-6" />
                              </div>
                              <div className="col-span-5 font-semibold text-gray-800">{ex.name}</div>

                              <div className="col-span-2 flex items-center space-x-2">
                                <button
                                  onClick={() => removeSet(ex.id)}
                                  className="p-1 bg-indigo-100 text-indigo-700 rounded"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <input
                                  type="number"
                                  min={1}
                                  value={ex.sets}
                                  onChange={(e) => updateField(ex.id, "sets", Number(e.target.value))}
                                  className="w-12 text-center rounded border border-gray-300"
                                />
                                <button
                                  onClick={() => addSet(ex.id)}
                                  className="p-1 bg-indigo-100 text-indigo-700 rounded"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              <div className="col-span-2">
                                <input
                                  type="number"
                                  min={1}
                                  value={ex.reps}
                                  onChange={(e) => updateField(ex.id, "reps", Number(e.target.value))}
                                  className="w-full text-center rounded border border-gray-300"
                                />
                              </div>

                              <div className="col-span-2">
                                <input
                                  type="number"
                                  min={0}
                                  value={ex.weight}
                                  onChange={(e) => updateField(ex.id, "weight", Number(e.target.value))}
                                  className="w-full text-center rounded border border-gray-300"
                                  placeholder="Weight"
                                />
                              </div>

                              <div className="col-span-1 text-right">
                                <button
                                  onClick={() => removeExercise(ex.id)}
                                  className="text-red-500 hover:text-red-700"
                                  title="Remove exercise"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-12 gap-2 items-center">
                              <div className="col-span-4 flex items-center space-x-1 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                <input
                                  type="number"
                                  min={0}
                                  max={59}
                                  value={ex.restMinutes}
                                  onChange={(e) => updateField(ex.id, "restMinutes", Number(e.target.value))}
                                  className="w-10 text-center rounded border border-gray-300"
                                  title="Rest minutes"
                                />
                                <span>m</span>
                                <input
                                  type="number"
                                  min={0}
                                  max={59}
                                  value={ex.restSeconds}
                                  onChange={(e) => updateField(ex.id, "restSeconds", Number(e.target.value))}
                                  className="w-10 text-center rounded border border-gray-300"
                                  title="Rest seconds"
                                />
                                <span>s</span>
                              </div>
                              <div className="col-span-8 text-right text-sm text-gray-500 italic">
                                Rest time between sets
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <div className="flex justify-between items-center mt-4 space-x-4">
                <button
                  onClick={saveCurrentRoutine}
                  className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition"
                >
                  <Plus className="w-5 h-5" />
                  <span>Save Routine</span>
                </button>
                <button
                  onClick={() => {
                    setWorkout([]);
                    setWorkoutName("");
                    toast.info("Workout cleared");
                  }}
                  className="px-6 py-3 border border-gray-300 rounded hover:bg-gray-100 transition text-gray-700"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </DragDropContext>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
