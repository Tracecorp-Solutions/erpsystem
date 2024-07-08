import React, { useState, useEffect, useRef } from "react";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Reject from "./Reject";

function InvoiceDetails() {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState(null);
  const location = useLocation();
  const { state } = location;
  const applicationNumber = state?.applicationNumber;
  const printRef = useRef();

  useEffect(() => {
    if (applicationNumber) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/GetNewConnectionInvoice?applicationNumber=${applicationNumber}`)
        .then((response) => {
          setInvoiceItems(response.data);
        })
        .catch((error) => {
          console.error("Error fetching invoice data:", error);
        });
    }
  }, [applicationNumber]);

  // Handle modal visibility toggle
  const handleUpdateModalVisible = () => {
    setIsUpdateModalVisible(!isUpdateModalVisible);
  };

  // Handle menu click for authorize and reject actions
  const handleMenuClick = ({ key }) => {
    if (key === "authorize") {
      console.log("Authorize Invoice clicked");
      // Add logic for authorize action
    } else if (key === "reject") {
      console.log("Reject Invoice clicked");
      handleUpdateModalVisible();
    }
  };

  // Function to generate and download the PDF
  const handleDownloadInvoice = () => {
    if (!printRef.current) return;

    html2canvas(printRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    });
  };

  // Dropdown menu for actions
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="authorize">Back</Menu.Item>
    </Menu>
  );

  // Render loading state while waiting for data
  if (!invoiceItems) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="d-block flex-col justify-end items-center pt-8 bg-white w-full border" style={{ display: 'block' }}>
        <div className="px-16 flex flex-col w-full"ref={printRef} >
          {/* Header section */}
          <div className="flex gap-5 justify-between mt-2 w-full max-md:flex-wrap">
            <div className="flex gap-5 justify-between text-neutral-600 max-md:flex-wrap">
              <div className="text-4xl font-semibold leading-[57.6px]">
                {invoiceItems.Application.FullName}
              </div>
              <div className="justify-center px-6 py-2.5 my-auto text-xs font-medium tracking-wide uppercase whitespace-nowrap rounded-3xl bg-stone-100 max-md:px-5">
                {invoiceItems.Status}
              </div>
            </div>
            {/* <div className="flex gap-2 justify-center py-2 pr-3 pl-4 my-auto text-base bg-blue-400 font-semibold leading-6 text-white whitespace-nowrap rounded-3xl">
              <Dropdown overlay={menu} trigger={["click"]} placement="bottomLeft">
                <div className="flex gap-2 justify-center py-3 pr-4 pl-6 my-auto text-base font-semibold leading-6 text-white whitespace-nowrap rounded-3xl bg-blue-400">
                  <div>Actions</div>
                  <DownOutlined />
                </div>
              </Dropdown>
            </div> */}
          </div>
          {/* Divider */}
          <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
          {/* Details section */}
          <div className="mt-6 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              {/* Left column */}
              <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                  <div className="flex gap-1 max-md:flex-wrap">
                    <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                      Invoice No
                    </div>
                    <div className="text-base font-semibold leading-6 text-neutral-600">
                      {invoiceItems.InvoiceNumber}
                    </div>
                  </div>
                  <div className="flex gap-1 mt-1 max-md:flex-wrap">
                    <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                      Address
                    </div>
                    <div className="text-base leading-6 text-neutral-600">
                      {invoiceItems.Application.StreetAddress}
                    </div>
                  </div>
                  <div className="flex gap-1 mt-1 whitespace-nowrap max-md:flex-wrap">
                    <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                      Phone
                    </div>
                    <div className="text-base leading-6 text-neutral-600">
                      {invoiceItems.Application.PhoneNumber}
                    </div>
                  </div>
                  <div className="flex gap-1 mt-1 max-md:flex-wrap">
                    <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                      Issue Date
                    </div>
                    <div className="text-base leading-6 text-neutral-600">
                      {new Date(invoiceItems.InvoiceDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              {/* Right column */}
              <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                  <div className="flex gap-1 max-md:flex-wrap">
                    <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                      Invoice To
                    </div>
                    <div className="text-base font-semibold leading-6 text-neutral-600">
                      {invoiceItems.Application.FullName}
                    </div>
                  </div>
                  <div className="flex gap-1 mt-1 max-md:flex-wrap">
                    <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                      Address
                    </div>
                    <div className="text-base leading-6 text-neutral-600">
                      {invoiceItems.Application.StreetAddress}
                    </div>
                  </div>
                  <div className="flex gap-1 mt-1 whitespace-nowrap max-md:flex-wrap">
                    <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                      Phone
                    </div>
                    <div className="text-base leading-6 text-neutral-600">
                      {invoiceItems.Application.PhoneNumber}
                    </div>
                  </div>
                  <div className="flex gap-1 mt-1 max-md:flex-wrap">
                    <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                      Due Date
                    </div>
                    <div className="text-base leading-6 text-neutral-600">
                      {invoiceItems.InvoiceDate ? new Date(invoiceItems.InvoiceDate).toLocaleDateString() : "Not specified"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Divider */}
            <div className="shrink-0 mt-5 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
            {/* Table section */}
            <div className="mt-8 max-md:max-w-full">
              <div className="relative overflow-x-auto mt-6 border border-solid border-stone-100">
                <table className="w-full text-left border-collapse table-auto">
                  <thead>
                    <tr className="bg-stone-50">
                      <th className="px-6 py-2 text-xs font-medium tracking-wide uppercase whitespace-nowrap text-neutral-600">
                        Material Name
                      </th>
                      <th className="px-6 py-2 text-xs font-medium tracking-wide uppercase whitespace-nowrap text-neutral-600">
                        Quantity
                      </th>
                      <th className="px-6 py-2 text-xs font-medium tracking-wide uppercase whitespace-nowrap text-neutral-600">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {invoiceItems.NewConnectionInvoiceMaterials.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-2 whitespace-nowrap">
                          <div className="text-sm leading-5 text-neutral-600">
                            {item.Material.MaterialName}
                          </div>
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          <div className="text-sm leading-5 text-neutral-600">
                            {item.Quantity}
                          </div>
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          <div className="text-sm leading-5 text-neutral-600">
                            {item.Price.toFixed(2)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Notes section */}
         
          {/* Actions section */}
          {isUpdateModalVisible && <Reject />}
        </div>
        <div className="justify-end px-20 py-6 max-md:pl-5">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
                <div className="grow justify-center items-center px-8 py-4 w-full text-base leading-6 rounded-3xl bg-stone-100 text-neutral-600 max-md:px-5 max-md:mt-10">
                  Send Invoice
                </div>
              </div>
              <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                <div
                  className="grow justify-center px-8 py-4 w-full text-base font-semibold leading-6 text-white rounded-3xl bg-blue-400 max-md:px-5 max-md:mt-10"
                  onClick={handleDownloadInvoice}
                  style={{ cursor: 'pointer' }} // Add pointer cursor to indicate it's clickable
                >
                  Download Invoice
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  );
}

export default InvoiceDetails;
