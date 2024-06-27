import React from "react";
import { Modal } from "antd";

const ReconcileInvoice = ({ CanceReconcileInvoice, isReconcileInvoice }) => {
  return (
    <Modal
      visible={isReconcileInvoice}
      closable={false}
      width={800}
      footer={null}
    >
      <div className="flex flex-col pb-20 max-w-[820px]">
        <div className="flex flex-col pt-6 w-full text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
          <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap max-md:max-w-full">
            <div>Reconcile Invoice</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
              className="shrink-0 my-auto w-8 aspect-square cursor-pointer"
              onClick={CanceReconcileInvoice}
            />
          </div>
          <div className="mt-6 w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
        </div>

        <div className="flex flex-col self-center pt-4 pb-5 mt-8 w-full bg-white rounded-3xl max-w-[600px] max-md:max-w-full">
          <div className="flex gap-5 justify-between py-4 pr-6 text-xs font-medium tracking-wide uppercase rounded-3xl bg-stone-100 text-neutral-400 max-md:pr-6 pl-4">
            <div className="w-1/4">PAYMENT REF.</div>
            <div className="w-1/4 text-right">Total INVOICED</div>
            <div className="w-1/4 text-right">Total PAID</div>
            <div className="w-1/4 text-right">Status</div>
          </div>

          <div className="flex justify-between py-2 pr-6 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:pr-5 pl-6 max-md:max-w-full">
            <div className="w-1/4">NC009</div>
            <div className="text-right">240,000</div>
            <div className="w-1/4 text-right">240,000</div>
            <div className="w-1/4 text-right text-neutral-400">Fully paid</div>
          </div>

          <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        </div>
      </div>
    </Modal>
  );
};

export default ReconcileInvoice;
