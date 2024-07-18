import React from "react";
import { Modal, Form, Input, Select, Button } from "antd";

const { Option } = Select;

const AddProrityLevel = ({ handleCancel, visible, onFinish, reloadData }) => {

  return (
    <Modal
      title={
        <div className="flex gap-5 justify-between items-center">
          <div>New Priority Level</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
            className="shrink-0 my-auto w-8 aspect-square cursor-pointer"
            alt="Priority Level Icon"
            onClick={handleCancel}
          />
        </div>
      }
      visible={visible}
      closable={false}
      footer={null}
    >
      <div className="flex flex-col items-center pb-10 text-base font-semibold leading-6 max-w-[820px] text-neutral-600">
        <Form
          name="addPriorityForm"
          onFinish={(values) => onFinish(values, handleCancel, reloadData)}
          className="w-full"
        >
          <div className="mt-8 text-start w-full">Priority Level Name</div>
          <Form.Item
            name="priorityLevelName"
            rules={[{ required: true, message: "Please enter level name!" }]}
            className="justify-center items-start mt-2 max-w-full bg-white rounded-xl text-neutral-400 w-[500px] max-md:pr-5"
          >
            <Input placeholder="Enter Level Name" />
          </Form.Item>
          <div className="mt-4 text-start w-full">Color Code</div>
          <Form.Item
            name="colorCode"
            rules={[{ required: true, message: "Please choose a color!" }]}
            className="justify-between mt-2 max-w-full bg-white rounded-xl text-neutral-400 w-[500px] max-md:flex-wrap"
          >
            <Select placeholder="Choose Color" className="w-full">
              <Option value="Red">Red</Option>
              <Option value="Yellow">Yellow</Option>
              <Option value="Green">Green</Option>
            </Select>
          </Form.Item>
          <div className="mt-2 text-start w-full">Description</div>
          <Form.Item
            name="description"
            className="justify-center mt-2 max-w-full leading-7 bg-white rounded-xl text-neutral-400 w-[500px] max-md:max-w-full"
          >
            <Input.TextArea
              placeholder="Describe the priority ..."
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>
          <div className="flex justify-center items-center px-16 py-6 text-base leading-6 bg-stone-100 max-w-[820px] max-md:px-5">
            <div className="flex gap-4 max-w-full w-[496px] max-md:flex-wrap">
              <button type="button" onClick={handleCancel} className="justify-center items-center px-8 py-2 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5">
                Cancel
              </button>
              <button type="submit" className="justify-center items-center px-8 py-2  font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5">
                Save Priority
              </button>
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddProrityLevel;
