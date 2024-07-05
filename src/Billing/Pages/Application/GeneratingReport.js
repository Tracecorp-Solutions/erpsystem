import React,{useEffect} from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const GeneratingReport = ({ record, generatePDF }) => {

    useEffect(()=>{
        record = sessionStorage.getItem("setrecord");
        console.log("set record",record);
    },[]);
  return (
    <div id="pdf-content" className="flex items-center justify-center">
      {record ? (
        <div className="flex flex-col justify-center px-8 py-6 text-base max-w-[550px] max-md:px-5">
          <div key={record.customerBillId} className="mb-8">
            <div className="flex flex-col justify-center px-8 py-6 text-base max-w-[550px] max-md:px-5">
              <div className="flex flex-col items-center py-4 text-white bg-slate-500 leading-[160%] max-md:max-w-full">
                <div className="self-stretch text-2xl font-semibold text-center max-md:max-w-full">
                  Trace ERP Water Corporation
                </div>
                <div className="mt-4 text-center">Location: Abeokuta</div>
                <div className="mt-1">
                  Phone: 08031230137 / 08139936865
                </div>
                <div className="mt-1">Email: ogunwater2018@yahoo.com</div>
                <div className="mt-1 text-center">
                  Website: http://ogunwater.org.ng
                </div>
              </div>
              <div className="mt-6 leading-7 text-neutral-600 max-md:max-w-full">
                <span className="font-semibold">Customer Information:</span>{" "}
                <br />
                Customer Name: {record.customer.application.fullName} <br />
                Account Number: {record.customer.application.applicationNumber}{" "}
                <br />
                Service Address: {record.customer.application.streetAddress} <br />
                Billing Date: {new Date(record.billDate).toLocaleDateString()}{" "}
                <br />
                Due Date: {new Date(record.billDate).toLocaleDateString()}{" "}
                <br />
                -----------------------------------------------------------------
                <br />
                <span className="font-semibold">Water Usage Details: </span>
                <br />
                Meter Number: {record.customer.customerRef} <br />
                Previous Reading: {record.previousReading} m³ (June 1, 2024){" "}
                <br />
                Current Reading: {record.currentReading} m³ (July 1, 2024){" "}
                <br />
                Usage: {record.consuption} m³ <br />
                Usage Charge: ₦{record.amount} <br />
                -----------------------------------------------------------------
                <br />
                <span className="font-semibold">Bill Summary: </span>
                <br />
                -----------------------------------------------------------------
                Previous Balance: ₦{record.dueAmount} <br />
                Payments Received: ₦{record.totalAmountPaid} <br />
                Adjustments: ₦0 <br />
                Balance Forward: ₦{record.totalAmountPaid} <br />
                <span className="font-semibold">Current Charges: </span> <br />
                - Water Usage Charge: ₦{record.amount} <br />
                - Service Charge: ₦{record.tarrifAmount} <br />
                - Other Charges: ₦{record.totalBillAmount} <br />
                Total Current Charges: ₦{record.totalBillAmount} <br />
                <span className="font-semibold">Total Amount Due: </span> ₦
                {record.totalBillAmount} <br />
                -----------------------------------------------------------------
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-red-500">No record selected.</div>
      )}
    </div>
  );
};

export default GeneratingReport;
