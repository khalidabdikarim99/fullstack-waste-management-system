// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Jobs from './pages/Jobs';
import Marketplace from './pages/Marketplace';

import Signup from './pages/Signup';

// Services
import JobCreation from './pages/Services/JobCreation';
import Training from './pages/Services/Training';
import Upcycling from './pages/Services/Upcycling';
import Collection from './pages/Services/Collection';

// Startup
import Brick from './pages/Startup/Brick';
import DIY from './pages/Startup/DIY';

// Trash Academy
import Videos from './pages/TrashAcademy/Videos';
import Quizzes from './pages/TrashAcademy/Quizzes';
import Tutorials from './pages/TrashAcademy/Tutorials';

// Admin
import AdminLayout from './Admin/Layout/Layout';
import AdminDashboard from './Admin/pages/Dashboard';
import ManageUsers from './Admin/pages/ManageUsers';
import PickupRequest from './Admin/pages/PickupRequest';
import DropoffLocations from './Admin/pages/DropoffLocations';
import Marketplaces from './Admin/pages/Marketplaces';
import WasteAnalytics from './Admin/pages/WasteAnalytics';
import ContentManagement from './Admin/pages/ContentManagement';
import RewardSystem from './Admin/pages/RewardSystem';
import Feedback from './Admin/pages/Feedback';
import AdminManagement from './Admin/pages/AdminManagement';
import AdminLogin from './Admin/Layout/AdminLogin';

// User
import UserLayout from './Users/layout/UserLayout';
import UserDashboard from './Users/pages/Dashboard';
import Profile from './Users/pages/Profile';
import PickupRequests from './Users/pages/PickupRequests';
import DropoffPoints from './Users/pages/DropoffPoints';
import UserMarketplace from './Users/pages/Marketplace';
import Contributions from './Users/pages/Contributions';
import Rewards from './Users/pages/Rewards';
import Learning from './Users/pages/Learning';
import Support from './Users/pages/Support';
import UserHistoryRequest from './Users/pages/UserHistoryRequest';
import UserNewRequest from './Users/pages/UserNewRequest';
import UserLogin from './Users/layout/UserLogin';

// Collector
import CollectorLayout from './Collector/layout/CollectorLayout';

import CollectorNotifications from './Collector/pages/Notifications';
import CollectorHistory from './Collector/pages/History';
import CollectorCommunication from './Collector/pages/Communication';
import CollectorEarnings from './Collector/pages/Earnings';
import CollectorProfile from './Collector/pages/Profile';
import CollectorLogin from './Collector/layout/CollectorLogin';

// Recycler
import RecyclerLayout from './Recycler/layout/RecyclerLayout';
import RecyclerDashboard from './Recycler/pages/Shipments';
import RecyclerShipments from './Recycler/pages/Shipments';
import RecyclerProcessing from './Recycler/pages/Processing';
import RecyclerInventory from './Recycler/pages/Inventory';
import RecyclerSales from './Recycler/pages/Sales';
import RecyclerReports from './Recycler/pages/Reports';
import RecyclerCommunication from './Recycler/pages/Communication';
import RecyclerProfile from './Recycler/pages/Profile';
import RecyclerLogin from './Recycler/layout/RecyclerLogin';

// Employer
import EmployerLayout from './Employer/layout/EmployerLayout';
import EmployerDashboard from './Employer/pages/Dashboard';
import EmployerMarketplace from './Employer/pages/Marketplace';
import EmployerBuyMaterials from "./Employer/pages/ BuyMaterials"
import EmployerSellProducts from './Employer/pages/SellProducts';
import EmployerOrders from "./Employer/pages/ Orders"
import EmployerReports from './Employer/pages/Reports';
import EmployerMessages from './Employer/pages/Messages';
import EmployerProfile from './Employer/pages/Profile';
import EmployerLogin from './Employer/layout/EmployerLogin';
import CollectorPickups from './Collector/pages/CollectorPickups';
import Communication from './Collector/pages/Communication';
import Dashboard from './Collector/pages/Dashboard'

// Public layout wrapper
const PublicRouteWrapper = ({ children }) => (
  <>
    <Navbar />
    <div className="min-h-[calc(100vh-140px)] p-4">{children}</div>
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/*"
          element={
            <PublicRouteWrapper>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/marketplace" element={<Marketplace />} />
              
                <Route path="/signup" element={<Signup />} />

                {/* Role-specific login pages */}
                <Route path="/adminlogin" element={<AdminLogin />} />
                <Route path="/userlogin" element={<UserLogin />} />
                <Route path="/collectorlogin" element={<CollectorLogin />} />
                <Route path="/recyclerlogin" element={<RecyclerLogin />} />
                <Route path="/employerlogin" element={<EmployerLogin />} />

                {/* Services */}
                <Route path="/services/jobcreation" element={<JobCreation />} />
                <Route path="/services/training" element={<Training />} />
                <Route path="/services/upcycling" element={<Upcycling />} />
                <Route path="/services/collection" element={<Collection />} />

                {/* Startup */}
                <Route path="/startup/brick" element={<Brick />} />
                <Route path="/startup/diy" element={<DIY />} />

                {/* Trash Academy */}
                <Route path="/trashacademy/videos" element={<Videos />} />
                <Route path="/trashacademy/quizzes" element={<Quizzes />} />
                <Route path="/trashacademy/tutorials" element={<Tutorials />} />
              </Routes>
            </PublicRouteWrapper>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="pickups" element={<PickupRequest />} />
          <Route path="locations" element={<DropoffLocations />} />
          <Route path="marketplace" element={<Marketplaces />} />
          <Route path="analytics" element={<WasteAnalytics />} />
          <Route path="content" element={<ContentManagement />} />
          <Route path="rewards" element={<RewardSystem />} />
          <Route path="support" element={<Feedback />} />
          <Route path="management" element={<AdminManagement />} />
        </Route>

        {/* User Routes */}
        <Route path="/user/*" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="pickups" element={<PickupRequests />} />
          <Route path="locations" element={<DropoffPoints />} />
          <Route path="marketplace" element={<UserMarketplace />} />
          <Route path="contributions" element={<Contributions />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="learning" element={<Learning />} />
          <Route path="support" element={<Support />} />
          <Route path="userhistoryrequest" element={<UserHistoryRequest />} />
          <Route path="usernewrequest" element={<UserNewRequest/>} />
        </Route>

       {/* Collector Routes */}
<Route path="/collector/*" element={<CollectorLayout />}>
 
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="pickups" element={<CollectorPickups />} /> {/* Added Pickup Management */}
 
  <Route path="notifications" element={<CollectorNotifications />} />
  <Route path="history" element={<CollectorHistory />} />
  <Route path="communication" element={<Communication />} />
  <Route path="earnings" element={<CollectorEarnings />} />
  <Route path="profile" element={<CollectorProfile />} />
  <Route path="dropoffpoints" element={<DropoffLocations />} />
  
        </Route>

        {/* Recycler Routes */}
        <Route path="/recycler/*" element={<RecyclerLayout />}>
          <Route index element={<RecyclerDashboard />} />
          <Route path="dashboard" element={<RecyclerDashboard />} />
          <Route path="shipments" element={<RecyclerShipments />} />
          <Route path="processing" element={<RecyclerProcessing />} />
          <Route path="inventory" element={<RecyclerInventory />} />
          <Route path="sales" element={<RecyclerSales />} />
          <Route path="reports" element={<RecyclerReports />} />
          <Route path="communication" element={<RecyclerCommunication />} />
          <Route path="profile" element={<RecyclerProfile />} />
        </Route>

        {/* Employer Routes */}
        {/* Employer Routes */}
<Route path="/employer/*" element={<EmployerLayout />}>
  <Route index element={<EmployerDashboard />} />
  <Route path="dashboard" element={<EmployerDashboard />} />
  <Route path="marketplace" element={<EmployerMarketplace />} />
  <Route path="buy" element={<EmployerBuyMaterials />} />
  <Route path="sell" element={<EmployerSellProducts />} />
  <Route path="orders" element={<EmployerOrders />} />
  <Route path="reports" element={<EmployerReports />} />
  <Route path="messages" element={<EmployerMessages />} />
  <Route path="profile" element={<EmployerProfile />} />  {/* <-- fixed */}


          
        </Route>
      </Routes>
    </Router>
  );
};

export default App;