import { NavLink } from 'react-router-dom';
import {
  Dumbbell,
  Zap,
  ArrowRight,
  Star,
  Target,
  TrendingUp,
  BarChart3,
  Calendar,
  Trophy
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    { icon: <Dumbbell className="h-8 w-8 text-purple-600" />, title: "Smart Workout Tracking", desc: "Track exercises & progress easily with intuitive design." },
    { icon: <Target className="h-8 w-8 text-purple-600" />, title: "Personalized Goals", desc: "Set and follow custom fitness goals tailored to you." },
    { icon: <TrendingUp className="h-8 w-8 text-purple-600" />, title: "Progress Analytics", desc: "Visual charts to monitor your journey." },
    { icon: <BarChart3 className="h-8 w-8 text-purple-600" />, title: "Performance Metrics", desc: "Detailed stats on lifts & body metrics." },
    { icon: <Calendar className="h-8 w-8 text-purple-600" />, title: "Workout Scheduling", desc: "Plan routines around your life." },
    { icon: <Trophy className="h-8 w-8 text-purple-600" />, title: "Achievements", desc: "Earn badges and celebrate milestones." }
  ];

  const testimonials = [
    { name: "Sarah Johnson", role: "Fitness Enthusiast", content: "Muscle Motion Pro transformed my routine! Love the simple interface.", rating: 5 },
    { name: "Mike Chen", role: "Personal Trainer", content: "Great for tracking client progress without the clutter.", rating: 5 },
    { name: "Emma Davis", role: "Beginner", content: "Super beginner-friendly! The goals and charts keep me motivated.", rating: 5 }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">

      {/* Header */}
      <header className="border-b bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-8 w-8 text-purple-600" />
            <span className="font-bold text-2xl text-purple-600">Muscle Motion Pro</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-lg font-medium">
            <a
              href="#features"
              className="px-3 py-2 rounded hover:text-purple-600 transition"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="px-3 py-2 rounded hover:text-purple-600 transition"
            >
              Reviews
            </a>
            <NavLink
              to="/login"
              className="px-5 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-600 hover:text-white transition h-10 flex items-center"
            >
              Sign In
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 text-center bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 text-purple-600 mb-4">
            <Zap className="h-5 w-5" />
            <span className="font-medium">Your Ultimate Fitness Companion</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Track. Improve. Achieve.</h1>
          <p className="text-gray-600 mb-8">All your workout tracking, goals, and analytics — free & beautifully simple.</p>
          <div className="flex justify-center gap-4">
            <NavLink to="/signup" className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 flex items-center gap-2">
              Get Started <ArrowRight className="h-5 w-5" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-6 text-center hover:shadow-md transition min-h-[250px] flex flex-col justify-center">
                <div className="flex justify-center mb-4">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl shadow p-6 hover:shadow-md transition min-h-[250px] flex flex-col justify-between">
                <div>
                  <div className="flex gap-3 items-center mb-3">
                    <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">{t.name[0]}</div>
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="text-gray-700 text-sm italic">"{t.content}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-100 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-purple-600" />
            <span className="font-semibold text-purple-600">Muscle Motion Pro</span>
          </div>
          <p className="text-gray-500 text-sm">© 2024 Muscle Motion Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}