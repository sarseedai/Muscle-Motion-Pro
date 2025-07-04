import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Progress() {
  const [activeTab, setActiveTab] = useState("strength");

  const strengthData = [
    { date: "Jan 1", bench: 140, squat: 200, deadlift: 250 },
    { date: "Jan 15", bench: 145, squat: 210, deadlift: 260 },
    { date: "Feb 1", bench: 150, squat: 220, deadlift: 270 },
    { date: "Feb 15", bench: 155, squat: 230, deadlift: 280 },
    { date: "Mar 1", bench: 160, squat: 240, deadlift: 290 },
    { date: "Mar 15", bench: 165, squat: 250, deadlift: 300 },
  ];

  const bodyMetricsData = [
    { date: "Jan 1", bodyFat: 18, muscleMass: 40 },
    { date: "Jan 15", bodyFat: 17.5, muscleMass: 41 },
    { date: "Feb 1", bodyFat: 17, muscleMass: 42 },
    { date: "Feb 15", bodyFat: 16.5, muscleMass: 42.5 },
    { date: "Mar 1", bodyFat: 16, muscleMass: 43 },
    { date: "Mar 15", bodyFat: 15.5, muscleMass: 44 },
  ];

  const weightData = [
    { date: "Jan 1", weight: 70 },
    { date: "Jan 15", weight: 71 },
    { date: "Feb 1", weight: 72 },
    { date: "Feb 15", weight: 73 },
    { date: "Mar 1", weight: 74 },
    { date: "Mar 15", weight: 75 },
  ];

  const personalRecords = [
    { exercise: "Bench Press", current: 85, previous: 80, date: "Mar 10" },
    { exercise: "Squat", current: 125, previous: 120, date: "Mar 8" },
    { exercise: "Deadlift", current: 140, previous: 135, date: "Mar 5" },
    { exercise: "Overhead Press", current: 60, previous: 55, date: "Mar 3" },
  ];

  return (
    <div>
      <Header />
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Progress Overview</h2>
          <p className="text-gray-600">Track your fitness journey and celebrate improvements</p>
        </div>

        <div className="flex justify-start bg-gray-50 rounded-md shadow-sm overflow-hidden">
          <button
            onClick={() => setActiveTab("strength")}
            className={`flex-1 px-4 py-2 text-center text-sm sm:text-base font-medium transition-colors ${
              activeTab === "strength"
                ? "bg-white text-black shadow-inner"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Strength
          </button>
          <button
            onClick={() => setActiveTab("body")}
            className={`flex-1 px-4 py-2 text-center text-sm sm:text-base font-medium transition-colors ${
              activeTab === "body"
                ? "bg-white text-black shadow-inner"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Body Metrics
          </button>
          <button
            onClick={() => setActiveTab("weight")}
            className={`flex-1 px-4 py-2 text-center text-sm sm:text-base font-medium transition-colors ${
              activeTab === "weight"
                ? "bg-white text-black shadow-inner"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Weight Progress
          </button>
          <button
            onClick={() => setActiveTab("records")}
            className={`flex-1 px-4 py-2 text-center text-sm sm:text-base font-medium transition-colors ${
              activeTab === "records"
                ? "bg-white text-black shadow-inner"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Personal Records
          </button>
        </div>

        <div className="bg-white rounded-md p-4 shadow">
          {activeTab === "strength" && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Strength Progress</h3>
              <p className="text-gray-600 mb-4">Track your main lift improvements over time</p>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={strengthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="bench" stroke="#3b82f6" strokeWidth={2} name="Bench Press" />
                  <Line type="monotone" dataKey="squat" stroke="#10b981" strokeWidth={2} name="Squat" />
                  <Line type="monotone" dataKey="deadlift" stroke="#8b5cf6" strokeWidth={2} name="Deadlift" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === "body" && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Body Metrics</h3>
              <p className="text-gray-600 mb-4">Monitor your body measurements and composition</p>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={bodyMetricsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="bodyFat" stroke="#ef4444" strokeWidth={2} name="Body Fat %" />
                  <Line type="monotone" dataKey="muscleMass" stroke="#f59e0b" strokeWidth={2} name="Muscle Mass" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === "weight" && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Weight Progress</h3>
              <p className="text-gray-600 mb-4">See how your weight has changed over time</p>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="weight" stroke="#6366f1" strokeWidth={2} name="Weight (kg)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === "records" && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Personal Records</h3>
              <p className="text-gray-600 mb-4">Your recent top lifts and milestones</p>
              <div className="flex flex-col gap-4">
                {personalRecords.map((record, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-lg border border-gray-200 shadow hover:shadow-md transition-shadow p-4 w-full"
                  >
                    <div className="flex flex-col mb-2 md:mb-0">
                      <span className="text-base font-medium text-gray-900">{record.exercise}</span>
                      <span className="text-xs text-gray-500">{record.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-block px-2 py-0.5 rounded bg-gray-100 text-gray-800 text-sm">{record.previous} kg</span>
                      <span className="text-gray-500">→</span>
                      <span className="inline-block px-2 py-0.5 rounded bg-green-500 text-white text-sm">{record.current} kg</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
