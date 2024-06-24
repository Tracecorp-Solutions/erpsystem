import React, { useEffect, useState } from "react";
import { Modal, Select } from "antd";
import axios from "axios";

const { Option } = Select;

const UpdateAuthorizeModal = ({
  isUpdateModalVisible,
  handleUpdateModalVisible,
  fullName,
  applicationNumberDisplay,
  applicationData
}) => {

  const [customerCategories, setCustomerCategories] = useState([]);
  const [customerTypes, setCustomerTypes] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/GetCustomerCategories`)
      .then((response) => {
        setCustomerCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer categories:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/GetCustomerTypes`)
      .then((response) => {
        setCustomerTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer types:", error);
      });
  }, []);

  return (
    <Modal
      visible={isUpdateModalVisible}
      closable={false}
      footer={null}
      width={800}
    >
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
        <div className="justify-between px-20 pt-4 pb-5 mt-4 w-full">
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
                <div className="mt-2">{applicationData.user.fullName}</div>
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
          {customerTypes.map((type) => (
            <Option key={type.id} value={type.name}>
              {type.name}
            </Option>
          ))}
        </Select>
        <div className="mt-4 text-base font-bold text-xl leading-6 text-neutral-600 max-md:max-w-full">
          Proposed Category
        </div>
        <Select
          defaultValue="Commercial"
          className="flex gap-2 justify-between h-14 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap"
          dropdownClassName="w-full"
        >
          {customerCategories.map((category) => (
            <Option key={category.id} value={category.name}>
              {category.name}
            </Option>
          ))}
        </Select>
        <div className="flex justify-center items-center self-stretch px-16 py-6 mt-20 w-full text-base font-semibold leading-6 text-white bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <button className="justify-center items-center px-8 py-4 max-w-full rounded-3xl bg-slate-500 w-[500px] max-md:px-5">
            Update and Authorize Connection
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateAuthorizeModal;
