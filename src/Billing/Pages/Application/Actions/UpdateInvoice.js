import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import InvoiceItem from "./InvoiceItem";

function UpdateInvoice() {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState(null); // Initialize as null
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const applicationNumber = state?.applicationNumber;

  useEffect(() => {
    if (applicationNumber) {
      fetchInvoiceItems(applicationNumber);
    }
  }, [applicationNumber]);

  const fetchInvoiceItems = async (applicationNumber) => {
    try {
      const response = await fetch(
        `http://3.216.182.63:8095/TestApi/GetNewConnectionInvoice?applicationNumber=${applicationNumber}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch invoice items");
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      setInvoiceItems(data); // Assuming data is the entire object from API
      setErrorMessage(""); // Clear error message on successful fetch
    } catch (error) {
      console.error("Error fetching invoice items:", error);
      setInvoiceItems(null); // Reset invoiceItems to null on error
      setErrorMessage("Failed to fetch invoice items");
    }
  };

  const onClose = () => {
    setIsUpdateModalVisible(false);
  };

  const handleUpdateModalVisible = () => {
    setIsUpdateModalVisible(!isUpdateModalVisible);
  };

  const handleMenuClick = ({ key }) => {
    if (key === "view") {
      navigate(`/billingdashboard`, { state: { screen: "invoice-details", invoiceItems } });
    } else if (key === "approve") {
      // Handle approve logic
    }
  };

  const handleItemAdded = () => {
    onClose();
  };

  const handleSaveInvoice = async () => {
    try {
      const response = await fetch(
        "http://3.216.182.63:8095/TestApi/AddConnectionInvoice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            invoiceItems: invoiceItems.NewConnectionInvoiceMaterials, // Adjusted to send just the materials array
            applicationNumber,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save invoice");
      }

      setSuccessMessage("Invoice saved successfully");
      setErrorMessage("");
      navigate(`/billingdashboard`, { state: { screen: "invoice-details" } });
    } catch (error) {
      console.error("Error saving invoice:", error);
      setErrorMessage("Failed to save invoice");
      setSuccessMessage("");
    }
  };

  console.log("invoiceItems:", invoiceItems);

  return (
    <>
      <div>
        {successMessage && (
          <div className="flex justify-center mt-2 text-green-600">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="flex justify-center mt-2 text-red-600">
            {errorMessage}
          </div>
        )}
        {!invoiceItems ? (
          <div className="flex justify-center mt-2">Loading...</div>
        ) : (
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
                <div className="flex flex-col">
                  <div className="font-semibold">Applicant Name</div>
                  <div className="mt-2">{state?.applicantName}</div>
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold">Surveyor’s Name</div>
                  <div className="mt-2">{state?.surveyorName}</div>
                </div>
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
              {invoiceItems.NewConnectionInvoiceMaterials.map((item) => (
                <div
                  key={item.Id}
                  className="flex gap-5 justify-between px-6 py-3.5 mt-4 w-full text-x font-medium tracking-wide rounded-3xl bg-white text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full"
                >
                  <div className="flex gap-4">
                    <div className="shrink-0 w-5 h-5 bg-white rounded-2 border-2 border-solid border-neutral-500 border-opacity-10" />
                    <div className="my-auto">{item.MaterialId}</div>
                  </div>
                  <div className="my-auto">{item.Quantity}</div>
                  <div className="my-auto">{item.Price}</div>
                  <div className="flex justify-center items-center self-stretch px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
                    <Dropdown
                      overlay={
                        <Menu onClick={handleMenuClick}>
                          <Menu.Item key="view">View Invoice</Menu.Item>
                        </Menu>
                      }
                      trigger={["click"]}
                      placement="bottomLeft"
                    >
                      <EllipsisVerticalIcon className="w-7 h-7" />
                    </Dropdown>
                  </div>
                </div>
              ))}
            </div>
            <div className="justify-end py-6 mt-6 max-w-full w-[1040px] max-md:pl-5">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                  <button
                    className="grow justify-center items-center px-8 py-4 w-full text-base leading-6 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5 max-md:mt-10"
                    onClick={() => navigate('/billingdashboard')}
                  >
                    Cancel
                  </button>
                </div>
                <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                  <button
                    className="grow justify-center items-center px-8 py-4 w-full text-base font-semibold leading-6 text-white rounded-3xl bg-blue-400 max-md:px-5"
                    onClick={handleSaveInvoice}
                  >
                    Save Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Invoice Item Modal */}
      {isUpdateModalVisible && (
        <InvoiceItem
          applicationNumber={applicationNumber}
          onClose={handleUpdateModalVisible}
          onItemAdded={handleItemAdded}
        />
      )}
    </>
  );
}

export default UpdateInvoice;
