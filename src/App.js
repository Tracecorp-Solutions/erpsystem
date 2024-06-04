import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboardlayout from "./Accounting/Pages/layout/DashboardLayout";
import Groups from "./pages/Groups";
import Subgroups from "./pages/Subgroups";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import Profile from "./pages/onboarding/Profile";
import Company from "./pages/onboarding/Company";
import Vendors from "./pages/Vendors";
import Customer from "./pages/Customer";
import Signup from "./pages/authentication/Signup";
import Reset from "./pages/authentication/Reset";
import Verify from "./pages/authentication/Verify";
import Login from "./pages/authentication/Login";
import Forgot from "./pages/authentication/Forgot";
import ViewTransaction from "./pages/ViewTransaction";
import Billing from "./pages/Billing";
import BillsForm from "./components/BillsForm";
import InvoiceSidebar from "./components/InvoiceSidebar";
import InvoiceForm from "./components/InvoiceForm";
import EditInvoiceForm from "./components/EditInvoiceForm";
import Invoice from "./pages/Invoice";
import Layout from "./shared/auth/shared/Layout";
import ProfileLayout from "./shared/onboarding/shared/ProfileLayout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleVerify = () => {
    setIsVerified(true);
  };

  const handleForgot = () => {
    setIsReset(true);
  };
  return (
    <div className="min-h-full">
      <div className="py-">
        <BrowserRouter>
          <div className="AppContainer">
            <Routes>
              <Route
                path="/signup"
                element={<Signup onVerify={handleVerify} />}
              />
              <Route
                path="/verify"
                element={<Verify onVerify={handleVerify} />}
              />
              <Route
                path="/forgot"
                element={<Forgot onForgot={handleForgot} />}
              />
              <Route path="/" element={<Login onLogin={handleLogin} />} />
              <Route path="/" element={<Login />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/sub-group" element={<Subgroups />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/reset" element={<Reset />} />
              <Route path="/forgot" element={<Forgot />} />
              <Route path="/company" element={<Company />} />
              <Route path="/Dashboardlayout" element={<Dashboardlayout />} />
              <Route path="/layout" element={<Layout/>}/>
              <Route
                path="view-transaction/:accountId"
                element={<ViewTransaction />}
              />
              <Route path="/customer" element={<Customer />} />
              <Route path="/create-bills" element={<BillsForm />} />
              <Route path="/create-invoice" element={<InvoiceForm />} />
              <Route path="/edit-invoice/:id" element={<EditInvoiceForm />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/billing" element={<Billing />} />
            </Routes>
          </div>
          <Routes>
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/profilelayout" element={<ProfileLayout />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
