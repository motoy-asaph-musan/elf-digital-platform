import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

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
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import ExamPage from './pages/ExamPage';
import ResultsPage from './pages/ResultsPage';
import Donate from './pages/Donate';
import Subscribe from './pages/Subscribe';
import UsersList from './pages/UsersList';
import PaymentSuccess from './pages/PaymentSuccess';
import ForgotPassword from './pages/ForgotPassword';

// CSS - IMPORTANT: This file must contain @tailwind directives (see instructions below)
import "./App.css";

// Protected Route Logic
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      {/* min-h-screen: Ensures the app is at least the full height of the viewport.
        flex flex-col: Allows the <main> to grow and push the footer down.
        text-left: Overrides any global center-alignment from old CSS.
      */}
      <div className="min-h-screen flex flex-col bg-gray-50 font-inter text-left">
        
        {/* Navbar is fixed (handled in Navbar.tsx), so it doesn't take up space here */}
        <Navbar />

        {/* pt-[70px]: Adds padding-top exactly equal to the navbar height.
          flex-grow: Expands to fill available vertical space.
        */}
        <main className="flex-grow pt-[70px] w-full">
          <Routes>
            {/* --- Public Access --- */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* --- Protected Routes (Login Required) --- */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
            <Route path="/donate" element={<ProtectedRoute><Donate /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
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
            <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
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