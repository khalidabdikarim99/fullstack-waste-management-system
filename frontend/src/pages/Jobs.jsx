// src/pages/Jobs.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const jobOpenings = [
    // ... (keep your existing job openings array)
  ];

  // Image URLs - Replace these with your actual image paths
  const images = {
    hero: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    team1: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    team2: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    operations: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80",
    education: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="relative bg-green-600 text-white py-20" style={{ backgroundImage: `url(${images.hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join the Waste2Wealth Team</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Help us transform waste into valuable resources while building a sustainable future for Garissa
          </p>
          <div className="mt-8">
            <Link 
              to="#openings" 
              className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200 inline-block"
            >
              View Current Openings
            </Link>
          </div>
        </div>
      </div>

      {/* Why Work With Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Work at Waste2Wealth?</h2>
          <div className="w-24 h-1 bg-green-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="text-green-600 mb-4">
              <img 
                src={images.operations} 
                alt="Waste collection operations" 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Purpose-Driven Work</h3>
              <p className="text-gray-600">
                Every role at Waste2Wealth directly contributes to environmental sustainability and community development.
              </p>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <div className="text-green-600 mb-4">
              <img 
                src={images.education} 
                alt="Team training session" 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Growth Opportunities</h3>
              <p className="text-gray-600">
                We invest in our team with training programs and clear career progression paths.
              </p>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <div className="text-green-600 mb-4">
              <img 
                src={images.team1} 
                alt="Waste2Wealth team working together" 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Supportive Community</h3>
              <p className="text-gray-600">
                Join a team that values collaboration, diversity, and making a real difference together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Testimonials */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Hear From Our Team</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src={images.team1} 
                  alt="Adebayo Ogunlesi" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Adebayo Ogunlesi</h4>
                  <p className="text-sm text-gray-500">Waste Collection Specialist, 2 years</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Working at Waste2Wealth has given me pride in my work. I'm not just collecting trash - I'm helping create a cleaner Lagos while supporting my family. The company treats us with respect and provides good benefits."
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src={images.team2} 
                  alt="Chioma Eze" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Chioma Eze</h4>
                  <p className="text-sm text-gray-500">Sustainability Educator, 1 year</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I love teaching communities about recycling and seeing the 'aha' moments when people realize waste has value. The flexible schedule allows me to pursue my master's degree while making an impact."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ... rest of your existing code ... */}
    </div>
  );
};

export default Jobs;