import React, { useState, useEffect } from "react";
import InvoiceItem from "./InvoiceItem";
import { useNavigate } from "react-router-dom";

function UpdateInvoice() {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [applicationDetails, setApplicationDetails] = useState(null); // State to store application details
  const navigate = useNavigate();
  const applicationNumber = "adasdasdasdasdsadas"; // Replace with your application number

  const fetchApplicationDetails = async () => {
    try {
      const response = await fetch(
        `http://3.216.182.63:8095/TestApi/GetApplicationByApplicationNumnber?applicationId=${applicationNumber}`
      );
      if (response.ok) {
        const data = await response.json();
        setApplicationDetails(data); // Store fetched application details in state
      } else {
        console.error("Failed to fetch application details");
      }
    } catch (error) {
      console.error("Error fetching application details:", error);
    }
  };

  useEffect(() => {
    fetchApplicationDetails();
  }, [applicationNumber]);

  const onClose = () => {
    setIsUpdateModalVisible(false); // Closing the modal by updating state
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
    // Refresh application details after item is added
    fetchApplicationDetails();
    onClose(); // Close modal after item is added
  };

  return (
    <>
      <div>
        <div className="flex flex-col flex-wrap justify-center content-start items-center py-8 px-12 rounded-3xl bg-stone-100 mr-12 max-md:max-w-full">
          <div className="flex gap-5 justify-between self-stretch px-6 w-full text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
            <div>Material Cost Estimates</div>
            <div>$0.00</div>
          </div>
          {applicationDetails && (
            <div className="flex flex-col p-6 mt-6 w-full bg-white rounded-3xl max-w-[1088px] text-neutral-600 max-md:px-5 max-md:max-w-full">
              <div className="text-2xl font-semibold capitalize max-md:max-w-full">
                Application Information
              </div>
              <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
              <div className="flex gap-4 justify-between pt-4 mt-4 text-base leading-6 max-md:flex-wrap max-md:max-w-full">
                <div className="flex flex-col">
                  <div className="font-semibold">Application Number</div>
                  <div className="mt-2">{applicationDetails.applicationNumber}</div>
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold">Applicant Name</div>
                  <div className="mt-2">{applicationDetails.fullName}</div>
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold">Surveyor’s Name</div>
                  <div className="mt-2">{applicationDetails.surveyorsName}</div>
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold">Job Number</div>
                  <div className="mt-2">{applicationDetails.jobNumber}</div>
                </div>
              </div>
            </div>
          )}
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
            <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
          </div>
          <div className="items-end py-6 mt-6 max-w-full w-[500px] max-md:pl-5">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-4/12 max-md:ml-0 max-md:w-full">
                <div className="grow justify-center items-center px-4 py-4 w-full text-base leading-6 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5 max-md:mt-10">
                  Cancel
                </div>
              </div>
              <div className="flex flex-col ml-5 w-4/12 max-md:ml-0 max-md:w-full">
                <div className="grow justify-center items-center px-4 py-4 w-full text-base font-semibold leading-6 text-white rounded-3xl bg-blue-400 max-md:px-5 max-md:mt-10">
                  Save Invoice
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isUpdateModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-[70%] max-w-xl">
            <span className="close" onClick={onClose}>&times;</span>
            <InvoiceItem
              applicationNumber={applicationNumber}
              onItemAdded={handleItemAdded} // Pass callback to handle item addition
            />
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateInvoice;
