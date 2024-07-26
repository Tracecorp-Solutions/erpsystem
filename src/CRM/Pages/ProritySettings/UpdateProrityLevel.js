import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Select, message } from "antd";
import axios from "axios";

const { Option } = Select;

const EditPriorityForm = ({
  isModalVisible,
  handleCancel,
  handleUpdatePriority,
  priorityData,
}) => {
  const [name, setName] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (priorityData) {
      setName(priorityData.priorityName);
      setColorCode(priorityData.colorCode);
      setDescription(priorityData.priorityDescription);
    }
  }, [priorityData]);

  const handleSavePriority = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/UpdatePriority`,
        {
          id: priorityData.id,
          priorityName: name,
          colorCode: colorCode,
          priorityDescription: description,
        }
      );

      if (response.status === 200) {
        message.success("Priority updated successfully!");
        handleUpdatePriority();
        handleCancel();
      } else {
        message.error("Failed to update priority");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Error:", error.message);
    }
  };

  return (
    <Modal
      visible={isModalVisible}
      closable={false}
      footer={null}
      width={700}
      bodyStyle={{ padding: 0 }}
    >
      <div className="flex flex-col justify-center items-center pt-8 text-base leading-6 bg-white rounded-3xl w-full">
        <div className="flex w-full justify-between">
          <div className="text-4xl font-semibold text-neutral-600 max-md:max-w-full">
            Edit Priority
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ca01bd141ef3c6838d235f4d5f39236da6fb968e5e8a926fc57ed376a1cf296?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
            className="z-10 self-end w-8 aspect-square max-md:mr-2.5 cursor-pointer"
            onClick={handleCancel}
            alt="Close modal"
          />
        </div>
        <div className="mt-4 w-[500px] text-start font-semibold text-neutral-600 max-md:max-w-full">
          Priority Name
        </div>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="justify-start items-start px-4 py-4 mt-2 max-w-full bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:pr-5"
          placeholder="Enter Priority Name"
        />
        <div className="mt-4 w-[500px] text-start font-semibold text-neutral-600 max-md:max-w-full">
          Color Code
        </div>
        <Select
          value={colorCode}
          onChange={(value) => setColorCode(value)}
          className="justify-between mt-2 max-w-full h-12 bg-white rounded-xl text-neutral-400 w-[500px] max-md:flex-wrap"
          placeholder="Select Color Code"
        >
          <Option value="Red">Red</Option>
          <Option value="Yellow">Yellow</Option>
          <Option value="Green">Green</Option>
          {/* Add more options as needed */}
        </Select>
        <div className="mt-4 w-[500px] text-start font-semibold text-neutral-600 max-md:max-w-full">
          Description
        </div>
        <Input.TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="justify-start p-4 mt-2 max-w-full leading-7 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:max-w-full"
          placeholder="Describe the priority ..."
          rows={4}
        />
        <div className="self-stretch py-6 mt-20 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex justify-between max-w-full max-md:flex-wrap">
            <Button
              type="button"
              className="justify-center h-12 items-center px-8 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleSavePriority}
              className="justify-center px-8 h-12 font-semibold rounded-3xl max-md:pr-7 bg-slate-500 max-md:pl-7"
            >
              Save Priority
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditPriorityForm;
