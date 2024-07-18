import React, { useState, useEffect } from "react";
import { Modal, message, Input, Button, Select } from "antd";

function CreateEscalation({
  isUpdateModalVisible,
  handleCloseModalVisible,
}) {
  const [currentStep, setCurrentStep] = React.useState(1);

  const handleSaveFirstForm = () => {
    setCurrentStep(2); // Move to the second step when the first form is saved
  };

  return (
    <>
     <Modal visible={isUpdateModalVisible} closable={false} footer={null}>
     {currentStep === 1 && (
       <div className="flex flex-col justify-center items-center bg-white rounded-3xl max-w-[720px] h-[calc(100vh - 100px)] overflow-y-auto">
          <div className="flex flex-col self-stretch pt-6 w-full text-2xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
            <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap max-md:max-w-full">
              <div>New Escalation Level</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                className="shrink-0 my-auto w-8 aspect-square"
              />
            </div>
            <div className="mt-6 w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
          </div>
          <div className="justify-between px-5 pt-4 pb-5 mt-4 max-w-full w-[500px]">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow font-semibold max-md:mt-4">
                  <div className="justify-center items-center self-center px-5 py-3 w-12 h-12 text-base leading-6 text-white whitespace-nowrap rounded-3xl bg-slate-500 max-md:px-5">
                    1
                  </div>
                  <div className="mt-2 text-sm text-center text-neutral-600">
                    Criteria Settings
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[49%] max-md:ml-0 max-md:w-full">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8dd15a007798c0ac8b43df978931898837b98a2f2a6986c39022ce4de490c93?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                  className="self-stretch mt-6 w-full border-solid aspect-[100] border-[3px] border-neutral-500 border-opacity-30 stroke-[3px] stroke-neutral-500 stroke-opacity-30 max-md:mt-10"
                />
              </div>
              <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow text-neutral-400 max-md:mt-4">
                  <div className="justify-center items-center self-center px-5 py-3 w-12 h-12 text-base font-semibold leading-6 whitespace-nowrap rounded-3xl bg-stone-200">
                    2
                  </div>
                  <div className="mt-2 text-sm text-center">
                    Notification Setup
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Department
          </div>
          <div className="justify-center items-start px-4 py-4 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:pr-5">
            Chose the Department
          </div>
          <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Ticket Catergory
          </div>
          <div className="justify-center items-start px-4 py-4 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:pr-5">
            Choose Catergory
          </div>
          <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Priority
          </div>
          <div className="justify-center items-start px-4 py-4 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:pr-5">
            Assign priority
          </div>
          <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Level Name
          </div>
          <div className="justify-center items-start px-4 py-4 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:pr-5">
            Enter Level Name
          </div>
          <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Description
          </div>
          <div className="justify-center p-4 mt-2 max-w-full text-base leading-7 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:max-w-full">
            Describe the level ...
          </div>
          <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Time Threshold
          </div>
          <div className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap">
            <div>Choose Time period</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
              className="shrink-0 self-start w-6 aspect-square"
            />
          </div>
          <div className="flex justify-center items-center self-stretch px-8 py-6 mt-6 w-full text-base leading-6 bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-4 max-w-full w-[496px] max-md:flex-wrap">
              <div className="justify-center items-center px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5">
                Cancel
              </div>
              <div
                onClick={handleSaveFirstForm}
                className="justify-center items-center px-8 py-4 font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5 cursor-pointer"
              >
                Save Level
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="flex flex-col items-center pb-16 max-w-[820px]">
          <div className="flex flex-col self-stretch pt-6 w-full text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
            <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap max-md:max-w-full">
              <div>New Escalation Level</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                className="shrink-0 my-auto w-8 aspect-square"
              />
            </div>
            <div className="mt-6 w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
          </div>
          <div className="justify-between px-5 pt-4 pb-5 mt-4 max-w-full w-[500px]">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow max-md:mt-4">
                  <div className="flex justify-center items-center self-center px-3 w-12 h-12 bg-lime-400 rounded-3xl">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff8638ff9fab467bad1cb0313acaf5a3ce156fc9accd2302209d4e76b24f0549?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                      className="w-full aspect-square"
                    />
                  </div>
                  <div className="mt-2 text-sm font-semibold text-center text-neutral-600">
                    Criteria Settings
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[49%] max-md:ml-0 max-md:w-full">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8dd15a007798c0ac8b43df978931898837b98a2f2a6986c39022ce4de490c93?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                  className="self-stretch mt-6 w-full border-solid aspect-[100] border-[3px] border-neutral-500 border-opacity-30 stroke-[3px] stroke-neutral-500 stroke-opacity-30 max-md:mt-10"
                />
              </div>
              <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow font-semibold max-md:mt-4">
                  <div className="justify-center items-center self-center px-5 py-3 w-12 h-12 text-base leading-6 text-white whitespace-nowrap rounded-3xl bg-slate-500">
                    2
                  </div>
                  <div className="mt-2 text-sm text-center text-neutral-600">
                    Notification Setup
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Notification Type
          </div>
          <div className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full text-base leading-6 whitespace-nowrap bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:flex-wrap">
            <div>Email</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
              className="shrink-0 self-start w-6 aspect-square"
            />
          </div>
          <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Recipients
          </div>
          <div className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:flex-wrap">
            <div>Support Team Members</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
              className="shrink-0 self-start w-6 aspect-square"
            />
          </div>
          <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Email Template
          </div>
          <div className="justify-center p-4 mt-2 max-w-full text-base leading-7 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:max-w-full">
            A ticket has been escalated to Level 2. Immediate attention is required.
          </div>
          <div className="flex justify-center items-center self-stretch px-16 py-6 mt-16 w-full text-base leading-6 bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-4 max-w-full w-[496px] max-md:flex-wrap">
              <div className="justify-center items-center px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5">
                Cancel
              </div>
              <div
                onClick={handleSaveFirstForm}
                className="justify-center items-center px-8 py-4 font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5 cursor-pointer"
              >
                Save Level
              </div>
            </div>
          </div>
        </div>
      )}
     </Modal>
     
    </>
  );
}

export default CreateEscalation;
