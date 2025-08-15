import React from 'react';
import { Outlet } from 'react-router-dom';
import CollectorSidebar from './CollectorSidebar';
import CollectorHeader from './CollectorHeader';
import CollectorFooter from './CollectorFooter';

const CollectorLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <CollectorSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <CollectorHeader />
        
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
        
        <CollectorFooter />
      </div>
    </div>
  );
};

export default CollectorLayout;