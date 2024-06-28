import { useState,useEffect } from "react";
import SideNav from "../../shared/navigations/SideNav";
import TopNav from "../../shared/navigations/TopNav";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApplicationPage from "../Application/ApplicationPage";
import ApplicationDetail from "../Application/ApplicationDetail";
import UpdateInvoice from "../Application/Actions/UpdateInvoice";
import Payslip from "../Application/Actions/Payslip";
import ReconcileInvoice from "../Application/Actions/ReconcileInvoice";
import Reconcillations from "../Application/Reconcillations";

const BillingDashboard = () => {
  const location = useLocation();
  const { state } = location;
  const screen = state?.screen || "billingdashboard";
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);  
  useEffect(() => {
    if (sessionStorage.getItem("userid") == null) {
      navigate('/');
      return ;
    }
  },[navigate]);
  
  return (
    <div className="flex flex-col md:flex-row w-full">
      <SideNav />
      <main className="w-full w-9/12">
        <TopNav />
        {/* Page header */}

        <div className="w-full flex justify-center">
          <div className="main-content bg-stone-100 pb-6 rounded-t-3xl">
            <div className="content px-4 sm:px-6 lg:px-8 group-container">
              {screen === "application" && <ApplicationPage />}
              {screen === "view-detail" && <ApplicationDetail />}
              {screen === "update-invoice" && <UpdateInvoice />}
              {screen === "customer-invoice" && <Payslip />}
              {screen === "reconcile-invoice" && <ReconcileInvoice />}
              {screen === "reconciliation" && <Reconcillations />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BillingDashboard;
