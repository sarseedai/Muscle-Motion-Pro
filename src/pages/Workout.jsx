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

const exerciseLibrary = [
  // ... your exerciseLibrary (unchanged)
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
      alert("Please enter a workout name before saving.");
      return;
    }
    if (workout.length === 0) {
      alert("Add some exercises before saving.");
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
    alert("Routine saved!");
  };

  const loadRoutine = (routine) => {
    setWorkout(routine.exercises);
    setWorkoutName(routine.name);
  };

  const removeRoutine = (id) => {
    setSavedRoutines((prev) => prev.filter((r) => r.id !== id));
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
            {/* Sidebar */}
            <div className="md:col-span-4 space-y-6">
              {/* Exercise library (unchanged) */}
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
                          className="flex justify-between items-center p-3 bg-white border border-gray-300 rounded text-gray-700 text-sm hover:bg-gray-50 transition"
                        >
                          <span
                            onClick={() => loadRoutine(routine)}
                            className="cursor-pointer flex-1 truncate"
                          >
                            {routine.name}
                          </span>
                          <button
                            onClick={() => removeRoutine(routine.id)}
                            className="text-red-500 hover:text-red-700 ml-2"
                            title="Remove routine"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Main content */}
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
                    {/* Header row */}
                    {workout.length > 0 && (
                      <div className="grid grid-cols-12 gap-4 text-gray-500 text-xs font-semibold px-2">
                        <div className="col-span-1"></div>
                        <div className="col-span-3">Exercise</div>
                        <div className="col-span-1 text-center">Sets</div>
                        <div className="col-span-1 text-center">Reps</div>
                        <div className="col-span-2 text-center">Weight</div>
                        <div className="col-span-2 text-center">Adjust</div>
                        <div className="col-span-1"></div>
                      </div>
                    )}

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
                              <div
                                {...prov.dragHandleProps}
                                className="col-span-1 text-gray-400 cursor-grab flex justify-center"
                              >
                                <GripVertical className="w-5 h-5" />
                              </div>
                              <div className="col-span-3">
                                <div className="font-medium text-gray-900">{ex.name}</div>
                                <div className="text-xs text-gray-500">{ex.bodyPart}</div>
                              </div>
                              <input
                                type="number"
                                value={ex.sets}
                                min={1}
                                onChange={(e) => updateField(ex.id, "sets", +e.target.value)}
                                className="col-span-1 text-center border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                              />
                              <input
                                type="number"
                                value={ex.reps}
                                min={1}
                                onChange={(e) => updateField(ex.id, "reps", +e.target.value)}
                                className="col-span-1 text-center border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                              />
                              <input
                                type="number"
                                value={ex.weight}
                                min={0}
                                onChange={(e) => updateField(ex.id, "weight", +e.target.value)}
                                className="col-span-2 text-center border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                              />
                              <div className="col-span-2 flex items-center space-x-1">
                                <button
                                  onClick={() => removeSet(ex.id)}
                                  className="bg-red-200 hover:bg-red-300 text-red-800 rounded px-2 py-1"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => addSet(ex.id)}
                                  className="bg-green-200 hover:bg-green-300 text-green-800 rounded px-2 py-1"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeExercise(ex.id)}
                                className="col-span-1 text-red-600 hover:text-red-800 flex justify-center"
                                title="Remove exercise"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <button
                onClick={saveCurrentRoutine}
                className="mt-4 w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition font-semibold text-lg"
              >
                Save Routine
              </button>
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
