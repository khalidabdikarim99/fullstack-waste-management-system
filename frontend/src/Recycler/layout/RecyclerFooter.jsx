import React from 'react';

const RecyclerFooter = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} Waste2Wealth Recycler Portal
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-sm text-gray-500 hover:text-green-600">Support</a>
          <a href="#" className="text-sm text-gray-500 hover:text-green-600">Certifications</a>
          <a href="#" className="text-sm text-gray-500 hover:text-green-600">Help Center</a>
        </div>
      </div>
    </footer>
  );
};

export default RecyclerFooter;