import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MaterialItem from "./MaterialItem";


function AddMaterials() {
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleUpdateModalVisible = () => {
    setIsUpdateModalVisible(!isUpdateModalVisible);
  };


  return (
    <>
      <div>
        <div className="flex flex-col flex-wrap justify-center content-start py-12 px-12 rounded-3xl bg-stone-100">
          <div className="flex gap-2 items-center px-6 text-base font-semibold leading-6 text-neutral-600 max-md:flex-wrap max-md:px-5">
            <div className="self-stretch my-auto">Applications</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
              className="shrink-0 self-stretch my-auto w-6 aspect-square"
            />
            <div className="justify-center self-stretch px-4 py-1 whitespace-nowrap bg-white rounded-2xl">
              APP567890
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
              className="shrink-0 self-stretch my-auto w-6 aspect-square"
            />
            <div className="self-stretch my-auto max-md:max-w-full">
              Materials Expenditure
            </div>
          </div>
          <div className="flex flex-col self-center p-6 mt-6 w-full bg-white rounded-3xl max-w-[1088px] max-md:px-5 max-md:max-w-full">
            <div className="flex gap-4 justify-between w-full font-semibold leading-[160%] max-md:flex-wrap max-md:max-w-full">
              <div className="text-4xl capitalize text-neutral-600">
                Materials Expenditure
              </div>
              <div className="flex gap-2 justify-center px-4 py-3 my-auto text-base text-white rounded-3xl  max-md:px-5">
                <button
                  className="justify-center self-start px-3 py-3 mt-2.5 text-sm font-semibold text-white whitespace-nowrap rounded-3xl bg-blue-400 max-md:px-5"
                  onClick={handleUpdateModalVisible}
                >
                  + Add Invoice Item
                </button>
              </div>
            </div>
            <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
            <div className="flex gap-5 justify-between px-6 py-3.5 mt-4 w-full text-xs font-medium tracking-wide uppercase rounded-3xl bg-stone-100 text-neutral-400 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
              <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-4">
                  <div className="shrink-0 w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
                  <div className="my-auto">ITEM NAME</div>
                </div>
                <div className="my-auto">UNIT COST</div>
              </div>
              <div className="flex gap-5 justify-between my-auto">
                <div>qUANTITY</div>
                <div>Amount due</div>
              </div>
            </div>
            <div className="flex gap-5 justify-between px-6 py-2 mt-2 w-full rounded-3xl max-md:flex-wrap max-md:px-5 max-md:max-w-full">
              <div className="flex gap-5 justify-between my-auto text-base leading-6 text-neutral-600 max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-4 bg-white">
                  <div className="shrink-0 my-auto w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
                  <div>Water pipes | 20 meters</div>
                </div>
                <div>80,000</div>
              </div>
              <div className="flex gap-5 justify-between items-center">
                <div className="self-stretch my-auto text-base leading-6 text-neutral-600">
                  3
                </div>
                <div className="self-stretch my-auto text-base leading-6 text-neutral-600">
                  240,000
                </div>
                <div className="flex justify-center items-center self-stretch px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/642b627c42db96f49082a88ee3bef6f38e4f7a9a7fb0c96751f1e292049fa5b8?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                    className="w-5 aspect-square"
                  />
                </div>
              </div>
            </div>
            <div className="shrink-0 mt-2 h-px border border-solid bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
          </div>
          <div className="justify-center self-end px-8 py-4 mt-12 mr-6 text-base font-semibold leading-6 text-white rounded-3xl bg-blue-400 max-md:px-5 max-md:mt-10 max-md:mr-2.5">
            Save Expenditure
          </div>
        </div>
      </div>
      {isUpdateModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-[70%] max-w-xl">
            <MaterialItem />
            <button
              className="mt-4 px-4 py-2 text-white bg-red-500 rounded"
              onClick={handleUpdateModalVisible}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddMaterials;
