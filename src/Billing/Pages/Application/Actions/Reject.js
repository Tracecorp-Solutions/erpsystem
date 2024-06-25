import React from "react";
import { Modal } from "antd";

const Reject = ({ isUpdateModalVisible, handleUpdateModalVisible }) => (
  <Modal
    title={<span style={{ fontFamily: 'Outfit, sans-serif',  fontSize: "1.25rem", color: '#9ca3af' }}>Reject Invoice</span>}
    visible={isUpdateModalVisible}
    onOk={handleUpdateModalVisible}
    onCancel={handleUpdateModalVisible}
    style={{
   
      fontFamily: "Outfit, sans-serif",
      color: "#9ca3af", 
    }}
    footer={[
      <button
        key="onCancel"
        className="px-4 py-2 text-white mr-6 bg-gray-300 rounded"
        onClick={handleUpdateModalVisible}
      >
        Cancel
      </button>,
      <button
        key="reject"
        className="px-4 py-2 text-white bg-red-500 rounded"
        onClick={handleUpdateModalVisible}
      >
        Reject Invoice
      </button>,
    ]}
  >
    <div className="flex flex-col justify-center text-base leading-6 bg-white rounded-3xl max-w-[820px]">
      <div className="flex flex-col pt-3 w-full text-4xl font-semibold text-neutral-600 max-md:max-w-full">
        <div className="mt-6 w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
      </div>
      {/* Further content */}
      <div className="flex flex-col justify-center self-center px-12 py-12 mt-12 max-w-full rounded-3xl bg-stone-100 text-neutral-600 w-[500px] max-md:px-5 max-md:mt-10">
        <div>Are you sure you want to reject this Invoice?</div>
        <div className="mt-6 font-semibold">Rejection Reason</div>
        {/* More content */}
        <div className="flex gap-2 mt-2">
          <div className="shrink-0 my-auto w-5 h-5 bg-white rounded-xl border-2 border-solid border-neutral-500 border-opacity-10" />
          <div>Changes in costs</div>
        </div>
        <div className="flex gap-2 mt-2">
          <div className="shrink-0 my-auto w-5 h-5 bg-white rounded-xl border-2 border-solid border-neutral-500 border-opacity-10" />
          <div>Errors in Specifications</div>
        </div>
        <div className="flex gap-2 mt-2">
          <div className="shrink-0 my-auto w-5 h-5 bg-white rounded-xl border-2 border-solid border-neutral-500 border-opacity-10" />
          <div>Unjustified costs or budget overruns</div>
        </div>
        {/* Final content */}
        <div className="mt-6 font-semibold">Additional Comments</div>
        <div className="items-start px-4 pt-3 pb-12 mt-2 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5">
          Add comment...
        </div>
      </div>
      {/* Ending content */}
    </div>
  </Modal>
);

export default Reject;
