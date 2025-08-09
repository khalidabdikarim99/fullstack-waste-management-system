// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { GlowingCards, GlowingCard } from "../components/GlowingCards";

// Import your images
import img1 from "../assets/img/home12.avif";
import img2 from "../assets/img/waste2.jpg";
import img3 from "../assets/img/waste3.jpg";
import img4 from "../assets/img/waste4.jpg";
import img5 from "../assets/img/waste5.jpg";
import img6 from "../assets/img/waste6.jpg";
import img7 from "../assets/img/waste7.jpg";
import img8 from "../assets/img/waste8.jpg";
import img9 from "../assets/img/waste9.jpg";
import img10 from "../assets/img/waste10.jpg";
import img11 from "../assets/img/w3.avif";
import img12 from "../assets/img/w2.webp";

const Home = () => {
  const faqs = [
    {
      question: "Can I really make money from trash?",
      answer:
        "Yes, even in Garissa County, you can earn income by collecting and sorting plastics, metals, and old electronics. Local youth and women groups are already profiting through community-based recycling programs.",
    },
    {
      question: "How does this help the environment?",
      answer:
        "Proper waste management in Garissa reduces pollution, keeps our towns cleaner, and helps prevent water contamination, especially during the rainy season.",
    },
    {
      question: "What materials are most valuable?",
      answer:
        "In Garissa, the most valuable recyclables are plastic bottles, scrap metal, aluminum cans, and used mobile phone parts, which are in demand by regional buyers.",
    },
    {
      question: "Is there a minimum amount I can sell?",
      answer:
        "No, there's no minimum. Whether you bring 1kg or 20kg, it adds value. Small contributions from households or schools are always welcome and aggregated for larger sales.",
    },
  ];

  const ringImages = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
  ];

  const StaticImageRing = ({ images, radius = 200 }) => {
    return (
      <div
        className="relative w-full h-full"
        style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
      >
        {images.map((image, index) => {
          const angle = (index * 2 * Math.PI) / images.length;
          const x = radius + radius * Math.cos(angle) - 50;
          const y = radius + radius * Math.sin(angle) - 50;

          return (
            <div
              key={index}
              className="absolute transition-all duration-300 hover:scale-110"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                width: "100px",
                height: "100px",
              }}
            >
              <img
                src={image}
                alt={`Transformation ${index + 1}`}
                className="w-full h-full object-cover rounded-lg border-2 border-green-100 hover:border-green-500"
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl font-bold">
            <span className="text-green-500">Waste</span>
            <span className="text-red-500">2</span>
            <span className="text-green-500">Wealth</span>
          </h1>
          <p className="text-gray-700 text-lg">
            Transform your trash into treasure with our innovative recycling
            platform that benefits both your wallet and the planet.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/about"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
            >
              Learn More
            </Link>
            <Link
              to="/signup"
              className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-3 px-6 rounded-full transition duration-300"
            >
              Join Now
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-600 font-bold text-2xl">100+</p>
              <p className="text-gray-600">Community Projects</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-600 font-bold text-2xl">1K+</p>
              <p className="text-gray-600">Lives Impacted</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            src={img1}
            alt="Waste transformation"
            className="w-full h-auto rounded-xl shadow-lg object-cover"
          />
        </div>
      </section>

      {/* Static Image Ring Section */}
      <section className="bg-green-50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            Our <span className="text-green-500">Transformation</span> Journey
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            See how ordinary waste becomes valuable resources through our
            process
          </p>
          <div className="flex justify-center">
            <StaticImageRing images={ringImages} radius={180} />
          </div>
        </div>
      </section>

      {/* FAQ Section with Beautiful Glowing Cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Your <span className="text-green-500">Questions</span> Answered
        </h2>
        <GlowingCards>
          {faqs.map((faq, index) => (
            <GlowingCard key={index}>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-green-600">
                  {faq.question}
                </h3>
                <p className="text-slate-800">{faq.answer}</p>
              </div>
            </GlowingCard>
          ))}
        </GlowingCards>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-green-600 text-5xl font-bold mb-2">7+</p>
              <p className="text-gray-700 text-lg">
                Oil barrels saved per ton recycled
              </p>
            </div>
            <div className="text-center">
              <p className="text-green-600 text-5xl font-bold mb-2">85%</p>
              <p className="text-gray-700 text-lg">
                Reduction in community landfill waste
              </p>
            </div>
            <div className="text-center">
              <p className="text-green-600 text-5xl font-bold mb-2">2.5x</p>
              <p className="text-gray-700 text-lg">
                Average earnings for participants
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Ready to transform your trash?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Join thousands already turning their waste into wealth while
          protecting our planet.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 hover:scale-105"
        >
          Get Started Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
