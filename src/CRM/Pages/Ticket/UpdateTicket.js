import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Table, Tag } from "antd";
import moment from "moment";
import axios from "axios";

const UpdateTicket = () => {
  const [ticketDetails, setTicketDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const { state } = location;
  const ticketId = state?.ticketId;

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/GetTicketById/${ticketId}`);
        console.log("API response:", response.data);
        setTicketDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ticket details:", error);
        setLoading(false);
      }
    };
  
    if (ticketId) {
      fetchTicketDetails();
    }
  }, [ticketId]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <div className="py-4 pr-1 pl-4 whitespace-nowrap bg-white border-b border-neutral-500 border-opacity-10 max-md:pr-5">
          {text}
        </div>
      ),
    },
    {
      title: "Recorded By",
      dataIndex: "recordedBy",
      key: "recordedBy",
      render: (text) => (
        <div className="py-4 pr-1 pl-4 whitespace-nowrap bg-white border-b border-neutral-500 border-opacity-10 max-md:pr-5">
          {text}
        </div>
      ),
    },
    {
      title: "Resolution Details",
      dataIndex: "resolutionDetails",
      key: "resolutionDetails",
      render: (text) => (
        <div className="py-4 pr-1 pl-4 whitespace-nowrap bg-white border-b border-neutral-500 border-opacity-10 max-md:pr-5">
          {text}
        </div>
      ),
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (text) => (
        <div className="py-4 pr-1 pl-4 whitespace-nowrap bg-white border-b border-neutral-500 border-opacity-10 max-md:pr-5">
          {text}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <div className="py-4 pr-1 pl-4 whitespace-nowrap bg-white border-b border-neutral-500 border-opacity-10 max-md:pr-5">
          {text}
        </div>
      ),
    },
    {
      title: "Date Resolved",
      dataIndex: "dateResolved",
      key: "dateResolved",
      render: (text) => (
        <div className="py-4 pr-1 pl-4 whitespace-nowrap bg-white border-b border-neutral-500 border-opacity-10 max-md:pr-5">
          {text}
        </div>
      ),
    },
  ];


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!ticketDetails) {
    return <div>No ticket details found.</div>;
  }

  console.log("ticketDetails", ticketDetails);

  const data = ticketDetails.ticketAuditTrails.map((item) => ({
    recordedBy: item.recordedBy,
    resolutionDetails: item.resolutionDetails,
    assignedTo: item.assignedTo,
    status: item.status,
    id: item.id,
    dateResolved: moment(item.dateResolved).format("YYYY/MM/DD"),
  }));


  return (
    <div className="flex flex-col flex-wrap justify-center content-start py-6 rounded-3xl bg-stone-100">
      <div className="flex gap-2 justify-between items-center px-6 w-full max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex gap-2 items-center self-stretch my-auto text-base font-semibold leading-6 whitespace-nowrap text-neutral-600">
          <div className="self-stretch my-auto">Tickets</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c154d8841f585cbf3e0cb5a7536d530af74e2f624e3ed71fad0bd8d20294a6a1?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
            className="shrink-0 self-stretch my-auto w-6 aspect-square"
          />
          <div className="self-stretch px-4 py-1 bg-white rounded-2xl">{ticketDetails.ticket.id}</div>
        </div>
        <div className="flex flex-col justify-center self-stretch">
          <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
            ticket status
          </div>
          <div className="px-6 py-1 mt-2 text-base leading-6 whitespace-nowrap bg-white rounded-2xl text-slate-500 max-md:px-5">
            {ticketDetails.ticket.status}
          </div>
        </div>
        <div className="flex gap-2 justify-center self-stretch py-3 pr-4 pl-6 my-auto text-base font-semibold leading-6 text-white whitespace-nowrap rounded-3xl bg-slate-500">
          <div>Actions</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d9e9fb3b6e4fe1a5ddbd4d8754a42f4070d9010e315230bdfecd57661bc397bf?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
            className="shrink-0 self-start w-6 aspect-square"
          />
        </div>
      </div>
      <div className="flex flex-col self-center px-6 pt-4 pb-6 mt-6 w-full bg-white rounded-3xl max-w-[1088px] max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between w-full font-semibold max-md:flex-wrap max-md:max-w-full">
          <div className="text-3xl capitalize text-neutral-600">{ticketDetails.ticket.complaintSubject}</div>
          <div className="flex gap-2 my-auto text-base leading-6 text-slate-500">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2198e70221ffacf809da97fcee817d02ff0b027edb9275bc4d15791b393739f9?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
              className="shrink-0 self-start w-6 aspect-square"
            />
            <div className="underline">Update Ticket</div>
          </div>
        </div>
        <div className="flex flex-col px-4 pt-2 pb-4 mt-6 rounded-lg bg-stone-100 max-md:max-w-full">
          <div className="text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">Ticket Details</div>
          <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 w-full" />
          <div className="flex justify-between w-full gap-2 mt-4 max-md:flex-wrap">
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">created on</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">{ticketDetails.ticket.creationDate}</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">ticket category</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">{ticketDetails.ticket.ticketCategory.name}</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">ticket source</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">{ticketDetails.ticket.ticketSource}</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">Ticket priority</div>
              <div className="mt-2 text-base leading-6 text-orange-400">{ticketDetails.ticket.priority.priorityName}</div>
            </div>
          </div>
          <div className="flex gap-2 self-start mt-6 max-md:flex-wrap">
            <div className="flex flex-col justify-center whitespace-nowrap">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">department</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {ticketDetails.ticket.escalationMatrix.department.name}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">ticket subcategory</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">Plumbing</div>
            </div>
          </div>
          <div className="mt-6 text-xs font-medium tracking-wide uppercase text-neutral-400 max-md:max-w-full">description</div>
          <div className="mt-2 text-base leading-7 text-neutral-600 max-md:max-w-full">
            {ticketDetails.ticket.escalationMatrix.department.description}
          </div>
        </div>
        <div className="flex flex-col px-4 pt-2 pb-4 mt-6 rounded-lg bg-stone-100 w-full">
          <div className="text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">Customer Details</div>
          <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 w-full" />
          <div className="flex justify-between gap-2 mt-4 max-md:flex-wrap">
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">customer type</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">{ticketDetails.ticket.customerType}</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">customer reference</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">{ticketDetails.ticket.customerType}</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">FULL NAME</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">{ticketDetails.ticket.customerType}</div>
            </div>
          </div>
        </div>
        <Table
          columns={columns}
          className="mt-10"
          dataSource={data}
          rowKey={(record) => record.id}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default UpdateTicket;
