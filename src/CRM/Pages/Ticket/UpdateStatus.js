import React from "react";
import { Select, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { Option } = Select;

const UpdateStatus = ({ handleUpdateStatusCancel }) => {
  const handleChangeStatus = (value) => {
    // Handle status change here
    console.log("Selected status:", value);
  };

  return (
    <div className="flex flex-col items-center self-stretch pb-5 text-base font-semibold leading-6 max-w-[700px] text-neutral-600">
      <div className="flex flex-col self-stretch pt-6 w-full text-4xl max-md:max-w-full">
        <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap max-md:max-w-full">
          <div>Update Ticket Status</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
            className="shrink-0 my-auto w-8 aspect-square cursor-pointer"
            onClick={handleUpdateStatusCancel}
            alt="Close"
          />
        </div>
        <div className="mt-6 w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
      </div>
      <div className="mt-8 text-start w-full my-5">Change Status</div>
      <Select
        defaultValue="In Progress"
        onChange={handleChangeStatus}
        className="w-full h-12"
      >
        <Option value="In Progress">In Progress</Option>
        <Option value="Resolved">Resolved</Option>
        <Option value="Closed">Closed</Option>
      </Select>
      <div className="mt-4 text-start my-5 w-full">Comments</div>
      <textarea
        placeholder="Leave your comment here ..."
        className="w-full h-20 p-2 resize-none border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
      ></textarea>
      <div className="flex justify-between mt-5 w-full max-w-[496px] max-md:flex-wrap max-md:max-w-full">
        <Button
          type="button"
          onClick={handleUpdateStatusCancel}
          className="px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-slate-500 border-neutral-500 border-opacity-30 text-white max-md:px-5"
        >
          Update Status
        </Button>
      </div>
    </div>
  );
};

export default UpdateStatus;
