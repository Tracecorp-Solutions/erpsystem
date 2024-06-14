import React, { useState } from "react";
import { Modal, Input, Button, Steps } from "antd";

const { Step } = Steps;

const NotificationOption = ({ children }) => {
  return (
    <div className="flex items-center mt-3">
      <input type="checkbox" id={children} name={children.toLowerCase()} />
      <label htmlFor={children} className="ml-2">
        {children}
      </label>
    </div>
  );
};

const ApplicationFormActions = ({
  isModalVisible,
  handleApproveApplication,
  setIsModalVisible,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission
    if (currentStep === 2) {
      handleApproveApplication(formData);
      setIsModalVisible(false);
    } else {
      nextStep();
    }
  };

  const steps = [
    {
      title: "Approval Confirmation",
      content: (
        <section className="flex flex-col justify-center self-center px-12 pt-8 pb-14 mt-4 max-w-full text-base leading-6 rounded-3xl bg-stone-100 text-neutral-600 w-[500px] max-md:px-5">
          <p>Are you sure you want to approve this application?</p>
          <div className="mt-6 font-semibold">Approval Date</div>
          <form className="flex gap-2 justify-between px-4 py-4 mt-2 whitespace-nowrap bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30">
            <label htmlFor="approval_date" className="sr-only">
              Approval Date
            </label>
            <time id="approval_date" dateTime="2024-06-08">
              2024-06-08
            </time>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c7515d0e48a8702b0a75494e4c7e35f39776b5b1f5e110f501c8205396c6041?apiKey=27ec22b9382040ef8580a5e340d3a921&"
              alt="Calendar Icon"
              className="shrink-0 self-start w-6 aspect-square"
            />
          </form>
        </section>
      ),
    },
    {
      title: "Schedule Installation",
      content: (
        <section className="flex flex-col justify-center self-center px-12 pt-8 pb-14 mt-4 max-w-full text-base leading-6 rounded-3xl bg-stone-100 text-neutral-600 w-[500px] max-md:px-5">
          <p className="leading-7">
            Would you like to notify the applicant about the approval?
          </p>
          <h2 className="mt-6 font-semibold">Notification Options</h2>
          <NotificationOption>Email</NotificationOption>
          <NotificationOption>SMS</NotificationOption>
          <NotificationOption>Both (Send both Email + SMS)</NotificationOption>
        </section>
      ),
    },
    {
      title: "Password",
      content: (
        <form className="flex flex-col justify-center self-center px-12 pt-8 pb-14 mt-4 max-w-full text-base leading-6 rounded-3xl bg-stone-100 text-neutral-600 w-[500px] max-md:px-5">
          <div>Would you like to schedule the installation now?</div>
          <div className="mt-6 font-semibold">Preferred Installation Date</div>
          <div className="flex gap-2 justify-between px-4 py-4 mt-2 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400">
            <label htmlFor="installationDate" className="sr-only">
              Preferred Installation Date
            </label>
            <input
              type="text"
              id="installationDate"
              placeholder="-- / -- / ----"
              aria-label="Preferred Installation Date"
              className="w-full border-none"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c7515d0e48a8702b0a75494e4c7e35f39776b5b1f5e110f501c8205396c6041?apiKey=27ec22b9382040ef8580a5e340d3a921&"
              alt="Calendar Icon"
              className="shrink-0 self-start w-6 aspect-square"
            />
          </div>
        </form>
      ),
    },
  ];

  return (
    <Modal
      title="Approve Application"
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={[
        <button
          type="button"
          className="justify-center items-center px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
          onClick={() => setIsModalVisible(false)}
        >
          Cancel
        </button>,
        currentStep === steps.length - 1 ? (
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Approve
          </Button>
        ) : (
          <button
            type="submit"
            className="justify-center px-8 py-4 font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5"
            onClick={handleSubmit}
          >
            Save Approval Date
          </button>
        ),
      ]}
    >
      <Steps current={currentStep}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[currentStep].content}</div>
    </Modal>
  );
};

export default ApplicationFormActions;
