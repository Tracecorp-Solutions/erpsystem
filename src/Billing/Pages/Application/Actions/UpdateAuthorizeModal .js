import React from "react";
import { Modal, Select } from "antd";

const { Option } = Select;

const UpdateAuthorizeModal = ({
  isUpdateModalVisible,
  handleUpdateModalVisible,
  fullName,
  applicationNumberDisplay,
}) => {

    const username = sessionStorage.getItem("fullname");

    console.log("username", username);    

  return (
    <Modal visible={isUpdateModalVisible} closable={false} footer={null}>
      <div className="flex flex-col justify-center items-center bg-white rounded-3xl w-full">
        <div className="flex flex-col self-stretch pt-6 w-full text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
          <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap max-md:max-w-full">
            <div>Authorize Connection</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
              className="shrink-0 my-auto w-8 aspect- cursor-pointer"
              onClick={handleUpdateModalVisible}
            />
          </div>
          <div className="mt-6 w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
        </div>
        <div className="justify-between px-5 pt-4 pb-5 mt-4 max-w-full w-[500px]">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[35%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow text-base leading-6 text-neutral-600 max-md:mt-10">
                <div className="font-semibold">Application Number</div>
                <div className="mt-2">{applicationNumberDisplay}</div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[28%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow text-base leading-6 text-neutral-600 max-md:mt-10">
                <div className="font-semibold">Applicant Name</div>
                <div className="mt-2">{fullName}</div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[38%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow text-base leading-6 text-neutral-600 max-md:mt-10">
                <div className="font-semibold">Surveyor’s Name</div>
                <div className="mt-2">{username}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-2xl font-semibold capitalize text-neutral-600 max-md:max-w-full">
          Update Connection Details
        </div>
        <div className="shrink-0 mt-4 max-w-full h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 w-[500px]" />
        <div className="mt-4 text-base font-bold text-xl leading-6 text-neutral-600 max-md:max-w-full">
          Connection Type
        </div>
        <Select
          defaultValue="Prepaid"
          className="flex gap-2 justify-between h-14 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap"
          dropdownClassName="w-full"
        >
          <Option value="prepaid">Prepaid</Option>
          <Option value="postpaid">Postpaid</Option>
          {/* Add more options as needed */}
        </Select>
        <div className="mt-4 text-base font-bold text-xl leading-6 text-neutral-600 max-md:max-w-full">
          Proposed Category
        </div>
        <Select
          defaultValue="Commercial"
          className="flex gap-2 justify-between h-14 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap"
          dropdownClassName="w-full"
        >
          <Option value="prepaid">Prepaid</Option>
          <Option value="commercial">Commercial</Option>
        </Select>
        <div className="mt-4 text-base font-bold text-xl leading-6 text-neutral-600 max-md:max-w-full">
          Authorized By
        </div>
        <Select
          defaultValue="Choose authority"
          className="flex gap-2 justify-between h-14 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap"
          dropdownClassName="w-full"
        >
          <Option value="authority1">Authority 1</Option>
          <Option value="authority2">Authority 2</Option>
          <Option value="authority3">Authority 3</Option>
        </Select>
        <div className="flex justify-center items-center self-stretch px-16 py-6 mt-10 w-full text-base font-semibold leading-6 text-white bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <button className="justify-center items-center px-8 py-4 max-w-full rounded-3xl bg-slate-500 w-[500px] max-md:px-5">
            Update and Authorize Connection
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateAuthorizeModal;
