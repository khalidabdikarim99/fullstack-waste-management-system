// src/pages/services/Collections.jsx
import React from "react";
import { Link } from "react-router-dom";
import ServiceImageGallery from "../../components/ServiceImageGallery";

// Import images
import img1 from "../../assets/img/waste1.jpg";
import img2 from "../../assets/img/waste2.jpg";
import img3 from "../../assets/img/waste3.jpg";
import img4 from "../../assets/img/waste4.jpg";
import img5 from "../../assets/img/waste5.jpg";
import img6 from "../../assets/img/waste6.jpg";
import img7 from "../../assets/img/waste7.jpg";
import img8 from "../../assets/img/waste8.jpg";

const Collections = () => {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Waste <span className="text-green-500">Collection</span> Services
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Efficient, eco-friendly waste collection systems that power our circular economy
        </p>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <img 
            src={img1} 
            alt="Collection team at work" 
            className="rounded-xl shadow-lg w-full h-auto"
          />
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Smart <span className="text-green-500">Collection</span> Networks
            </h2>
            <p className="text-gray-700 mb-4">
              Our waste collection services are designed for maximum efficiency and environmental benefit.
              We serve households, businesses, and institutions with tailored solutions for different waste streams.
            </p>
            <div className="space-y-4 mb-6">
              {[
                "Door-to-door collection in urban areas",
                "Community drop-off centers",
                "Special collection events",
                "Business waste audits",
                "Hazardous waste handling",
                "Construction waste recovery"
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <Link
              to="/contact"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
            >
              Schedule Collection
            </Link>
          </div>
        </div>

        <ServiceImageGallery 
          images={images} 
          title="Our Collection Operations"
          description="See our teams in action across different communities"
        />

        {/* Service Areas */}
        <div className="mt-16 bg-green-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">
            Service <span className="text-green-500">Options</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Residential",
                price: "$15/month",
                features: ["Weekly pickup", "2 waste streams", "Recycling included"]
              },
              {
                title: "Commercial",
                price: "Custom",
                features: ["Daily service", "Multiple streams", "Waste audit"]
              },
              {
                title: "Special",
                price: "Varies",
                features: ["Construction waste", "E-waste", "Hazardous materials"]
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-xl font-bold mb-2 text-green-600">{service.title}</h4>
                <p className="text-gray-900 font-bold mb-4">{service.price}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collections;