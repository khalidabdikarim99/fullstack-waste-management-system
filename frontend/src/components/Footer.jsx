// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, LinkedIn, Email, Phone, LocationOn } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold flex items-center space-x-1">
              <span className="text-green-500">Waste</span>
              <span className="text-red-500">2</span>
              <span className="text-green-500">Wealth</span>
            </Link>
            <p className="text-gray-400">
              Transforming waste into valuable resources through innovation, education, and community empowerment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition">
                <Facebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition">
                <Twitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition">
                <Instagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition">
                <LinkedIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-green-400 transition">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-green-400 transition">About Us</Link></li>
              <li><Link to="/services/jobcreation" className="text-gray-400 hover:text-green-400 transition">Services</Link></li>
              <li><Link to="/jobs" className="text-gray-400 hover:text-green-400 transition">Job Opportunities</Link></li>
              <li><Link to="/marketplace" className="text-gray-400 hover:text-green-400 transition">Marketplace</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-green-400 transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Our Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services/jobcreation" className="text-gray-400 hover:text-green-400 transition">Job Creation</Link></li>
              <li><Link to="/services/training" className="text-gray-400 hover:text-green-400 transition">Training Programs</Link></li>
              <li><Link to="/services/upcycling" className="text-gray-400 hover:text-green-400 transition">Upcycling Solutions</Link></li>
              <li><Link to="/services/collection" className="text-gray-400 hover:text-green-400 transition">Waste Collection</Link></li>
              <li><Link to="/startup/brick" className="text-gray-400 hover:text-green-400 transition">Brick Startup</Link></li>
              <li><Link to="/startup/diy" className="text-gray-400 hover:text-green-400 transition">DIY Projects</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <LocationOn className="text-green-500 mr-2 mt-1" />
                <span className="text-gray-400">123 Green Street, Eco City, EC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-green-500 mr-2" />
                <span className="text-gray-400">+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center">
                <Email className="text-green-500 mr-2" />
                <span className="text-gray-400">info@waste2wealth.org</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-md font-semibold mb-2 text-green-400">Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                />
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-r-lg transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Waste2Wealth. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="/privacy" className="hover:text-green-400 transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-green-400 transition">Terms of Service</Link>
            <Link to="/faq" className="hover:text-green-400 transition">FAQs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;