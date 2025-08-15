import React from 'react';
import { Outlet } from 'react-router-dom';
import EmployerSidebar from './EmployerSidebar';
import EmployerHeader from './EmployerHeader';
import EmployerFooter from './EmployerFooter';

const EmployerLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <EmployerSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <EmployerHeader />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
        <EmployerFooter />
      </div>
    </div>
  );
};

export default EmployerLayout;