import { Calendar, Flame, Trophy, Target, Settings } from "lucide-react";
import profilePic from '../assets/userprofile.jpg';
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getThisWeekActive } from "./Dashboard";

const UserProfile = () => {
  const userStats = {
    name: "Sarthak Sedai",
    joinDate: "January 2023",
    totalWorkouts: 47,
    currentStreak: 12,
    longestStreak: 18,
    totalWeightLifted: 125000,
    achievements: [
      { name: "First Workout", date: "Jan 15, 2023", icon: Target },
      { name: "Week Warrior", date: "Feb 1, 2023", icon: Calendar },
      { name: "Consistency King", date: "Feb 20, 2023", icon: Flame },
      { name: "Strength Milestone", date: "Mar 5, 2023", icon: Trophy },
    ],
  };

  const lbsToKgs = (lbs) => Math.round(lbs / 2.20462);


  const [personalBests, setPersonalBests] = useState(() => {
    const stored = localStorage.getItem("userPersonalBests");
    try {
      return stored ? JSON.parse(stored) : [
        { name: "Bench Press", data: null, date: null, prevNumInput: null },
        { name: "Squat", data: null, date: null, prevNumInput: null },
        { name: "Deadlift", data: null, date: null, prevNumInput: null },
        { name: "Overhead Press", data: null, date: null, prevNumInput: null },
      ];
    } catch {
      return [
        { name: "Bench Press", data: null, date: null, prevNumInput: null },
        { name: "Squat", data: null, date: null, prevNumInput: null },
        { name: "Deadlift", data: null, date: null, prevNumInput: null },
        { name: "Overhead Press", data: null, date: null, prevNumInput: null },
      ];
    }
  });
  const [bodyMatrics, setBodyMatrics] = useState(() => {
    const stored = localStorage.getItem("userBodyMatrics");
    try {
      return stored ? JSON.parse(stored) : [
        { name: "Body Weight", data: null, date: null, prevNumInput: null },
        { name: "Body Fat", data: null, date: null, prevNumInput: null },
        { name: "Muscle Mass", data: null, date: null, prevNumInput: null },
      ];
    } catch {
      return [
        { name: "Body Weight", data: null, date: null, prevNumInput: null },
        { name: "Body Fat", data: null, date: null, prevNumInput: null },
        { name: "Muscle Mass", data: null, date: null, prevNumInput: null },
      ];
    }
  });
  const [Goals, setGoals] = useState(() => {
    const stored = localStorage.getItem("userGoals");
    try {
      return stored ? JSON.parse(stored) : [
        { name: "Bench Press", target: null },
        { name: "Workout per week", target: null, },
        { name: "Body Weight Goal", target: null, },
      ];
    } catch {
      return [
        { name: "Bench Press", target: null },
        { name: "Workout per week", target: null, },
        { name: "Body Weight Goal", target: null, },
      ];
    }
  });
  const bench = personalBests.find(v => v.name === "Bench Press")
  const bodyWeight = bodyMatrics.find(v => v.name === "Body Weight")
  const sessions = getThisWeekActive()
  const goals = Goals.map((v) => {
    const data = { ...v }
    if (v.name === "Bench Press") {
      data.current = bench?.data
      data.date = bench?.date
      return data
    }
    if (v.name === "Workout per week") {
      data.current = sessions ?? null
      data.date = null
      return data
    }
    if (v.name === "Body Weight Goal") {
      data.current = bodyWeight?.data
      data.date = bodyWeight?.date
      return data
    }
  })

  const [editingGoals, setEditingGoals] = useState(false)
  const [editingBodyMatrics, setEditingBodyMatrics] = useState(false)
  const [editingPersonalBests, setEditingPersonalBests] = useState(false)

  function handleBodyMatrixChange(e) {
    e.preventDefault()
    if (editingBodyMatrics) {
      setEditingBodyMatrics(false)
      const labels = ["Body Weight", "Body Fat", "Muscle Mass"];
      const newMetrics = [];
      const timeNow = new Date().toDateString()
      let history = { date: timeNow }

      for (let i = 0; i < labels.length; i++) {
        const value = labels[i];
        const input = document.getElementById(value)?.value;

        if (!input) {
          toast.warn(`Please enter ${value.toLowerCase()} data.`);
          return;
        }

        const numberInput = parseFloat(input);
        if (isNaN(numberInput)) {
          toast.warn(`${value.toLowerCase()} data must be a number.`);
          return;
        }
        const prevData = personalBests.find(v => v.name === labels) ?? null
        const prevNumInput = prevData?.data
        const sameInput = prevNumInput === numberInput
        newMetrics.push({
          name: value,
          data: sameInput ? prevData?.data : numberInput,
          date: sameInput ? prevData?.date : timeNow,
          prevNumInput: sameInput ? prevData?.prevNumInput : prevNumInput
        });
        history[value] = numberInput
      }
      setBodyMatrics(newMetrics);
      const historyStore = localStorage.getItem("userBodyMatricsHistory") || "[]"
      localStorage.setItem("userBodyMatricsHistory", JSON.stringify([history, ...JSON.parse(historyStore)].slice(0, 6)))
      localStorage.setItem("userBodyMatrics", JSON.stringify(newMetrics));
      return
    }
    setEditingBodyMatrics(true)
  }
  function handlePersonalBestsChange(e) {
    e.preventDefault()
    if (editingPersonalBests) {
      setEditingPersonalBests(false)
      const labels = ["Bench Press", "Squat", "Deadlift", "Overhead Press"];
      const newMetrics = [];
      const timeNow = new Date().toDateString()
      let history = { date: timeNow }
      for (let i = 0; i < labels.length; i++) {
        const value = labels[i];
        const input = document.getElementById(value)?.value;

        if (!input) {
          toast.warn(`Please enter ${value.toLowerCase()} data.`);
          return;
        }

        const numberInput = parseFloat(input);
        if (isNaN(numberInput)) {
          toast.warn(`${value.toLowerCase()} data must be a number.`);
          return;
        }
        const prevData = personalBests.find(v => v.name === value) ?? null
        const prevNumInput = prevData?.data
        const sameInput = prevNumInput === numberInput
        newMetrics.push({
          name: value,
          data: sameInput ? prevData?.data : numberInput,
          date: sameInput ? prevData?.date : timeNow,
          prevNumInput: sameInput ? prevData?.prevNumInput : prevNumInput
        });
        history[value] = numberInput
      }
      setPersonalBests(newMetrics);
      const historyStore = localStorage.getItem("userPersonalBestsHistory") || "[]"
      localStorage.setItem("userPersonalBestsHistory", JSON.stringify([history, ...JSON.parse(historyStore)].slice(0, 6)))
      localStorage.setItem("userPersonalBests", JSON.stringify(newMetrics));
      return
    }
    setEditingPersonalBests(true)
  }
  function handleGoalsChange(e) {
    e.preventDefault()
    if (editingGoals) {
      setEditingGoals(false)
      const labels = ["Bench Press", "Workout per week", "Body Weight Goal"];
      const newMetrics = [];

      for (let i = 0; i < labels.length; i++) {
        const value = labels[i];
        const input = document.getElementById(value)?.value;

        if (!input) {
          toast.warn(`Please enter ${value.toLowerCase()} data.`);
          return;
        }

        const numberInput = parseFloat(input);
        if (isNaN(numberInput)) {
          toast.warn(`${value.toLowerCase()} data must be a number.`);
          return;
        }

        newMetrics.push({
          name: value,
          target: numberInput,
        });
      }

      setGoals(newMetrics);
      localStorage.setItem("userGoals", JSON.stringify(newMetrics));
      return
    }
    setEditingGoals(true)
  }
  return (
    <>
      <ToastContainer />

      <Header />
      <Navbar />
      <div className="max-w-[1650px] mx-auto px-2 py-4 space-y-6">
        <div className="flex items-center gap-6 bg-white rounded-2xl p-6 shadow-md">
          <img
            src={profilePic}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-purple-600"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Sarthak Sedai</h2>
                <p className="text-gray-500">Member since January 2023</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex justify-between mb-2">
                <h3 className="text-xl font-semibold mb-4">Current Goals</h3>
                <div className="flex gap-2">
                  <button className="font-semibold text-sm cursor-pointer bg-purple-100 px-2 h-8 rounded-sm" onClick={handleGoalsChange}>
                    {editingGoals ? "Save" : "Edit"}</button>
                  {editingGoals && <button className="font-semibold text-sm cursor-pointer bg-purple-100  px-2 h-8 rounded-sm" onClick={() => setEditingGoals(false)}>Cancle</button>}
                </div>
              </div>
              <div className="space-y-6">
                {goals.map((goal, idx) => {
                  const progress = Math.min((goal.current / goal.target) * 100, 100);
                  return (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{goal.name}</h4>
                        <span className="text-sm text-gray-500">{goal.date}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>
                          {goal.current ?? "--"} / {editingGoals ? (<input type="text" className="focus:outline-none focus:ring-0 px-2 py-1 rounded-sm text-black bg-purple-100"
                            placeholder={goal.target ?? "--"} id={goal.name} name={goal.name}></input>) :
                            (goal.target ?? "--")
                          } {goal.name.includes("Workout") ? "sessions" : "kg"}
                        </span>
                        <span>{Math.round(progress)}% complete</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-purple-600 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex justify-between mb-2">
                <h3 className="text-xl font-semibold mb-4">Body Metrics</h3>
                <div className="flex gap-2">
                  <button className="font-semibold text-sm cursor-pointer bg-emerald-100 px-2 h-8 rounded-sm" onClick={handleBodyMatrixChange}>
                    {editingBodyMatrics ? "Save" : "Edit"}</button>
                  {editingBodyMatrics && <button className="font-semibold text-sm cursor-pointer bg-emerald-100  px-2 h-8 rounded-sm" onClick={() => setEditingBodyMatrics(false)}>Cancle</button>}
                </div>
              </div>
              <div className="space-y-4">
                {bodyMatrics.map((record, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-emerald-100 rounded-lg p-3"
                  >
                    <div>
                      <h4 className="font-semibold">{record.name}</h4>
                      <p className="text-sm text-gray-500">{record.date}</p>
                    </div>
                    <div className="bg-emerald-500 text-white rounded-sm px-2 py-1 font-semibold">
                      {editingBodyMatrics ? (<input type="text" className="focus:outline-none focus:ring-0 px-2 text-white"
                        placeholder={record.data ? record.name === "Body Fat" ? `${record.data} %` : `${record.data} kg` : record.name === "Body Fat" ? `-- %` : "-- kg"}
                        defaultValue={record.data ?? "0"}
                        id={record.name} name={record.name}></input>) :
                        (record.data ? record.name === "Body Fat" ? `${record.data} %` : `${record.data} kg` : record.name === "Body Fat" ? `-- %` : "-- kg")
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex justify-between mb-2">
                <h3 className="text-xl font-semibold mb-4">Personal Bests</h3>
                <div className="flex gap-2">
                  <button className="font-semibold cursor-pointer text-sm bg-purple-100 px-2 h-8  rounded-sm" onClick={handlePersonalBestsChange}>
                    {editingPersonalBests ? "Save" : "Edit"}</button>
                  {editingPersonalBests && <button className="font-semibold cursor-pointer text-sm bg-purple-100 px-2 h-8  rounded-sm" onClick={() => setEditingPersonalBests(false)}>Cancle</button>}
                </div>
              </div>
              <div className="space-y-4">
                {personalBests.map((record, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-purple-100 rounded-lg p-3"
                  >
                    <div>
                      <h4 className="font-semibold">{record.name}</h4>
                      <p className="text-sm text-gray-500">{record.date}</p>
                    </div>
                    <div className="bg-purple-500 text-white rounded-sm px-2 py-1 font-semibold">
                      {editingPersonalBests ? (<input type="text" className="focus:outline-none focus:ring-0 px-2 text-white"
                        placeholder={record.data ? `${record.data} kg` : "-- kg"}
                        defaultValue={record.data ?? "0"}
                        id={record.name} name={record.name}></input>) :
                        (record.data ? `${record.data} kg` : "-- kg")
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-yellow-50 rounded-2xl p-6 shadow-md space-y-4">
              <h3 className="text-xl font-semibold mb-4">Recent Achievements</h3>
              {userStats.achievements.map((achievement, idx) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-yellow-100 rounded-lg p-3"
                  >
                    <Icon className="w-6 h-6 text-yellow-600" />
                    <div>
                      <h4 className="font-semibold text-sm">{achievement.name}</h4>
                      <p className="text-xs text-gray-600">{achievement.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default UserProfile;