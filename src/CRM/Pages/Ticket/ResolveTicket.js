import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import axios from "axios";

const ResolveTickets = ({ handleResolveCancel, ticketId, recordedBy, fetchTickets }) => {
  const [file, setFile] = useState(null);
  const [resolutionSummary, setResolutionSummary] = useState("");
  const [ticketDetails, setTicketDetails] = useState(null);
  const [fileKey, setFileKey] = useState(Date.now());

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/GetTicketById/${ticketId}`
        );
        console.log("API response:", response.data);
        setTicketDetails(response.data);
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      }
    };

    if (ticketId) {
      fetchTicketDetails();
    }
  }, [ticketId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      message.error("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("ReasonOfEscalation", resolutionSummary);
    formData.append("ticketId", ticketId);
    formData.append("recordedBy", recordedBy);
    formData.append(
      "DepartmentId",
      ticketDetails?.ticket?.escalationMatrix?.department?.id
    );

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/ResolveTicket`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );

      console.log("Resolve Ticket successful:", response.data);
      message.success("Ticket resolved successfully!");
      fetchTickets();
      handleResolveCancel();
      
      setFile(null);
      setResolutionSummary("");
      setTicketDetails(null);
      setFileKey(Date.now());
    } catch (error) {
      console.error("Error resolving ticket:", error);
      message.error("Failed to resolve ticket. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center self-stretch pb-5 text-base font-semibold leading-6 max-w-[700px]">
      <div className="flex flex-col self-stretch pt-6 w-full text-4xl text-neutral-600 max-md:max-w-full">
        <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap max-md:max-w-full">
          <div>Resolve Ticket</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
            className="shrink-0 my-auto w-8 aspect-square cursor-pointer"
            onClick={handleResolveCancel}
            alt="Close"
          />
        </div>
        <div className="mt-6 w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
      </div>
      <div className="mt-8 text-neutral-600 text-start w-full">Attach Job Card</div>
      <input
        type="file"
        onChange={handleFileChange}
        key={fileKey} // Key to force re-render
        className="py-2 pr-4 mt-2 max-w-full rounded-xl border border-solid border-neutral-500 border-opacity-30 w-[500px] max-md:flex-wrap"
      />
      <div className="mt-4 text-neutral-600 text-start w-full">Resolution Summary</div>
      <textarea
        className="p-4 mt-2 w-full leading-7 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 max-w-[500px] text-neutral-400 max-md:max-w-full"
        value={resolutionSummary}
        onChange={(e) => setResolutionSummary(e.target.value)}
        placeholder="Leave your comment here ..."
        rows={3}
      />
      <div className="flex justify-between mt-5 w-full max-w-[496px] max-md:flex-wrap max-md:max-w-full">
        <Button
          type="ghost"
          onClick={handleResolveCancel}
          className="px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
        >
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          className="px-8 py-4 font-semibold text-white rounded-3xl bg-slate-500 max-md:px-6"
        >
          Resolve Ticket
        </Button>
      </div>
    </div>
  );
};

export default ResolveTickets;
