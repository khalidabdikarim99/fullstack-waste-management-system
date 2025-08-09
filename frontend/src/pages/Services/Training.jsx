import React from "react";
import { Link } from "react-router-dom";

// Import images
import img1 from "../../assets/img/waste1.jpg";
import img2 from "../../assets/img/waste2.jpg";
import img3 from "../../assets/img/waste3.jpg";
import img4 from "../../assets/img/waste4.jpg";
import img5 from "../../assets/img/waste8.jpg";
import img6 from "../../assets/img/waste5.jpg";
import img7 from "../../assets/img/waste6.jpg";
import img8 from "../../assets/img/waste7.jpg";

const Training = () => {
  const trainingPrograms = [
    {
      title: "Basic Waste Certification",
      duration: "4 Weeks Intensive",
      description: "Master the fundamentals of waste sorting, safety protocols, and basic processing techniques.",
      image: img1,
      link: "/trashacademy/basic"
    },
    {
      title: "Advanced Upcycling",
      duration: "8 Weeks Hands-on",
      description: "Transform waste materials into valuable products with professional upcycling techniques.",
      image: img2,
      link: "/trashacademy/upcycling"
    },
    {
      title: "Circular Economy Business",
      duration: "6 Weeks Program",
      description: "Learn to build sustainable businesses around waste transformation and recycling.",
      image: img3,
      link: "/trashacademy/business"
    },
    {
      title: "Equipment Specialist",
      duration: "5 Weeks Technical",
      description: "Become certified in operating waste processing machinery and maintenance.",
      image: img4,
      link: "/trashacademy/equipment"
    }
  ];

  const successStories = [
    {
      image: img5,
      quote: "The training gave me skills to start my own upcycling workshop",
      name: "Maria Gomez",
      title: "Founder, Green Craft Studio"
    },
    {
      image: img6,
      quote: "Now I earn 3x more as a certified waste technician",
      name: "James Thompson",
      title: "Waste Tech Specialist"
    },
    {
      image: img7,
      quote: "Changed my career completely at age 45",
      name: "Susan Kim",
      title: "Sustainability Advocate"
    },
    {
      image: img8,
      quote: "Best investment I've made in myself",
      name: "David Parker",
      title: "Recycling Consultant"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-green-500">Vocational</span> Training
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hands-on education creating skilled professionals for the circular economy
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainingPrograms.map((program, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
              <div className="h-48 overflow-hidden">
                <img 
                  src={program.image} 
                  alt={program.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{program.title}</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {program.duration}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <Link
                  to={program.link}
                  className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">
            What Our Graduates Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-green-500"
                  />
                  <div>
                    <h4 className="text-md font-semibold text-gray-800">{story.name}</h4>
                    <p className="text-sm text-gray-500">{story.title}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic text-sm">“{story.quote}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
            <p className="text-lg mb-6">
              Join our next training cohort and become part of the waste-to-wealth revolution
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/trashacademy"
                className="bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition duration-300"
              >
                View All Programs
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-green-700 font-bold py-3 px-8 rounded-full transition duration-300"
              >
                Speak to Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Training;
