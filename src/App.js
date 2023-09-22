import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from "./components/common/Sidebar";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import PartnersList from "./components/Partners/PartnersList";
import PartnerDetails from "./components/Partners/PartnerDetails";
import PartnerForm from "./components/Partners/PartnerForm";

import AccountsList from "./components/Accounts/AccountsList"; // Import other components
import InvoicesList from './components/Invoices/InvoicesList';
import MobilePaymentsList from './components/MobilePayments/MobilePaymentsList';
import ContractsList from './components/Contracts/ContractsList';
import DriversList from './components/Drivers/DriversList';
import VehiclesList from './components/Vehicles/VehiclesList';
import VehicleForm from './components/Vehicles/VehicleForm';
import VehicleDetail from './components/Vehicles/VehicleDetail';
import TransactionsList from './components/Transactions/TransactionsList';



function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-grow">
          <Sidebar />
          <div className="flex-grow">
            <Routes>
              {/* Routes for Partner-related components */}
              <Route path="/partners" element={<PartnersList />} />
              <Route path="/partners/:id" element={<PartnerDetails />} />
              <Route path="/partner-form" element={<PartnerForm />} />
              {/* Routes for Partner-related components */}
              <Route path="/vehicles" element={<VehiclesList />} />
              <Route path="/vehicles/:id" element={<VehicleDetail />} />
              <Route path="/vehicle-form" element={<VehicleForm />} />


              <Route path="/accounts" element={<AccountsList />} />
              <Route path="/contracts" element={<ContractsList />} />
              <Route path="/invoices" element={<InvoicesList />} /> 
              <Route path="/mobile-payments" element={<MobilePaymentsList />} />
              <Route path="/drivers" element={<DriversList />} />
              
              <Route path="/transactions" element={<TransactionsList />} />
              {/* ... */}
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  )
}



export default App;

