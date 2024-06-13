import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Billing/Components/shared/Dashboard";
import Dashboardlayout from "./Accounting/Pages/layout/DashboardLayout";
import GroupAccountSetUp from "./Accounting/Pages/Group/GroupAccountSetUp";
import SubGroupSetup from "./Accounting/Pages/Subgroup/SubGroupSetup";
import AccountSetup from "./Accounting/Pages/Accounts/AccountSetup";
import Transactions from "./Accounting/Pages/Transaction/Transactions";
import VendorSetup from "./Accounting/Pages/Vendors/VendorSetup";
import Customer from "./Accounting/Pages/Customers/Customer";
import Signup from "./shared/auth/Signup";
import Login from "./shared/auth/Login";
import SetPassword from "./shared/auth/shared/SetPassword";
import VerifyUser from "./shared/auth/shared/VerifyUser";
import ViewTransactions from "./Accounting/Pages/Transaction/ViewTransactions";
import BillsForm from "./Accounting/Pages/Billing/BillsForm";
import InvoiceSidebar from "./components/InvoiceSidebar";
import InvoiceForm from "./Accounting/Pages/Invoices/InvoiceForm";
import EditInvoiceForm from "./components/EditInvoiceForm";
import Invoice from "./Accounting/Pages/Invoices/Invoice";
import Layout from "./shared/auth/shared/Layout";
import ProfileLayout from "./shared/onboarding/shared/ProfileLayout";
import Report from "./Accounting/Pages/Reports/Report";
import Statement from "./Accounting/Pages/Reports/Statement";
import BalanceSheets from "./Accounting/Pages/Reports/BalanceSheets";
import TrialBalance from "./Accounting/Pages/Reports/TrialBalance ";
import UserActivity from "./Accounting/Pages/Reports/UserActivity";
import Billing from "./Accounting/Pages/Billing/Billing";
import Landing from "./shared/Landing";

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
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route
                path="/verify"
                element={<VerifyUser onVerify={handleVerify} />}
              />
              <Route path="/groups" element={<GroupAccountSetUp />} />
              <Route path="/sub-group" element={<SubGroupSetup />} />
              <Route path="/accounts" element={<AccountSetup />} />
              <Route path="/vendors" element={<VendorSetup />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify" element={<VerifyUser />} />
              <Route path="/reset" element={<SetPassword />} />
              {/* <Route path="/forgot" element={<Forgot />} /> */}
              <Route path="/Dashboardlayout" element={<Dashboardlayout />} />
              <Route path="/" element={<Layout/>}/>
              <Route
                path="view-transactions/:accountId"
                element={<ViewTransactions />}
              />
              <Route path="/customer" element={<Customer />} />
              <Route path="/create-bills" element={<BillsForm />} />
              <Route path="/create-invoice" element={<InvoiceForm />} />
              <Route path="/edit-invoice/:id" element={<EditInvoiceForm />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/billsForm" element={<BillsForm />} />
              <Route path="/invoiceform" element={<InvoiceForm />} />
              <Route path="/report" element={<Report />} />
              <Route path="/statement" element={<Statement />} />
              <Route path="/balance-sheet" element={<BalanceSheets />} />
              <Route path="/trial-balance" element={<TrialBalance />} />
              <Route path="/user-activity" element={<UserActivity />} />
            </Routes>
          </div>
          <Routes>
            {/* <Route path="/profile" element={<Profile />} /> */}

            <Route path="/profilelayout" element={<ProfileLayout />} />
            <Route path="/landing" element={<Landing />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
