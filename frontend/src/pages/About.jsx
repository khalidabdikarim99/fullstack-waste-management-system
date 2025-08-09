// src/pages/About.jsx
import React from "react";
import { Link } from "react-router-dom";
import team1 from "../assets/img/trash money1.jpg";
import team2 from "../assets/img/waste2.jpg";
import team3 from "../assets/img/w2.webp";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">
          About <span className="text-green-500">Waste</span>
          <span className="text-red-500">2</span>
          <span className="text-green-500">Wealth</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transforming waste into opportunities, creating value where others see trash
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Our <span className="text-green-500">Mission</span>
            </h2>
            <p className="text-gray-700 mb-4">
              At Waste2Wealth, we're revolutionizing waste management by creating sustainable economic opportunities 
              through innovative upcycling, job creation, and environmental education.
            </p>
            <p className="text-gray-700 mb-6">
              What started as a small community initiative has grown into a movement that transforms both materials 
              and lives across our region.
            </p>
            <Link
              to="/services"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
            >
              Explore Our Services
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src={team1} 
              alt="Community clean-up team" 
              className="rounded-lg shadow-md h-64 w-full object-cover"
            />
            <img 
              src={team2} 
              alt="Waste sorting workshop" 
              className="rounded-lg shadow-md h-64 w-full object-cover mt-8"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
          Our Core <span className="text-green-500">Values</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
            <div className="text-green-500 text-4xl mb-4">♻️</div>
            <h3 className="text-xl font-bold mb-3">Sustainability</h3>
            <p className="text-gray-600">
              We develop solutions that meet present needs without compromising future generations' ability to meet theirs.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
            <div className="text-green-500 text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold mb-3">Community</h3>
            <p className="text-gray-600">
              We believe in empowering local communities through education, job creation, and shared responsibility.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
            <div className="text-green-500 text-4xl mb-4">💡</div>
            <h3 className="text-xl font-bold mb-3">Innovation</h3>
            <p className="text-gray-600">
              We constantly seek creative ways to transform waste streams into valuable resources and products.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            Meet Our <span className="text-green-500">Team</span>
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Passionate individuals driving the waste-to-wealth revolution
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhv0lswdUHtRihlm2kIeDLVBzCFre2Qr4LnA&s"} 
                alt="Founder" 
                className="w-48 h-48 rounded-full object-cover mx-auto mb-4 shadow-md"
              />
              <h3 className="text-xl font-bold">Alex Johnson</h3>
              <p className="text-green-600 mb-2">Founder & CEO</p>
              <p className="text-gray-600">
                Environmental engineer with 10+ years in waste management innovation
              </p>
            </div>
            <div className="text-center">
              <img 
                src={"data:image/jpeg;base64,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"} 
                alt="Operations Lead" 
                className="w-48 h-48 rounded-full object-cover mx-auto mb-4 shadow-md"
              />
              <h3 className="text-xl font-bold">Maria Garcia</h3>
              <p className="text-green-600 mb-2">Operations Lead</p>
              <p className="text-gray-600">
                Community development specialist focused on job creation
              </p>
            </div>
            <div className="text-center">
              <img 
                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxOqwNvBeX_plUzp4SZ4uUO_KO0GUOrNSSuQ&s"} 
                alt="Education Director" 
                className="w-48 h-48 rounded-full object-cover mx-auto mb-4 shadow-md"
              />
              <h3 className="text-xl font-bold">James Chen</h3>
              <p className="text-green-600 mb-2">Education Director</p>
              <p className="text-gray-600">
                Leads our Trash Academy programs and community workshops
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Ready to join the movement?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Whether you want to recycle, volunteer, or partner with us, we'd love to connect.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default About;