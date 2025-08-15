import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} Waste2Wealth User Dashboard
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-sm text-gray-500 hover:text-green-600">Help</a>
          <a href="#" className="text-sm text-gray-500 hover:text-green-600">Privacy</a>
          <a href="#" className="text-sm text-gray-500 hover:text-green-600">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;