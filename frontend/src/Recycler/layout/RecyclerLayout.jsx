import React from 'react';
import { Outlet } from 'react-router-dom';
import RecyclerSidebar from './RecyclerSidebar';
import RecyclerHeader from './RecyclerHeader';
import RecyclerFooter from './RecyclerFooter';

const RecyclerLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <RecyclerSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <RecyclerHeader />
        
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
        
        <RecyclerFooter />
      </div>
    </div>
  );
};

export default RecyclerLayout;