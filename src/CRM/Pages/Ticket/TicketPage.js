import React, { useState } from "react";
import AddTicketCategory from "./AddTicketCategory";

const TicketPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex flex-col flex-wrap justify-center content-start py-6 rounded-3xl bg-stone-100">
      <div className="flex gap-2 px-6 text-base leading-6 text-neutral-600 max-md:flex-wrap max-md:px-5">
        <div className="font-semibold">Configuration</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
          className="shrink-0 self-start w-6 aspect-square"
        />
        <div className="max-md:max-w-full">Ticket Categories</div>
      </div>
      <div className="flex flex-col self-center p-6 mt-6 w-full bg-white rounded-3xl  max-md:px-5 w-full">
        <div className="flex gap-4 justify-between w-full font-semibold leading-[160%] max-md:flex-wrap max-md:max-w-full">
          <div className="text-4xl capitalize text-neutral-600">
            Ticket Categories
          </div>
          <button
            type="button"
            className="flex gap-2 justify-center px-6 py-3 my-auto text-base text-white rounded-3xl bg-slate-500 max-md:px-5"
            onClick={showModal}
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a6fbf858a262ca173836b28ea1635646ad60c82456acd8cee2b922f3be3bea7?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
              className="shrink-0 self-start w-6 aspect-square"
            />
            <div>Add Category</div>
          </button>
        </div>
        <div className="flex gap-0 mt-4 max-md:flex-wrap max-md:max-w-full">
          <div className="flex flex-col flex-1 text-base leading-6 text-neutral-400">
            <div className="justify-center items-start py-5 pr-1 pl-4 text-xs font-medium tracking-wide uppercase bg-stone-100 text-neutral-400 max-md:pr-5">
              category name
            </div>
            <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
              Billing Issue
            </div>
            <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
              Service Request
            </div>
            <div className="justify-center items-start py-4 pr-1 pl-4 whitespace-nowrap bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
              Maintenance
            </div>
            <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
              IT Support
            </div>
            <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
              General Inquiry
            </div>
          </div>
          <div className="flex flex-col text-base leading-6 text-neutral-400 max-md:max-w-full">
            <div className="justify-center items-start py-5 pr-1 pl-4 text-xs font-medium tracking-wide uppercase whitespace-nowrap bg-stone-100 max-md:pr-5 max-md:max-w-full">
              description
            </div>
            <div className="justify-center py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:max-w-full">
              Issues related to customer billing
            </div>
            <div className="justify-center py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:max-w-full">
              Requests for new services or upgrades
            </div>
            <div className="justify-center py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:max-w-full">
              Issues related to infrastructure
            </div>
            <div className="justify-center py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:max-w-full">
              Technical support for customers
            </div>
            <div className="justify-center py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:max-w-full">
              General questions and information
            </div>
          </div>
          <div className="flex flex-col flex-1 text-base leading-6 whitespace-nowrap text-neutral-400">
            <div className="justify-center items-start py-5 pr-1 pl-4 text-xs font-medium tracking-wide uppercase bg-stone-100 max-md:pr-5">
              priority
            </div>
            <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
              High
            </div>
            <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
              Medium
            </div>
            <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
              High
            </div>
            <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
              Low
            </div>
            <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
              Low
            </div>
          </div>
          <div className="flex flex-col">
            <div className="justify-center px-7 py-5 text-xs font-medium tracking-wide uppercase whitespace-nowrap bg-stone-100 text-neutral-400 max-md:px-5">
              actiON
            </div>
            <div className="flex flex-col justify-center px-9 py-3 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:px-5">
              <div className="flex justify-center items-center px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/bcfb46429f3f825260e04ab588947b4048cf6dd0303ffbcc991d1b76790e3fcf?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
                  className="w-5 aspect-square"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center px-9 py-3 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:px-5">
              <div className="flex justify-center items-center px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/bcfb46429f3f825260e04ab588947b4048cf6dd0303ffbcc991d1b76790e3fcf?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
                  className="w-5 aspect-square"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center px-9 py-3 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:px-5">
              <div className="flex justify-center items-center px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/7dbf8806e95bce2fbed7ce7b2f5db807a8837b3f5d8b859cf52ff980db0ec52c?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
                  className="w-5 aspect-square"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center px-9 py-3 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:px-5">
              <div className="flex justify-center items-center px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/7dbf8806e95bce2fbed7ce7b2f5db807a8837b3f5d8b859cf52ff980db0ec52c?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
                  className="w-5 aspect-square"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center px-9 py-3 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:px-5">
              <div className="flex justify-center items-center px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/7dbf8806e95bce2fbed7ce7b2f5db807a8837b3f5d8b859cf52ff980db0ec52c?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
                  className="w-5 aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddTicketCategory isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
    </div>
  );
};

export default TicketPage;
