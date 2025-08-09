// src/pages/services/Upcycling.jsx
import React from "react";
import { Link } from "react-router-dom";
import ServiceImageGallery from "../../components/ServiceImageGallery";

// Waste Images
import img1 from "../../assets/img/waste1.jpg";
import img2 from "../../assets/img/waste2.jpg";
import img3 from "../../assets/img/waste3.jpg";
import img4 from "../../assets/img/waste4.jpg";
import img5 from "../../assets/img/waste5.jpg";
import img6 from "../../assets/img/waste6.jpg";
import img7 from "../../assets/img/waste7.jpg";
import img8 from "../../assets/img/waste8.jpg";

// Furniture Images
import f1 from "../../assets/img/upcycling/furn1.avif";
import f2 from "../../assets/img/upcycling/furn2.avif";
import f3 from "../../assets/img/upcycling/furn3.avif";
import f4 from "../../assets/img/upcycling/furn4.avif";

// Decor Images
import d1 from "../../assets/img/upcycling/decor1.avif";
import d2 from "../../assets/img/upcycling/decor2.webp";
import d3 from "../../assets/img/upcycling/decor3.avif";
import d4 from "../../assets/img/upcycling/decor4.avif";

// Fashion Images
import fa1 from "../../assets/img/upcycling/fashion1.avif";
import fa2 from "../../assets/img/upcycling/fashion2.avif";
import fa3 from "../../assets/img/upcycling/fashion3.avif";
import fa4 from "../../assets/img/upcycling/fashion4.avif";

// Art Images
import a1 from "../../assets/img/upcycling/art1.avif";
import a2 from "../../assets/img/upcycling/art2.avif";
import a3 from "../../assets/img/upcycling/art2.avif";
import a4 from "../../assets/img/upcycling/art4.avif";

// ImageSection as cards (no title)
const ImageSection = ({ images, descriptions }) => (
  <div className="mb-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
      {images.map((img, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
        >
          <img
            src={img}
            alt={`Image ${index + 1}`}
            className="w-full h-40 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <p className="text-sm text-gray-700 text-center">{descriptions[index]}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Upcycling = () => {
  const wasteImages = [img1, img2, img3, img4, img5, img6, img7, img8];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Creative <span className="text-green-500">Upcycling</span> Solutions
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transforming waste materials into high-value products through innovation and craftsmanship
        </p>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              From <span className="text-green-500">Waste</span> to <span className="text-green-500">Wonder</span>
            </h2>
            <p className="text-gray-700 mb-4">
              Our upcycling program combines traditional craftsmanship with modern design to create beautiful,
              functional products from materials that would otherwise be discarded. Each piece tells a story
              of transformation and sustainability.
            </p>
            <div className="mb-6">
              <h4 className="font-bold text-gray-900 mb-2">Materials We Transform:</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Plastics",
                  "Textiles",
                  "Glass",
                  "Metals",
                  "Wood",
                  "Electronics",
                  "Tires",
                  "Construction Waste",
                ].map((material, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to="/marketplace"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
            >
              Visit Our Marketplace
            </Link>
          </div>
          <img
            src={img1}
            alt="Upcycled products"
            className="rounded-xl shadow-lg w-full h-auto"
          />
        </div>

        {/* Waste Image Gallery */}
        <ServiceImageGallery
          images={wasteImages}
          title="Our Upcycled Creations"
          description="See examples of waste materials transformed into beautiful products"
        />

        {/* Product Categories */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-center text-white bg-green-600 py-2 rounded">
            Product Categories
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {["Furniture", "Home Decor", "Fashion", "Art"].map((category, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-green-100 text-center"
              >
                <h4 className="text-lg font-bold mb-1 text-green-800">{category}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Product Image Sections (cards only, no titles) */}
        <div className="mt-20 space-y-20">
          <ImageSection
            images={[f1, f2, f3, f4]}
            descriptions={[
              "Eco-friendly coffee table made from reclaimed wood",
              "Upcycled bench crafted from old doors",
              "Rustic bookshelf made from pallet wood",
              "Vintage chair refurbished with textile scraps",
            ]}
          />
          <ImageSection
            images={[d1, d2, d3, d4]}
            descriptions={[
              "Decorative vase made from wine bottles",
              "Wall art crafted using recycled fabrics",
              "Lampshade created from metal scraps",
              "Hanging decor made from broken ceramics",
            ]}
          />
          <ImageSection
            images={[fa1, fa2, fa3, fa4]}
            descriptions={[
              "Stylish bag made from old denim jeans",
              "Upcycled jacket with patchwork designs",
              "Trendy shoes crafted from tire rubber",
              "Colorful accessories from fabric leftovers",
            ]}
          />
          <ImageSection
            images={[a1, a2, a3, a4]}
            descriptions={[
              "Sculpture made from broken electronic parts",
              "Canvas art using natural dyes on textile",
              "Collage from magazine clippings and wrappers",
              "Abstract painting on recycled wood panels",
            ]}
          />
        </div>
      </section>
    </div>
  );
};

export default Upcycling;
