import React from "react";
import { Drawer } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function BillAdjustmentDrawer({
  setDrawerVisible,
  drawerVisible,
  adjustmentDetails
}) {

  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={() => setDrawerVisible(false)}
      visible={drawerVisible}
      width={500}
      style={{ height: "100vh", overflow: "auto" }}
    >
      <div className="px- text-end">
        <button
          type="button"
          onClick={() => setDrawerVisible(false)}
          className="relative rounded-md text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <span className="absolute -inset-2.5" />
          <span className="sr-only">Close panel</span>
          <XMarkIcon
            className="h-10 w-10"
            aria-hidden="true"
            style={{
              color: "#505050",
              marginRight: "15px",
            }}
          />
        </button>

        <div className="flex flex-col px-8 pt-5 pb-10 bg-white max-w-[550px] max-md:px-5">
          <div className="mt-8 text-2xl text-start font-semibold leading-10 text-neutral-600 max-md:max-w-full">
            Bill Adjustment Details
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="flex flex-col items-start px-6 py-4 rounded-lg bg-stone-100 max-md:px-5">
              <div className="text-xs text-start font-medium tracking-wide uppercase text-neutral-400">
                Customer Reference
              </div>
              <div className="mt-1 text-base font-semibold leading-6 text-neutral-600">
                {adjustmentDetails.custRef}
              </div>
            </div>
            <div className="flex flex-col items-start px-6 py-4 rounded-lg bg-stone-100 max-md:px-5">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                Transaction Code
              </div>
              <div className="mt-1 text-base font-semibold leading-6 text-neutral-600">
                {adjustmentDetails.transactionCode}
              </div>
            </div>

            <div className="flex flex-col items-start px-6 py-4 rounded-lg bg-stone-100 max-md:px-5">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                Document Number
              </div>
              <div className="mt-1 text-base font-semibold leading-6 text-neutral-600">
                {adjustmentDetails.documentNumber}
              </div>
            </div>
            <div className="flex flex-col items-start px-6 py-4 rounded-lg bg-stone-100 max-md:px-5">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                Effective Date
              </div>
              <div className="mt-1 text-base font-semibold leading-6 text-neutral-600">
                {adjustmentDetails.effectiveDate}
              </div>
            </div>

            <div className="flex flex-col items-start px-6 py-4 rounded-lg bg-stone-100 max-md:px-5">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                Amount
              </div>
              <div className="mt-1 text-base font-semibold leading-6 text-neutral-600">
                {adjustmentDetails.amount}
              </div>
            </div>
            <div className="flex flex-col items-start px-6 py-4 rounded-lg bg-stone-100 max-md:px-5">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              Total Amount
              </div>
              <div className="mt-1 text-base font-semibold leading-6 text-neutral-600">
              {adjustmentDetails.amount}
              </div>
            </div>

            {/* <div className="flex flex-col items-start px-6 py-4 rounded-lg bg-stone-100 max-md:px-5 col-span-2">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                Total Amount
              </div>
              <div className="mt-1 text-base font-semibold leading-6 text-neutral-600">
              {adjustmentDetails.amount}
              </div>
            </div> */}
            <div className="flex flex-col px-6 py-4 rounded-lg bg-stone-100 max-md:pl-5 col-span-2">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                Reason
              </div>
              <div className="mt-1 text-base leading-6 text-neutral-600">
                {adjustmentDetails.adjustmentReason}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
