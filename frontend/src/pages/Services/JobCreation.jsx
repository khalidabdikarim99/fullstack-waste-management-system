// src/pages/services/JobCreation.jsx
import React from "react";
import { Link } from "react-router-dom";
import ServiceImageGallery from "../../components/ServiceImageGallery";

// Import images
import waste1 from "../../assets/img/job collection/job1.webp";
import waste2 from "../../assets/img/job collection/job2.webp";
import waste3 from "../../assets/img/job collection/job3.webp";
import waste4 from "../../assets/img/job collection/job4.avif";
import waste5 from "../../assets/img/job collection/job5.avif";
import waste6 from "../../assets/img/job collection/job6.avif";
import waste7 from "../../assets/img/job collection/job7.avif";
import waste8 from "../../assets/img/job collection/job8.avif";

const JobCreation = () => {
  const images = [waste1, waste2, waste3, waste4, waste5, waste6, waste7, waste8];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="text-green-500">Job</span> Creation Program
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Empowering communities through sustainable employment opportunities in waste management
        </p>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Creating <span className="text-green-500">Opportunities</span>
            </h2>
            <p className="text-gray-700 mb-4">
              Our job creation program transforms waste management into meaningful employment for underserved communities.
              We've created over 500 jobs in collection, sorting, processing, and upcycling operations.
            </p>
            <ul className="list-disc pl-5 text-gray-700 mb-6 space-y-2">
              <li>Living wage positions with benefits</li>
              <li>Skills training and certification</li>
              <li>Career advancement pathways</li>
              <li>Community ownership models</li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/jobs"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
              >
                View Current Openings
              </Link>
              <a 
                href="#apply-now" 
                className="inline-block border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-3 px-6 rounded-full transition duration-300"
              >
                Apply Now
              </a>
            </div>
          </div>
          <img 
            src={waste1} 
            alt="Waste transformation process" 
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
        </div>

        {/* Image Gallery */}
        <ServiceImageGallery 
          images={images} 
          title="Our Job Creation in Action"
          description="See how we're transforming lives through sustainable employment"
        />

        {/* Stats Section */}
        <section className="bg-green-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Program <span className="text-green-500">Impact</span>
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { value: "500+", label: "Jobs Created" },
                { value: "85%", label: "Retention Rate" },
                { value: "$1.2M", label: "Annual Wages" },
                { value: "12", label: "Communities Served" }
              ].map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <p className="text-green-600 font-bold text-4xl mb-2">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Section */}
        <section id="apply-now" className="mt-20 bg-white border border-green-100 rounded-xl shadow-md p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
            Apply for <span className="text-green-500">Opportunities</span>
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Fill out the form below to join our team and be part of the waste-to-wealth revolution
          </p>
          
          <form className="max-w-2xl mx-auto space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first-name" className="block text-gray-700 font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-gray-700 font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="position" className="block text-gray-700 font-medium mb-2">
                Position of Interest
              </label>
              <select
                id="position"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select a position</option>
                <option value="collection">Waste Collection Specialist</option>
                <option value="sorting">Sorting Facility Operator</option>
                <option value="upcycling">Upcycling Artisan</option>
                <option value="training">Training Coordinator</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="experience" className="block text-gray-700 font-medium mb-2">
                Relevant Experience
              </label>
              <textarea
                id="experience"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Describe any relevant experience or skills..."
              ></textarea>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agree-terms"
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                required
              />
              <label htmlFor="agree-terms" className="ml-2 text-gray-700">
                I agree to the terms and conditions
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300"
            >
              Submit Application
            </button>
          </form>
        </section>
      </section>
    </div>
  );
};

export default JobCreation;
