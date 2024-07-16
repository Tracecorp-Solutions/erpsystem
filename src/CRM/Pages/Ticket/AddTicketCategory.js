import * as React from "react";
import { Modal } from "antd";

const AddTicketCategory = ({ isModalVisible, handleCancel }) => {
  return (
    <Modal visible={isModalVisible} closable={false} footer={null} width={700}>
      <div className="flex flex-col justify-center items-center pt-8 text-base leading-6 bg-white rounded-3xl w-full">
        <div className="flex w-full justify-between">
          <div className="text-4xl font-semibold text-neutral-600 max-md:max-w-full">
            New Ticket Category
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ca01bd141ef3c6838d235f4d5f39236da6fb968e5e8a926fc57ed376a1cf296?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
            className="z-10 self-end w-8 aspect-square max-md:mr-2.5 cursor-pointer"
            onClick={handleCancel}
          />
        </div>
        <div className="mt-4 w-[500px] text-start font-semibold text-neutral-600 max-md:max-w-full">
          Category Name
        </div>
        <div className="justify-start items-start px-4 py-4 mt-2 max-w-full bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:pr-5">
          Enter Category Name
        </div>
        <div className="mt-4 w-[500px] text-start font-semibold text-neutral-600 max-md:max-w-full">
          Description
        </div>
        <div className="justify-start p-4 mt-2 max-w-full leading-7 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:max-w-full">
          Describe the priority ...
        </div>
        <div className=" self-stretch  py-6 mt-20 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex justify-between max-w-full max-md:flex-wrap">
            <button
              type="button"
              className="justify-center h-12 items-center px-8 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="justify-center px-8 h-12 font-semibold text-white rounded-3xl bg-slate-500 max-md:pr-7 max-md:pl-7"
            >
              Save Category
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddTicketCategory;
