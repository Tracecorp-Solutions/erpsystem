import React, { useState, useEffect } from "react";
import CreateEscalation from "./CreateEscalation";

function Escalation() {

  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  const handleUpdateModalVisible = () => {
    setIsUpdateModalVisible(true);
  };

  const handleCloseModalVisible = () => {
    setIsUpdateModalVisible(false);
   
  };

return (
  <>
   <div className="flex flex-col flex-wrap justify-center content-start py-6 rounded-3xl bg-stone-100">
    <div className="flex gap-2 px-6 text-base leading-6 text-neutral-600 max-md:flex-wrap max-md:px-5">
      <div className="font-semibold">Configuration</div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
        className="shrink-0 self-start w-6 aspect-square"
      />
      <div className="max-md:max-w-full">Escalation Matrix</div>
    </div>
    <div className="flex flex-col self-center p-6 mt-6 w-full bg-white rounded-3xl max-w-[1088px] max-md:px-5 max-md:max-w-full">
      <div className="flex gap-4 justify-between w-full font-semibold leading-[160%] max-md:flex-wrap max-md:max-w-full">
        <div className="text-4xl capitalize text-neutral-600">
          Escalation Levels
        </div>
        <div className="flex gap-2 justify-center px-6 py-3 my-auto text-base text-white rounded-3xl max-md:px-5">
              <button
                className="justify-center self-start px-3 py-3 mt-2.5 text-sm font-semibold text-white whitespace-nowrap rounded-3xl bg-blue-400 max-md:px-5"
                onClick={handleUpdateModalVisible}
              >
                 Add escalation level
              </button>
            </div>
      </div>
      <div className="flex gap-0 mt-4 max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col text-base leading-6 text-neutral-400">
          <div className="justify-center items-start py-5 pr-1 pl-4 text-xs font-medium tracking-wide uppercase bg-stone-100 text-neutral-400 max-md:pr-5">
            level name
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
            Level 1
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
            Level 2
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
            Level 3
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
            Level 4
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
            Level 5
          </div>
        </div>
        <div className="flex flex-col flex-1 text-base leading-6 text-neutral-400 max-md:max-w-full">
          <div className="justify-center items-start py-5 pr-1 pl-4 text-xs font-medium tracking-wide uppercase whitespace-nowrap bg-stone-100 max-md:pr-5 max-md:max-w-full">
            description
          </div>
          <div className="justify-center py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:max-w-full">
            Initial support team review
          </div>
          <div className="justify-center py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:max-w-full">
            Supervisor review and intervention
          </div>
          <div className="justify-center py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:max-w-full">
            Manager intervention for unresolved issues
          </div>
          <div className="justify-center py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:max-w-full">
            Department head review for critical issues
          </div>
          <div className="justify-center py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:max-w-full">
            Executive escalation for high-priority unresolved cases
          </div>
        </div>
        <div className="flex flex-col text-base leading-6 text-neutral-400">
          <div className="justify-center items-start py-5 pr-1 pl-4 text-xs font-medium tracking-wide uppercase whitespace-nowrap bg-stone-100 max-md:pr-5">
            criteria
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
            24 hours
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
            48 hours
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
            72 hours
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
            96 hours
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
            120 hours
          </div>
        </div>
        <div className="flex flex-col">
          <div className="justify-center px-14 py-5 text-xs font-medium tracking-wide uppercase whitespace-nowrap bg-stone-100 text-neutral-400 max-md:px-5">
            actiON
          </div>
          <div className="flex flex-col justify-center px-14 py-3 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:px-5">
            <div className="flex justify-center items-center px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/42a5d3f78babd3069a71e10613168804eab1586a963c62ad0e2851d7f0c22f93?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                className="w-5 aspect-square"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center px-14 py-3 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:px-5">
            <div className="flex justify-center items-center px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/42a5d3f78babd3069a71e10613168804eab1586a963c62ad0e2851d7f0c22f93?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                className="w-5 aspect-square"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center px-14 py-3 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:px-5">
            <div className="flex justify-center items-center px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a276679dc6f4ca845df4816266cf630d815a3ea84869045a6a0d96f20d5adbe?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                className="w-5 aspect-square"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center px-14 py-3 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:px-5">
            <div className="flex justify-center items-center px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a276679dc6f4ca845df4816266cf630d815a3ea84869045a6a0d96f20d5adbe?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                className="w-5 aspect-square"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center px-14 py-3 bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:px-5">
            <div className="flex justify-center items-center px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a276679dc6f4ca845df4816266cf630d815a3ea84869045a6a0d96f20d5adbe?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                className="w-5 aspect-square"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CreateEscalation
        isUpdateModalVisible={isUpdateModalVisible}
        // editingDepartment={editingDepartment}
        // handleSave={handleSave}
        handleCloseModalVisible={handleCloseModalVisible}
      />
  </>
  
);
}

export default Escalation;