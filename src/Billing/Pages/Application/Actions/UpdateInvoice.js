import React, { useState, useEffect } from "react";
import InvoiceItem from "./InvoiceItem";
import { useNavigate, useLocation } from "react-router-dom";

function UpdateInvoice() {

  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [applicationDetails, setApplicationDetails] = useState(null);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const applicationNumber = state?.applicationNumber;

  const fetchApplicationDetails = async () => {
    try {
      const response = await fetch(
        `http://3.216.182.63:8095/TestApi/GetApplicationByApplicationNumnber?applicationId=${applicationNumber}`
      );
      if (response.ok) {
        const data = await response.json();
        setApplicationDetails(data);
      } else {
        console.error("Failed to fetch application details");
      }
    } catch (error) {
      console.error("Error fetching application details:", error);
    }
  };

  const fetchInvoiceItems = async () => {
    try {
      const response = await fetch(
        `http://3.216.182.63:8095/TestApi/GetInvoiceItems?applicationNumber=${applicationNumber}`
      );
      if (response.ok) {
        const data = await response.json();
        setInvoiceItems(data.materialsDtos); // Assuming materialsDtos contains the invoice items
      } else {
        console.error("Failed to fetch invoice items");
      }
    } catch (error) {
      console.error("Error fetching invoice items:", error);
    }
  };

  useEffect(() => {
    fetchApplicationDetails();
    fetchInvoiceItems();
  }, [applicationNumber]);

  const onClose = () => {
    setIsUpdateModalVisible(false);
  };

  const handleUpdateModalVisible = () => {
    setIsUpdateModalVisible(!isUpdateModalVisible);
  };

  const handleMenuClick = ({ key }) => {
    if (key === "view") {
      navigate(`/billingdashboard`, { state: { screen: "invoice-details" } });
    } else if (key === "approve") {
      // Handle approve logic
    }
  };

  const handleItemAdded = () => {
    fetchInvoiceItems(); // Refresh invoice items after item is added
    onClose();
  };

  return (
    <>
      <div>
          <div className="flex flex-col p-6 mt-6 w-full bg-white rounded-3xl max-w-[1088px] text-neutral-600 max-md:px-5 max-md:max-w-full">
            <div className="text-2xl font-semibold capitalize max-md:max-w-full">
              Application Information
            </div>
            <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
            <div className="flex gap-4 justify-between pt-4 mt-4 text-base leading-6 max-md:flex-wrap max-md:max-w-full">
              <div className="flex flex-col">
                <div className="font-semibold">Application Number</div>
                <div className="mt-2">{applicationNumber}</div>
              </div>
              {/* <div className="flex flex-col">
                <div className="font-semibold">Applicant Name</div>
                <div className="mt-2">{applicationDetails.fullName}</div>
              </div>
              <div className="flex flex-col">
                <div className="font-semibold">Surveyor’s Name</div>
                <div className="mt-2">{applicationDetails.user.fullName}</div>
              </div> */}
            </div>
          </div>
        <div className="flex flex-col p-6 mt-6 w-full bg-white rounded-3xl max-w-[1088px] max-md:px-5 max-md:max-w-full">
          <div className="flex gap-4 justify-between w-full font-semibold max-md:flex-wrap max-md:max-w-full">
            <div className="my-auto text-2xl capitalize text-neutral-600">
              Invoice Items
            </div>
            <div className="flex gap-2 justify-center px-6 py-3 text-base leading-6 text-white rounded-3xl max-md:px-5">
              <button
                className="justify-center self-start px-3 py-3 mt-2.5 text-sm font-semibold text-white whitespace-nowrap rounded-3xl bg-blue-400 max-md:px-5"
                onClick={handleUpdateModalVisible}
              >
                + Add Invoice Item
              </button>
            </div>
          </div>
          <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
          <div className="flex gap-5 justify-between px-6 py-3.5 mt-4 w-full text-xs font-medium tracking-wide uppercase rounded-3xl bg-stone-100 text-neutral-400 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
            <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-4">
                <div className="shrink-0 w-5 h-5 bg-white rounded-2 border-2 border-solid border-neutral-500 border-opacity-10" />
                <div className="my-auto">ITEM NAME</div>
              </div>
              <div className="my-auto">UNIT COST</div>
            </div>
            <div className="flex gap-5 justify-between my-auto">
              <div>QUANTITY</div>
              <div>Amount due</div>
            </div>
          </div>
          {invoiceItems.map((item) => (
            <div key={item.materialId} className="flex gap-5 justify-between px-6 py-3.5 mt-4 w-full text-xs font-medium tracking-wide rounded-3xl bg-white text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
              <div className="flex gap-4">
                <div className="shrink-0 w-5 h-5 bg-white rounded-2 border-2 border-solid border-neutral-500 border-opacity-10" />
                <div className="my-auto">{item.materialId}</div> {/* Adjust as per your data structure */}
              </div>
              <div className="my-auto">{item.quantity}</div> {/* Adjust as per your data structure */}
              <div className="my-auto">{item.price}</div> {/* Adjust as per your data structure */}
            </div>
          ))}
          <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        </div>
      </div>
      {isUpdateModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-[70%] max-w-xl">
            <span className="close" onClick={onClose}>&times;</span>
            <InvoiceItem
              applicationNumber={applicationNumber}
              onItemAdded={handleItemAdded} // Callback to refresh invoice items after adding a new item
            />
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateInvoice;
