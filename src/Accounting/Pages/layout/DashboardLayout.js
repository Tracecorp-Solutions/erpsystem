import { useState } from "react";
import SideNav from "../../shared/navigations/SideNav";
import TopNav from "../../shared/navigations/TopNav";
import Dashboard from "../../components/Dashboard";
import GroupAccountSetUp from "../Group/GroupAccountSetUp";
import AccountSetup from "../Accounts/AccountSetup";
//hooks
import { useLocation } from "react-router-dom";
import SubGroupSetup from "../Subgroup/SubGroupSetup";
import Transactions from "../Transaction/Transactions";
import ViewTransactions from "../Transaction/ViewTransactions";
import VendorSetup from "../Vendors/VendorSetup";
import Customer from "../Customers/Customer";
import Invoice from "../Invoices/Invoice";

const Dashboardlayout = () => {
  const location = useLocation();
  const { state } = location;
  const screen = state?.screen || "dashboard";

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row w-full">
      <SideNav />
      <main className="w-full w-9/12">
        <TopNav />
        {/* Page header */}

        <div className="w-full flex justify-center">
          <div className="main-content bg-stone-100 pb-6 rounded-t-3xl">
            <div className="content px-4 sm:px-6 lg:px-8 group-container">
              {screen === "dashboard" && <Dashboard />}
              {screen === "groups" && <GroupAccountSetUp />}
              {screen === "sub-group" && <SubGroupSetup />}
              {screen === "accounts" && <AccountSetup />}
              {screen === "transactions" && <Transactions />}
              {screen === "view-transactions/:accountId" && (
                <ViewTransactions />
              )}
              {screen === 'vendors' && <VendorSetup />}
              {screen === 'customer' && <Customer />}
              {screen === 'invoice' && <Invoice />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboardlayout;
