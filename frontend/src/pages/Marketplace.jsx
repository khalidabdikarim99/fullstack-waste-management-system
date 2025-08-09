// src/pages/Marketplace.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Marketplace = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Sample product data - replace with your actual products
  const products = [
    {
      id: 1,
      name: "Recycled Plastic Lumber",
      category: "building",
      price: "₦8,500",
      description: "Durable construction material made from 100% recycled plastics",
      image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 2,
      name: "Upcycled Glassware Set",
      category: "home",
      price: "₦12,000",
      description: "Elegant drinkware set made from recycled glass bottles",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
    },
    {
      id: 3,
      name: "Organic Compost Fertilizer",
      category: "gardening",
      price: "₦3,500",
      description: "Nutrient-rich compost made from food waste (5kg bag)",
      image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 4,
      name: "Recycled Paper Notebook",
      category: "office",
      price: "₦2,200",
      description: "Eco-friendly notebook made from 100% recycled paper",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1498&q=80"
    },
    {
      id: 5,
      name: "Upcycled Tire Ottoman",
      category: "furniture",
      price: "₦25,000",
      description: "Stylish furniture piece made from recycled tires",
      image: "https://images.unsplash.com/photo-1618221469555-7f3ad97540d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1629&q=80"
    },
    {
      id: 6,
      name: "Recycled PET Fiber Tote Bag",
      category: "fashion",
      price: "₦4,800",
      description: "Sturdy shopping bag made from recycled plastic bottles",
      image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'building', name: 'Building Materials' },
    { id: 'home', name: 'Home Goods' },
    { id: 'gardening', name: 'Gardening' },
    { id: 'office', name: 'Office Supplies' },
    { id: 'furniture', name: 'Furniture' },
    { id: 'fashion', name: 'Fashion' }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-green-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Waste2Wealth Marketplace</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover high-quality products made from recycled and upcycled materials
          </p>
        </div>
      </div>

      {/* Marketplace Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                  <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                    {product.price}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <button className="text-green-600 hover:text-green-800 font-medium text-sm">
                    View Details
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-gray-500">We don't have any products in this category yet.</p>
            <button 
              onClick={() => setActiveCategory('all')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              View All Products
            </button>
          </div>
        )}
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How Our Marketplace Works</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1575408264798-b50b252663e6?ixlib=rb-4" 
                  alt="Collecting recyclable materials" 
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">1. Collect Materials</h3>
              <p className="text-gray-600">
                We collect recyclable waste from homes and businesses across Nigeria
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1481761289552-381112059e05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1661&q=80" 
                  alt="Transforming waste into products" 
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">2. Transform Waste</h3>
              <p className="text-gray-600">
                Our skilled artisans and manufacturers create beautiful, functional products
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80" 
                  alt="Happy customer with sustainable products" 
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">3. Shop Sustainably</h3>
              <p className="text-gray-600">
                You purchase quality products while supporting circular economy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Sell Your Upcycled Products?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our marketplace and reach customers who value sustainable products
          </p>
          <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200">
            Become a Seller
          </button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;