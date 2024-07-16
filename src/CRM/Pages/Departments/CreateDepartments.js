import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai"; // Importing the X icon from React Icons
import { Modal, message } from "antd";

function CreateDepartments({ isUpdateModalVisible, handleCloseModalVisible }) {
  const navigate = useNavigate();

  return (
    <Modal visible={isUpdateModalVisible} closable={false} footer={null}>
      <div className="flex flex-col justify-center items-center pt-8 text-base leading-6 bg-white rounded-3xl max-w-[820px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ca01bd141ef3c6838d235f4d5f39236da6fb968e5e8a926fc57ed376a1cf296?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
          className="z-10 self-end mr-12 w-8 aspect-square max-md:mr-2.5"
        />
        <div className="text-4xl font-semibold text-neutral-600 max-md:max-w-full">
          New Department
        </div>
        <div className="mt-4 font-semibold text-neutral-600 max-md:max-w-full">
          Department Name
        </div>
        <div className="justify-center items-start px-4 py-4 mt-2 max-w-full bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:pr-5">
          Enter Department Name
        </div>
        <div className="mt-4 font-semibold text-neutral-600 max-md:max-w-full">
          Description
        </div>
        <div className="justify-center p-4 mt-2 max-w-full leading-7 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:max-w-full">
          Describe the department ...
        </div>
        <div className="mt-4 font-semibold text-neutral-600 max-md:max-w-full">
          Assign head of department
        </div>
        <div className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap">
          <div>Assign staff</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
            className="shrink-0 self-start w-6 aspect-square"
          />
        </div>
        <div className="flex flex-col mt-2 max-w-full rounded-xl border border-solid border-neutral-500 border-opacity-10 w-[500px]">
          <div className="flex gap-0 justify-between px-6 py-3 max-md:flex-wrap max-md:px-5">
            <div className="flex flex-1 gap-2 font-medium text-neutral-600">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/703fc36b56538902932d032c24d9a12e0dd63cde25c6b0bd1311339d9833158d?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                className="shrink-0 my-auto w-5 aspect-square"
              />
              <div>Emily Davis</div>
            </div>
            <div className="flex flex-1 gap-2 whitespace-nowrap text-neutral-400">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/39fab73e74614fab5c9f96a47f18eafcc9472e824b09bebe58a5b17be0346a04?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                className="shrink-0 my-auto w-5 aspect-square"
              />
              <div>e.davis@waterutility.com</div>
            </div>
          </div>
          <div className="flex gap-0 justify-between px-6 py-3 max-md:flex-wrap max-md:px-5">
            <div className="flex flex-1 gap-2 font-medium text-neutral-600">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/703fc36b56538902932d032c24d9a12e0dd63cde25c6b0bd1311339d9833158d?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                className="shrink-0 my-auto w-5 aspect-square"
              />
              <div>Mike Johnson</div>
            </div>
            <div className="flex flex-1 gap-2 whitespace-nowrap text-neutral-400">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/39fab73e74614fab5c9f96a47f18eafcc9472e824b09bebe58a5b17be0346a04?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                className="shrink-0 my-auto w-5 aspect-square"
              />
              <div>m.johnson@waterutility.com</div>
            </div>
          </div>
          <div className="flex flex-col justify-center px-6 py-3 border-t border-solid bg-stone-100 border-neutral-500 border-opacity-10 text-neutral-600 max-md:px-5 max-md:max-w-full">
            <div className="flex gap-2 max-md:flex-wrap">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8cc1ff5c871a6efdf5be392c11ac27233c6228fd8cbb524c554fe4283d90d07?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                className="shrink-0 my-auto w-5 aspect-square"
              />
              <div className="max-md:max-w-full">New User</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center self-stretch px-16 py-6 mt-32 w-full bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-4 max-w-full w-[496px] max-md:flex-wrap">
            <div className="justify-center items-center px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5">
              Cancel
            </div>
            <div className="justify-center px-8 py-4 font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5">
              Add Department
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CreateDepartments;
