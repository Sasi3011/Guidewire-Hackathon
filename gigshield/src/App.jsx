import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SignupStep1 from './pages/SignupStep1';
import SignupStep2 from './pages/SignupStep2';
import SignupStep3 from './pages/SignupStep3';
import SignupKYC from './pages/SignupKYC';
import SignupProcessing from './pages/SignupProcessing';
import SignupPlans from './pages/SignupPlans';
import SignupPayment from './pages/SignupPayment';
import SignupFinalSuccess from './pages/SignupFinalSuccess';
import SignupSuccess from './pages/SignupSuccess';
import Coverage from './pages/Coverage';
import RiskAnalysis from './pages/RiskAnalysis';
import DisruptionMap from './pages/DisruptionMap';
import ClaimNotification from './pages/ClaimNotification';
import ClaimDetails from './pages/ClaimDetails';
import EarningsForecast from './pages/EarningsForecast';
import LiveClaimMonitoring from './pages/LiveClaimMonitoring';
import FraudCheckStatus from './pages/FraudCheckStatus';
import PaymentHistory from './pages/PaymentHistory';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#020617] archivo font-archivo tracking-tight overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup-step1" element={<SignupStep1 />} />
          <Route path="/signup-success" element={<SignupSuccess />} />
          <Route path="/signup-step2" element={<SignupStep2 />} />
          <Route path="/signup-step3" element={<SignupStep3 />} />
          <Route path="/signup-kyc" element={<SignupKYC />} />
          <Route path="/signup-processing" element={<SignupProcessing />} />
          <Route path="/signup-plans" element={<SignupPlans />} />
          <Route path="/signup-payment" element={<SignupPayment />} />
          <Route path="/signup-final-success" element={<SignupFinalSuccess />} />
          <Route path="/coverage" element={<Coverage />} />
          <Route path="/risk-analysis" element={<RiskAnalysis />} />
          <Route path="/disruption-map" element={<DisruptionMap />} />
          <Route path="/claim-payout" element={<ClaimNotification />} />
          <Route path="/claim-details" element={<ClaimDetails />} />
          <Route path="/forecast" element={<EarningsForecast />} />
          <Route path="/monitoring" element={<LiveClaimMonitoring />} />
          <Route path="/fraud-status" element={<FraudCheckStatus />} />
          <Route path="/payments" element={<PaymentHistory />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
