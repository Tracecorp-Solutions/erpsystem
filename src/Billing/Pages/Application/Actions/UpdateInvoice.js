import React, { useState } from "react";
import InvoiceItem from "./InvoiceItem";
import { Table, Menu, Dropdown } from "antd";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useNavigate, useLocation } from "react-router-dom";
import InvoiceDetails from "./InvoiceDetails";

function UpdateInvoice() {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleUpdateModalVisible = () => {
    setIsUpdateModalVisible(!isUpdateModalVisible);
  };

  
  const handleMenuClick = ({ key }) => {
    // Implement navigation logic based on the key (menu item clicked)
    if (key === 'view') {
      navigate(`/billingdashboard`, { state: { screen: 'invoice-details' } });  // Navigate to invoice details page
    } else if (key === 'approve') {
      // Handle other menu item actions if needed
    }
  };

  return (
    <>
     
      <div>
       
        <div className="flex flex-col flex-wrap justify-center content-start items-center py-8 px-12 rounded-3xl bg-stone-100 mr-12  max-md:max-w-full">
          <div className="flex gap-5 justify-between self-stretch px-6 w-full text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
            <div>Material Cost Estimates</div>
            <div>$0.00</div>
          </div>
          <div className="flex flex-col p-6 mt-6 w-full bg-white rounded-3xl max-w-[1088px] text-neutral-600 max-md:px-5 max-md:max-w-full">
            <div className="text-2xl font-semibold capitalize max-md:max-w-full">
              Application Information
            </div>
            <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
            <div className="flex gap-4 justify-between pt-4 mt-4 text-base leading-6 max-md:flex-wrap max-md:max-w-full">
              <div className="flex flex-col">
                <div className="font-semibold">Application Number</div>
                <div className="mt-2">APP567890</div>
              </div>
              <div className="flex flex-col">
                <div className="font-semibold">Applicant Name</div>
                <div className="mt-2">Grace Eze</div>
              </div>
              <div className="flex flex-col">
                <div className="font-semibold">Surveyor’s Name</div>
                <div className="mt-2">Nowembabazi Nickson</div>
              </div>
              <div className="flex flex-col">
                <div className="font-semibold">Job Number</div>
                <div className="mt-2">JCN/AB/00/22022022/1</div>
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
            <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
            <div className="flex gap-5 justify-between px-6 py-3.5 mt-4 w-full text-xs font-medium tracking-wide uppercase rounded-3xl bg-stone-100 text-neutral-400 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
              <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-4">
                  <div className="shrink-0 w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
                  <div className="my-auto">ITEM NAME</div>
                </div>
                <div className="my-auto">UNIT COST</div>
              </div>
              <div className="flex gap-5 justify-between my-auto">
                <div>QUANTITY</div>
                <div>Amount due</div>
              </div>
            </div>
            <div className="flex gap-5 justify-between px-6 py-2 mt-2 w-full rounded-3xl max-md:flex-wrap max-md:px-5 max-md:max-w-full">
              <div className="flex gap-5 justify-between my-auto text-base leading-6 text-neutral-600 max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-4 bg-white">
                  <div className="shrink-0 my-auto w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
                  <div>Water pipes | 20 meters</div>
                </div>
                <div>80,000</div>
              </div>
              <div className="flex gap-5 justify-between items-center">
                <div className="self-stretch my-auto text-base leading-6 text-neutral-600">
                  3
                </div>
                <div className="self-stretch my-auto text-base leading-6 text-neutral-600">
                  240,000
                </div>
                <div className="flex justify-center items-center self-stretch px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
                  <Dropdown
                    overlay={
                      <Menu onClick={handleMenuClick}>
                        <Menu.Item key="view">View invoice</Menu.Item>
                        <Menu.Item key="approve">Approve Application</Menu.Item>
                      </Menu>
                    }
                    trigger={["click"]}
                    placement="bottomLeft"
                  >
                    <EllipsisVerticalIcon className="w-7 h-7" />
                  </Dropdown>
                </div>
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
            <InvoiceItem />
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateInvoice;
