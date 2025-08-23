import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, ShieldCheck, NotebookPen } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Track. Save. Grow.
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-blue-100">
            Take control of your money with our smart expense tracker — designed
            to help you manage, visualize, and grow your finances.
          </p>
          <Link
            to="/login"
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-xl shadow-lg transition transform hover:scale-105 inline-block"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-800">
          Why Choose <span className="text-blue-600">Our Tracker?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="flex justify-center items-center w-16 h-16 mx-auto rounded-full bg-blue-100 text-blue-600 mb-6">
              <NotebookPen size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">
              Easy Tracking
            </h3>
            <p className="text-gray-600 text-center">
              Record expenses in just a few taps — quick, simple, and efficient.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="flex justify-center items-center w-16 h-16 mx-auto rounded-full bg-indigo-100 text-indigo-600 mb-6">
              <BarChart3 size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">
              Visual Reports
            </h3>
            <p className="text-gray-600 text-center">
              See where your money goes with clean, intuitive charts & insights.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="flex justify-center items-center w-16 h-16 mx-auto rounded-full bg-green-100 text-green-600 mb-6">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">
              Secure Access
            </h3>
            <p className="text-gray-600 text-center">
              Your financial data is protected with enterprise-grade security.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
