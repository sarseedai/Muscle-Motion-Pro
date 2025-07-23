import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


function getStrenghtData() {
  try {
    const data = localStorage.getItem("userPersonalBestsHistory") || "[]"
    const parsed = JSON.parse(data)
    if (parsed.length < 1) throw Error()
    else return parsed.reverse()
  }
  catch (e) {
    return [
      { date: "Jan 1", "Bench Press": 0, "Overhead Press": 0, "Squat": 0, "Deadlift": 0, },
      { date: "Jan 15", "Bench Press": 0, "Overhead Press": 0, "Squat": 0, "Deadlift": 0 },
      { date: "Feb 1", "Bench Press": 0, "Overhead Press": 0, "Squat": 0, "Deadlift": 0 },
      { date: "Feb 15", "Bench Press": 0, "Overhead Press": 0, "Squat": 0, "Deadlift": 0 },
      { date: "Mar 1", "Bench Press": 0, "Overhead Press": 0, "Squat": 0, "Deadlift": 0 },
      { date: "Mar 15", "Bench Press": 0, "Overhead Press": 0, "Squat": 0, "Deadlift": 0 },
    ];
  }
}
function getBodyMetricsData(isWeight) {
  try {
    const data = localStorage.getItem("userBodyMatricsHistory") || "[]"
    const parsed = JSON.parse(data)
    if (parsed.length < 1) {
      throw Error()
    }
    else {
      return parsed.map((v) => {
        let data = {}
        data.date = v.date
        if (isWeight) {
          data["Body Weight"] = v["Body Weight"]
        }
        else {
          data["Body Fat"] = v["Body Fat"]
          data["Muscle Mass"] = v["Muscle Mass"]

        }
        return data
      }).reverse()
    }
  }
  catch {
    if (isWeight) return [
      { date: "Jan 1", "Body Weight": 0 },
      { date: "Jan 15", "Body Weight": 0 },
      { date: "Feb 1", "Body Weight": 0 },
      { date: "Feb 15", "Body Weight": 0 },
      { date: "Mar 1", "Body Weight": 0 },
      { date: "Mar 15", "Body Weight": 0 },
    ]; else
      return [
        { date: "Jan 1", "Body Fat": 0, "Muscle Mass": 0 },
        { date: "Jan 15", "Body Fat": 0, "Muscle Mass": 0 },
        { date: "Feb 1", "Body Fat": 0, "Muscle Mass": 0 },
        { date: "Feb 15", "Body Fat": 0, "Muscle Mass": 0 },
        { date: "Mar 1", "Body Fat": 0, "Muscle Mass": 0 },
        { date: "Mar 15", "Body Fat": 0, "Muscle Mass": 0 },
      ];
  }
}

function getPersonalRecords() {

  try {
    const data = localStorage.getItem("userPersonalBests") || "[]"
    const parsed = JSON.parse(data)
    if (parsed.length < 1) throw Error()
    return parsed
  } catch {
    return [
      { name: "Bench Press", data: 0, prevNumInput: 0, date: null },
      { name: "Squat", data: 0, prevNumInput: 0, date: null },
      { name: "Deadlift", data: 0, prevNumInput: 0, date: null },
      { name: "Overhead Press", data: 0, prevNumInput: 0, date: null },
    ];
  }
}

export default function Progress() {
  const [activeTab, setActiveTab] = useState("strength");

  const strengthData = getStrenghtData()

  const bodyMetricsData = getBodyMetricsData(false)

  const weightData = getBodyMetricsData(true)

  const personalRecords = getPersonalRecords()

  return (
    <div>
      <Header />
      <Navbar />
      {/* Use almost full width with minimal horizontal padding */}
      <div className="max-w-[98vw] mx-auto px-1 py-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Progress Overview</h2>
          <p className="text-gray-600">Track your fitness journey and celebrate improvements</p>
        </div>

        <div className="flex justify-start bg-gray-50 rounded-md shadow-sm overflow-hidden">
          <button
            onClick={() => setActiveTab("strength")}
            className={`flex-1 px-4 py-2 text-center text-sm sm:text-base font-medium transition-colors ${activeTab === "strength"
              ? "bg-white text-black shadow-inner"
              : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            Strength
          </button>
          <button
            onClick={() => setActiveTab("body")}
            className={`flex-1 px-4 py-2 text-center text-sm sm:text-base font-medium transition-colors ${activeTab === "body"
              ? "bg-white text-black shadow-inner"
              : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            Body Metrics
          </button>
          <button
            onClick={() => setActiveTab("weight")}
            className={`flex-1 px-4 py-2 text-center text-sm sm:text-base font-medium transition-colors ${activeTab === "weight"
              ? "bg-white text-black shadow-inner"
              : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            Weight Progress
          </button>
          <button
            onClick={() => setActiveTab("records")}
            className={`flex-1 px-4 py-2 text-center text-sm sm:text-base font-medium transition-colors ${activeTab === "records"
              ? "bg-white text-black shadow-inner"
              : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            Personal Records
          </button>
        </div>

        <div className="bg-white rounded-md p-6 shadow">
          {activeTab === "strength" && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Strength Progress</h3>
              <p className="text-gray-600 mb-4">Track your main lift improvements over time</p>
              <ResponsiveContainer width="100%" height={360}>
                <LineChart data={strengthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="Bench Press" stroke="#3b82f6" strokeWidth={2} name="Bench Press" />
                  <Line type="monotone" dataKey="Overhead Press" stroke="#8b5cf6" strokeWidth={2} name="Overhead Press" />
                  <Line type="monotone" dataKey="Squat" stroke="#10b981" strokeWidth={2} name="Squat" />
                  <Line type="monotone" dataKey="Deadlift" stroke="#ff5733" strokeWidth={2} name="Deadlift" />

                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === "body" && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Body Metrics</h3>
              <p className="text-gray-600 mb-4">Monitor your body measurements and composition</p>
              <ResponsiveContainer width="100%" height={360}>
                <LineChart data={bodyMetricsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="Body Fat" stroke="#ef4444" strokeWidth={2} name="Body Fat %" />
                  <Line type="monotone" dataKey="Muscle Mass" stroke="#f59e0b" strokeWidth={2} name="Muscle Mass" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === "weight" && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Weight Progress</h3>
              <p className="text-gray-600 mb-4">See how your weight has changed over time</p>
              <ResponsiveContainer width="100%" height={360}>
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="Body Weight" stroke="#6366f1" strokeWidth={2} name="Weight (kg)" />
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
                      <span className="text-base font-medium text-gray-900">{record.name}</span>
                      <span className="text-xs text-gray-500">{record.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-block px-2 py-0.5 rounded bg-gray-100 text-gray-800 text-sm">{record.prevNumInput ?? 0} kg</span>
                      <span className="text-gray-500">→</span>
                      <span className="inline-block px-2 py-0.5 rounded bg-green-500 text-white text-sm">{record.data} kg</span>
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