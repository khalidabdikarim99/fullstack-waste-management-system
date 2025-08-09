// src/components/ServiceImageGallery.jsx
import React from "react";

const ServiceImageGallery = ({ images, title, description }) => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">
        {title}
      </h3>
      <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
        {description}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <img 
              src={img} 
              alt={`Gallery image ${index + 1}`}
              className="w-full h-48 object-cover hover:scale-105 transition duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceImageGallery;