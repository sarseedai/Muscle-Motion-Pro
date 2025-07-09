import { Calendar, Flame, Trophy, Target, Settings } from "lucide-react";
import profilePic from '../assets/userprofile.jpg';
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const UserProfile = () => {
  const userStats = {
    name: "Sarthak Sedai",
    joinDate: "January 2023",
    totalWorkouts: 47,
    currentStreak: 12,
    longestStreak: 18,
    totalWeightLifted: 125000, 
    achievements: [
      { name: "First Workout", date: "Jan 15, 2023", icon: "🎯" },
      { name: "Week Warrior", date: "Feb 1, 2023", icon: "💪" },
      { name: "Consistency King", date: "Feb 20, 2023", icon: "🔥" },
      { name: "Strength Milestone", date: "Mar 5, 2023", icon: "🏆" },
    ],
  };

  const lbsToKgs = (lbs) => Math.round(lbs / 2.20462);

  const goals = [
    { name: "Bench Press 102 kg", current: 84, target: 102, deadline: "June 2023" },
    { name: "Workout 5x per week", current: 4, target: 5, deadline: "Ongoing" },
    { name: "Reach 77 kg", current: 73, target: 77, deadline: "August 2023" },
  ];

  const personalBests = [
    { exercise: "Bench Press", weight: 84, date: "Mar 10, 2023" },
    { exercise: "Squat", weight: 125, date: "Mar 8, 2023" },
    { exercise: "Deadlift", weight: 143, date: "Mar 5, 2023" },
    { exercise: "Overhead Press", weight: 61, date: "Mar 3, 2023" },
  ];

  return (
    <>
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
              <button className="flex items-center gap-2 text-purple-600 hover:text-purple-800">
                <Settings className="w-5 h-5" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Personal Bests</h3>
              <div className="space-y-4">
                {personalBests.map((record, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-purple-100 rounded-lg p-3"
                  >
                    <div>
                      <h4 className="font-semibold">{record.exercise}</h4>
                      <p className="text-sm text-gray-500">{record.date}</p>
                    </div>
                    <div className="bg-purple-600 text-white rounded-full px-3 py-1 font-semibold">
                      {record.weight} kg
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Current Goals</h3>
              <div className="space-y-6">
                {goals.map((goal, idx) => {
                  const progress = Math.min((goal.current / goal.target) * 100, 100);
                  return (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{goal.name}</h4>
                        <span className="text-sm text-gray-500">{goal.deadline}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>
                          {goal.current} / {goal.target} {goal.name.includes("Workout") ? "sessions" : "kg"}
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
          </div>

          <div>
            <div className="bg-yellow-50 rounded-2xl p-6 shadow-md space-y-4">
              <h3 className="text-xl font-semibold mb-4">Recent Achievements</h3>
              {userStats.achievements.map((achievement, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-yellow-100 rounded-lg p-3"
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <h4 className="font-semibold text-sm">{achievement.name}</h4>
                    <p className="text-xs text-gray-600">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
