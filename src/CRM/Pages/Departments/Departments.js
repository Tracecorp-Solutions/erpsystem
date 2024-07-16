import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Menu, Dropdown } from "antd";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import CreateDepartments from "./CreateDepartments";

function Departments() {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  const handleUpdateModalVisible = () => {
    setIsUpdateModalVisible(true);
  };

  const handleCloseModalVisible = () => {
    setIsUpdateModalVisible(false);
  };

  return (
    <>
      <div className="flex flex-col flex-wrap justify-center content-start ml-4 py-6 rounded-3xl bg-stone-100">
        <div className="flex gap-2 px-6 text-base leading-6 whitespace-nowrap text-neutral-600 max-md:flex-wrap max-md:px-5">
          <div className="font-semibold">Configuration</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
            className="shrink-0 self-start w-6 aspect-square"
          />
          <div className="max-md:max-w-full">Departments</div>
        </div>
        <div className="flex flex-col self-center p-6 mt-6 w-full bg-white rounded-3xl max-w-[1088px] max-md:px-5 max-md:max-w-full">
          <div className="flex gap-4 justify-between w-full font-semibold leading-[160%] max-md:flex-wrap max-md:max-w-full">
            <div className="text-4xl capitalize text-neutral-600">
              Departments
            </div>
            <div className="flex gap-2 justify-center px-6 py-3 my-auto text-base text-white rounded-3xl max-md:px-5">
              <button
                className="justify-center self-start px-3 py-3 mt-2.5 text-sm font-semibold text-white whitespace-nowrap rounded-3xl bg-blue-400 max-md:px-5"
                onClick={handleUpdateModalVisible}
              >
                + Add department
              </button>
            </div>
          </div>
          <div className="flex gap-0 mt-4 max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col text-base leading-6 text-neutral-400">
              <div className="justify-center items-start py-5 pr-1 pl-4 text-xs font-medium tracking-wide uppercase bg-stone-100 text-neutral-400 max-md:pr-5">
                department name
              </div>
              <div className="justify-center items-start py-4 pr-1 pl-4 whitespace-nowrap bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
                Billing
              </div>
              <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
                Customer Service
              </div>
              <div className="justify-center items-start py-4 pr-1 pl-4 whitespace-nowrap bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
                Maintenance
              </div>
              <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
                IT Support
              </div>
              <div className="justify-center items-start py-4 pr-1 pl-4 whitespace-nowrap bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
                Operations
              </div>
            </div>
            <div className="flex flex-col flex-1 text-base leading-6 text-neutral-400">
              <div className="justify-center items-start py-5 pr-1 pl-4 text-xs font-medium tracking-wide uppercase whitespace-nowrap bg-stone-100 max-md:pr-5">
                description
              </div>
              <div className="justify-center py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10">
                Handles all billing and invoicing tasks
              </div>
              <div className="justify-center py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10">
                Manages customer inquiries and complaints
              </div>
              <div className="justify-center py-0.5 pr-1 pl-4 leading-7 bg-white border-b border-solid border-neutral-500 border-opacity-10">
                Oversees infrastructure and maintenance work.
              </div>
              <div className="justify-center py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10">
                Provides technical support and IT services
              </div>
              <div className="justify-center py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10">
                Manages day-to-day operations of the utility
              </div>
            </div>
            <div className="flex flex-col text-base leading-6 text-neutral-400">
              <div className="justify-center py-5 pr-1 pl-4 text-xs font-medium tracking-wide uppercase bg-stone-100 max-md:pr-5">
                Head of department
              </div>
              <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
                John Smith
              </div>
              <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
                Jane Doe
              </div>
              <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
                Mike Johnson
              </div>
              <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
                Emily Davis
              </div>
              <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
                Sarah Brown
              </div>
            </div>
            <div className="flex flex-col text-base leading-6 text-neutral-400">
              <div className="justify-center items-start py-5 pr-1 pl-4 text-xs font-medium tracking-wide uppercase bg-stone-100 max-md:pr-5">
                contact information
              </div>
              <div className="justify-center py-4 pr-1 pl-4 whitespace-nowrap bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
                j.smith@waterutility.com
              </div>
              <div className="justify-center py-4 pr-1 pl-4 whitespace-nowrap bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
                m.john@waterutility.com
              </div>
              <div className="justify-center py-4 pr-1 pl-4 whitespace-nowrap bg-white border-b border-solid border-neutral-500 border-opacity-10">
                john.smith@waterutility.com
              </div>
              <div className="justify-center py-4 pr-1 pl-4 whitespace-nowrap bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
                e.davis@waterutility.com
              </div>
              <div className="justify-center py-4 pr-1 pl-4 whitespace-nowrap bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
                s.brown@waterutility.com
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
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/50e6428b96d63f6b21d4c48dcee96062cea6e8ed997555383fb76d64fa2421aa?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                    className="w-5 aspect-square"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center px-9 py-3 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:px-5">
                <div className="flex justify-center items-center px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/50e6428b96d63f6b21d4c48dcee96062cea6e8ed997555383fb76d64fa2421aa?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                    className="w-5 aspect-square"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center px-9 py-3 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:px-5">
                <div className="flex justify-center items-center px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4907a1f674864e8ed68b4939d25812ca348ded2f8ef108901efc6b37a7eb5357?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                    className="w-5 aspect-square"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center px-9 py-3 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:px-5">
                <div className="flex justify-center items-center px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4907a1f674864e8ed68b4939d25812ca348ded2f8ef108901efc6b37a7eb5357?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                    className="w-5 aspect-square"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center px-9 py-3 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:px-5">
                <div className="flex justify-center items-center px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4907a1f674864e8ed68b4939d25812ca348ded2f8ef108901efc6b37a7eb5357?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                    className="w-5 aspect-square"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateDepartments
        isUpdateModalVisible={isUpdateModalVisible}
        handleCloseModalVisible={handleCloseModalVisible}
      />
    </>
  );
}

export default Departments;
