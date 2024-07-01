import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, json } from "react-router-dom";
import { Dropdown, Menu, Modal as AntModal } from "antd";
import { EllipsisVerticalOutlined } from "@ant-design/icons"; // Correct import for Ant Design icons
import InvoiceItem from "./InvoiceItem";
import { message } from "antd";
import axios from "axios";
import { DateTime } from "luxon";

function UpdateInvoice() {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState([]); // Initialize as an empty array
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [application, setApplication] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [modalView, setModalView] = useState(false);
  const { state } = location;

  const applicationNumber = state?.applicationNumber;

  useEffect(() => {
    if (applicationNumber) {
      fetchApplicationDetails(applicationNumber);
    }
  }, [applicationNumber]);


  const fetchApplicationDetails = async (applicationNumber) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/GetApplicationByApplicationNumnber?applicationId=${applicationNumber}`)
      setApplication(response.data);
    } catch (error) {
      message.error(error.response);
    }
  };

  const onClose = () => {
    setModalView(false);
  };

  const handleUpdateModalVisible = () => {
    setModalView(true);
  };

  const handleMenuClick = ({ key }) => {
    if (key === "view") {
      navigate(`/billingdashboard`, { state: { screen: "invoice-details", invoiceItems } });
    } else if (key === "approve") {
      // Handle approve logic
    }
  };

  const handleSaveInvoice = async () => {
    try {
      var jsonobject = JSON.stringify({
        "applicationNumber" : applicationNumber,
         "date" : DateTime.now(),
         "materialsDtos" : invoiceItems
      });

      const resp = await axios.post(`${process.env.REACT_APP_API_URL}/AddConnectionInvoice`,jsonobject,{
        headers: {
          "Content-Type": "application/json",
        },
      }
      );

      message.success(resp.data);
      navigate(`/billingdashboard`, { state: { screen: "application" } });
    }catch(error){
      message.error(error.response.data);
    }
  };

  // Function to handle addition of new item
  const handleItemAdded = (newItem) => {
    setInvoiceItems([...invoiceItems, newItem]);
  };

  // Function to remove item from invoice
  const handleRemoveItem = (index) => {
    const updatedItems = [...invoiceItems];
    updatedItems.splice(index, 1);
    setInvoiceItems(updatedItems);
  };

  // Calculate total sum of total prices in invoice items
  const totalSum = invoiceItems.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.totalPrice;
  }, 0);

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
        <div>
          <div className="flex flex-col p-6 mt-6 w-full bg-white rounded-3xl max-w-[1088px] text-neutral-600 max-md:px-5 max-md:max-w-full">
            <div className="text-2xl font-semibold capitalize max-md:max-w-full">
              Application Information
            </div>
            <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
            <div className="flex gap-4 justify-between pt-4 mt-4 text-base leading-6 max-md:flex-wrap max-md:max-w-full">
              <div className="flex flex-col">
                <div className="font-semibold">Application Number</div>
                <div className="mt-2">{application?.applicationNumber}</div>
              </div>
              <div className="flex flex-col">
                <div className="font-semibold">Applicant Name</div>
                <div className="mt-2">{application?.fullName}</div>
              </div>
              <div className="flex flex-col">
                <div className="font-semibold">Surveyor’s Name</div>
                <div className="mt-2">{application?.user.fullName}</div>
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
            <table border="1" className="mt-4 w-full text-left">
              <thead>
                <tr>
                  <th>Material Name</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.materialId}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                    <td>
                      <button
                        className="text-red-500"
                        onClick={() => handleRemoveItem(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="2" style={{ textAlign: "right", fontWeight: "bold" }}>Total Sum:</td>
                  <td style={{ fontWeight: "bold" }}>${totalSum.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
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
      </div>

      <InvoiceItem
        applicationNumber={applicationNumber}
        modalView={modalView}
        closeAddItemsForm={onClose}
        onItemAdded={handleItemAdded} // Pass the function to handle adding items
      />
    </>
  );
}

export default UpdateInvoice;
