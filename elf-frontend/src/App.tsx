import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Home from './pages/Home';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import AdminVerifications from './pages/AdminVerifications';
import AdminPayments from './pages/AdminPayments';
import SubscriptionGuard from './components/SubscriptionGuard';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterSchool from './pages/RegisterSchool'; // Added
import RegistrationPending from './pages/RegistrationPending'; // Added
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import ExamPage from './pages/ExamPage';
import ResultsPage from './pages/ResultsPage';
import Donate from './pages/Donate';
import Subscribe from './pages/Subscribe';
import UserList from './pages/UserList';
import PaymentSuccess from './pages/PaymentSuccess';
import ForgotPassword from './pages/ForgotPassword';
import PrivacyPolicy from './pages/PrivacyPolicy'; // You'll need to create this
import TermsOfService from './pages/TermsOfService';
import AboutUs from './pages/About';
import WhatWeOffer from './pages/WhatWeOffer';
import "./App.css";
import ProtectedRoute from './components/ProtectedRoute';


const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// 1. Refined Protected Route for Admin only
const AdminRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // Assume you store role on login
  
  if (!token) return <Navigate to="/login" replace />;
  if (role !== 'ADMIN') return <Navigate to="/dashboard" replace />; // Redirect non-admins
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* This fixes the footer navigation issue */}
      
      <div className="min-h-screen flex flex-col bg-gray-50 font-inter text-left">
        <Navbar />

        <main className="flex-grow pt-[70px] w-full">
          <Routes>
            {/* --- Public Access --- */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/offerings" element={<WhatWeOffer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-school" element={<RegisterSchool />} /> 
            <Route path="/registration-pending" element={<RegistrationPending />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />


            {/* --- Protected Routes (Login Required) --- */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
            <Route path="/donate" element={<ProtectedRoute><Donate /></ProtectedRoute>} />
            <Route path="/user" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
            <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
            <Route path="/subscribe" element={<ProtectedRoute><Subscribe /></ProtectedRoute>} />



            {/* --- Paid Content (Subscription Required) --- */}
            <Route 
              path="/exam/:examId" 
              element={
                <ProtectedRoute>
                  <SubscriptionGuard>
                    <ExamPage />
                  </SubscriptionGuard>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/results" 
              element={
                <ProtectedRoute>
                  <SubscriptionGuard>
                    <ResultsPage />
                  </SubscriptionGuard>
                </ProtectedRoute>
              } 
            />

            {/* --- Admin Module --- */}
            <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
              <Route path="/admin/verifications" element={<AdminVerifications />} />
              <Route path="/admin/payments" element={<AdminPayments />} />
            </Route>

            {/* --- Catch-all 404 --- */}
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center py-32">
                <h2 className="text-6xl font-black text-elf-charcoal">404</h2>
                <p className="text-gray-500 mt-4 font-medium">This page doesn't exist on the ELF Platform.</p>
                <button 
                  onClick={() => window.history.back()}
                  className="mt-8 px-8 py-3 bg-elf-teal text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  ← Go Back
                </button>
              </div>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;