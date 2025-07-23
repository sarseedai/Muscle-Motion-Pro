import { useState, useEffect } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import ActivityChart from "../components/ActivityChart";
import Goalsprogress from "../components/Goalsprogress";

const lbsToKgs = (lbs) => (lbs / 2.20462).toFixed(1);

export const getThisWeekActive = () => {
  const workouts = localStorage.getItem("savedWorkout") || "[]"
  let sessions = 0
  JSON.parse(workouts).forEach((r) => {
    r.thisWeek.forEach((active, i) => {
      if (active == 1) sessions = sessions + 1
    })
  })
  return sessions
}
const getTotalWeightTillNow = () => {
  const workouts = localStorage.getItem("savedWorkout") || "[]"
  let weight = 0
  JSON.parse(workouts).forEach((r) => {
    weight = weight + r.totalWeight
  })
  return lbsToKgs(weight)
}
const getTotalCaloriesTillNow = () => {
  const workouts = localStorage.getItem("savedWorkout") || "[]"
  let calories = 0
  JSON.parse(workouts).forEach((r) => {
    calories = calories + r.totalCaloriesLost
  })
  return calories
}
export const getGoals = (goals) => {
  const bench = JSON.parse(localStorage.getItem("userPersonalBests") || "[]")?.find(v => v.name === "Bench Press")
  const bodyWeight = JSON.parse(localStorage.getItem("userBodyMatrics") || "[]")?.find(v => v.name === "Body Weight")
  const sessions = getThisWeekActive()

  const data = goals.map((v) => {
    const newGoal = { ...v }; // Create a new object

    if (newGoal.name === "Bench Press") {
      newGoal.current = bench?.data ?? null;
      newGoal.date = bench?.date ? new Date(bench.date).toDateString() : null; // Example: convert to string
    } else if (newGoal.name === "Workout per week") { // Use else if for mutually exclusive conditions
      newGoal.current = sessions ?? null;
      newGoal.date = null; // No date for this goal
    } else if (newGoal.name === "Body Weight Goal") { // Use else if
      newGoal.current = bodyWeight?.data ?? null;
      newGoal.date = bodyWeight?.date ? new Date(bodyWeight.date).toDateString() : null; // Example: convert to string
    }
    return newGoal; // Return the new object
  });
  return data;
};
export default function Dashboard() {
  const [summaryStats, setSummaryStats] = useState([]);
  const [goals, setGoals] = useState(() => {
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

  useEffect(() => {
    // Mock API call to fetch dashboard data
    const fetchDashboardData = async () => {
      const Goals = getGoals(goals)
      let goalsHit = 0;
      Goals.forEach((v) => {
        if (v.curren && v.target && v.current >= v.target) goalsHit += 1
      })

      const data = {
        summaryStats: [
          { title: "Sessions This Week", value: getThisWeekActive(), color: "bg-purple-600" },
          { title: "Total Weight", value: `${getTotalWeightTillNow()} kgs`, color: "bg-blue-600" },
          { title: "Goals Hit", value: `${goalsHit}/${Goals.length}`, color: "bg-green-600" },
          { title: "Calories Burned", value: `${getTotalCaloriesTillNow()}`, color: "bg-orange-600" },
        ],
        goals: Goals
      };

      setSummaryStats(data.summaryStats);
      setGoals(data.goals);
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Navbar />
      <main className="p-6 md:p-8">
        <section
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6"
          aria-label="Summary statistics"
        >
          {summaryStats.map((stat, idx) => (
            <DashboardCard
              key={idx}
              title={stat.title}
              value={stat.value}
              color={stat.color}
              className="hover:shadow-xl transition-shadow duration-300"
            />
          ))}
        </section>

        <section className="grid md:grid-cols-1 gap-6" aria-label="Charts">
          {/* <div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            role="region"
            aria-labelledby="weight-progress-heading"
          >
            <h2
              id="weight-progress-heading"
              className="mb-4 font-semibold text-lg text-gray-800"
            >
              Weight Progress
            </h2>
            <ProgressChart />
          </div> */}
          <div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            role="region"
            aria-labelledby="weekly-activity-heading"
          >
            <h2
              id="weekly-activity-heading"
              className="mb-4 font-semibold text-lg text-gray-800"
            >
              Weekly Activity
            </h2>
            <ActivityChart />
          </div>
        </section>

        <section aria-label="Current goals" className="mt-6">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">Current Goals</h2>
          <div className="flex flex-col space-y-6">
            {goals.map((goal, idx) => {
              const progress = Math.min((goal.current / goal.target) * 100, 100);
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="mb-2 font-semibold text-gray-800">{goal.name}</h3>
                  <div className="flex items-center space-x-4">
                    <Goalsprogress value={progress} className="flex-grow" />
                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                      {goal.current ?? "--"} / {goal.target ?? "--"}{goal.name === "Workout per week" ? " sessions" : " kg"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}