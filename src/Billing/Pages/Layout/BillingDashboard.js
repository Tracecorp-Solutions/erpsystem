import { useState, useEffect } from "react";
import SideNav from "../../shared/navigations/SideNav";
import TopNav from "../../shared/navigations/TopNav";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NewApplicationForm from "../New Connections/newApplicationForm";
import ApplicationPage from "../Application/ApplicationPage";
import ApplicationDetail from "../Application/ApplicationDetail";
import UpdateInvoice from "../Application/Actions/UpdateInvoice";
import Payslip from "../Application/Actions/Payslip";
import ReconcileInvoice from "../Application/Actions/ReconcileInvoice";
import Reconcillations from "../Application/Reconcillations";
import Payments from "../Application/Payments";
import BillingCycle from "../Application/BillingCycle";
import BillAdjustment from "../Application/BillAdjustment";
import InvoiceDetails from "../Application/Actions/InvoiceDetails";
import AddMaterials from "../Application/Actions/AddMaterials";
import ShowMaterials from "../Application/Actions/ShowMaterials";
import ConfMaterials from "../Materials/ConfMaterials";
import CreateMaterials from "../Materials/CreateMaterials";
import One from "../Meter/One";
import Replacement from "../Meter/Replacement";
import Bulk from "../Meter/Bulk";
import Servicing from "../Meter/Servicing";
import AddMeter from "../Application/AddMeter";
import MeterDetails from "../Application/MeterDetails";
import EditDocketInitiation from "../Application/EditDocketInitiation";
import ConnectedCustomers from "../Customer/ConnectedCustomer";
import CustomerDetails from "../Customer/CustomerDetails";
import CustomerReadings from "../Customer/CustomerReadings";
import CustomerBills from "../Customer/CustomerBills";
import CustomerTransactions from "../Customer/CustomerTransactions";
import DashboardBilling from "../Dashboard/DashboardBilling";
import History from "../Meter/History";
import CustomerTariffStructure from "../Application/CustomerTariffStructure";
import CustomerStatement from "../Application/CustomerStatement";

const BillingDashboard = () => {
  const location = useLocation();
  const { state } = location;
  const screen = state?.screen || "billingdashboard";
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("userid") == null) {
      navigate('/');
      return;
    }
  }, [navigate]);

  return (
    <div>
      {console.log("***************")}
      {console.log(screen)}
      {screen === "invoice-details" ? <InvoiceDetails /> :   <div className="flex flex-col md:flex-row w-full">
      
      <>
        <SideNav />
        <main className="w-full w-9/12">
          <TopNav />
          {/* Page header */}

          <div className="w-full flex justify-center">
            <div className="main-content bg-stone-100 pb-6 rounded-t-3xl">
              <div className="content px-4 sm:px-6 lg:px-8 group-container">
                
                {screen === "billingdashboard" && <DashboardBilling/>}
                {screen === "new-application" && <NewApplicationForm />}
                {screen === "application" && <ApplicationPage />}
                {screen === "view-detail" && <ApplicationDetail />}
                {screen === "update-invoice" && <UpdateInvoice />}
                {screen === "customer-invoice" && <Payslip />}
                {screen === "reconcile-invoice" && <ReconcileInvoice />}
                {screen === "reconciliation" && <Reconcillations />}
                {screen === "payments" && <Payments />}
                {screen === "billing" && <BillingCycle />}
                {screen === "bill-adjsutment" && <BillAdjustment />}
                {screen === "invoice-details" && <InvoiceDetails />}
                {screen === "add-materials" && <AddMaterials />}
                {screen === "show-materials" && <ShowMaterials />}
                {screen === "conf-materials" && <ConfMaterials />}
                {screen === "create-materials" && <CreateMaterials />}
                {screen === "add-meter" && <AddMeter />}
                {screen === "report-details" && <MeterDetails />}
                {screen === "edit-docket-initiation" && <EditDocketInitiation />}
                {screen === "one" && <One />}
              {screen === "customer-details" && <CustomerDetails/>}
              {screen === "customer-readings" && <CustomerReadings/>}
              {screen === "customer-bills" && <CustomerBills/>}
              {screen === "customer-transactions" && <CustomerTransactions/>}
                {screen === "history" && <History/>}
                {screen === "bulk" && <Bulk />}
                {screen === "servicing" && <Servicing />}
                {screen === "replacement" && <Replacement />}
                {screen === "connectedcustomers" && <ConnectedCustomers/>}
                {screen === "tariffs" && <CustomerTariffStructure/>}
                {screen === "customer-statement" && <CustomerStatement/>}
              </div>
            </div>
          </div>
        </main>
      </>
    </div>}
    </div>
  
  );
};

export default BillingDashboard;
