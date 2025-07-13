import { useState, useEffect } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import ProgressChart from "../components/ProgressChart";
import ActivityChart from "../components/ActivityChart";
import Goalsprogress from "../components/Goalsprogress";

const lbsToKgs = (lbs) => (lbs / 2.20462).toFixed(1);

export default function Dashboard() {
  const [summaryStats, setSummaryStats] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    // Mock API call to fetch dashboard data
    const fetchDashboardData = async () => {
      const data = {
        summaryStats: [
          { title: "This Week", value: 5, color: "bg-purple-600" },
          { title: "Total Weight", value: `${lbsToKgs(12450)} kgs`, color: "bg-blue-600" },
          { title: "Goals Hit", value: "3/5", color: "bg-green-600" },
          { title: "Calories Burned", value: 2840, color: "bg-orange-600" },
        ],
        goals: [
          { name: "Bench Press Goal", current: 80, target: 100, unit: "kg" },
          { name: "Weekly Workouts", current: 3, target: 5, unit: "sessions" },
          { name: "Body Weight", current: 74, target: 72, unit: "kg" },
        ],
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

        <section className="grid md:grid-cols-2 gap-6" aria-label="Charts">
          <div
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
          </div>
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
                      {goal.current} / {goal.target} {goal.unit}
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