import { useState, useEffect } from "react";
import SideNav from "../../Shared/SideNav";
import TopNav from "../../Shared/TopNav";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CrmDashboard from "../Dashboard/CrmDashboard";
import Departments from "../Departments/Departments";
import Escalation from "../Escalation/Escalation";
import CrmReport from "../Reports/CrmReport";

const Crm = () => {
  const location = useLocation();
  const { state } = location;
  const screen = state?.screen || "crm";
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("userid") == null) {
      navigate('/');
      return;
    }
  }, [navigate]);

  return (
    <div className="flex flex-col md:flex-row w-full">
      <SideNav />
      <main className="w-full w-9/12">
        <TopNav />
        {/* Page header */}

        <div className="w-full flex justify-center">
          <div className="main-content bg-stone-100 pb-6 rounded-t-3xl">
            <div className="content px-4 sm:px-6 lg:px-8 group-container">
              {screen === "crm" && <CrmDashboard />}
              {screen === "departments" && <Departments />}
              {screen === "escalation" && <Escalation />}
              {screen === "crm-report" && <CrmReport />}
        
            </div>
          </div>
        </div>
      </main>
    </div>
  
  );
};

export default Crm;
