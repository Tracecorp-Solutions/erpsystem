import { useState,useEffect } from "react";
import SideNav from "../../shared/navigations/SideNav";
import TopNav from "../../shared/navigations/TopNav";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NewApplicationForm from "../New Connections/newApplicationForm";

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
              {screen === "new-application" && <NewApplicationForm />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BillingDashboard;
