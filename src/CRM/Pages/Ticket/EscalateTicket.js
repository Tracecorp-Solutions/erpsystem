import React, { useState } from "react";
import { Select, Button, Input, message } from "antd";
import axios from "axios";

const { Option } = Select;

const EscalateTicket = ({ handleEscalateCancel, ticketId, recordedBy, departments, fetchTickets }) => {
  const [selectedLevel, setSelectedLevel] = useState(undefined);
  const [comments, setComments] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedLevel) {
      message.error("Please select a department to escalate to.");
      return;
    }

    const escalateData = {
      departmentId: selectedLevel,
      reasonOfEscalation: comments,
      ticketId: ticketId,
      recordedBy: recordedBy
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/EscalateTicket`,
        escalateData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Escalation successful:", response.data);
      message.success("Ticket escalated successfully!");

      setSelectedLevel(undefined);
      setComments("");

      fetchTickets();
      handleEscalateCancel();
    } catch (error) {
      console.error("Error escalating ticket:", error);
      message.error("Failed to escalate ticket. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center self-stretch pb-5 text-base font-semibold leading-6 max-w-[700px] text-neutral-600">
      <div className="flex flex-col self-stretch pt-6 w-full text-4xl max-md:max-w-full">
        <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap max-md:max-w-full">
          <div>Escalate Ticket</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
            className="shrink-0 my-auto w-8 aspect-square cursor-pointer"
            onClick={handleEscalateCancel}
            alt="Cancel"
          />
        </div>
        <div className="mt-6 w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
      </div>
      <div className="mt-8 text-start w-full my-2">Escalate To</div>
      <Select
        value={selectedLevel} // Use value prop to control the component
        placeholder="Select department"
        style={{ width: "100%" }}
        className="h-12"
        onChange={(value) => setSelectedLevel(value)}
      >
        {departments.map((dept) => (
          <Option key={dept.id} value={dept.id}>
            {dept.name}
          </Option>
        ))}
      </Select>
      <div className="mt-4 text-start w-full my-2">Comments</div>
      <Input.TextArea
        rows={4}
        placeholder="Leave your comment here ..."
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />
      <div className="flex justify-between mt-10 w-full max-w-[496px] max-md:flex-wrap max-md:max-w-full">
        <Button
          type="button"
          onClick={handleEscalateCancel}
          className="px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={handleFormSubmit}
          className="px-8 py-4 font-semibold text-white rounded-3xl bg-slate-500 max-md:px-6"
        >
          Escalate Ticket
        </Button>
      </div>
    </div>
  );
};

export default EscalateTicket;
