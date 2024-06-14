import React, { useState } from "react";
import { Modal, DatePicker, Button, Steps } from "antd";

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
    if (currentStep === steps.length - 1) {
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
          <form>
            <label htmlFor="approval_date" className="sr-only">
              Approval Date
            </label>
            <DatePicker className="flex gap-2 justify-between px-4 py-4 mt-2 whitespace-nowrap bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30" />
          </form>
        </section>
      ),
    },
    {
      title: "Notify Applicant",
      content: (
        <div>
          <section className="flex flex-col justify-center self-center px-12 pt-8 pb-14 mt-4 max-w-full text-base leading-6 rounded-3xl bg-stone-100 text-neutral-600 w-[500px] max-md:px-5">
            <p className="leading-7">
              Would you like to notify the applicant about the approval?
            </p>
            <h2 className="mt-6 font-semibold">Notification Options</h2>
            <NotificationOption>Email</NotificationOption>
            <NotificationOption>SMS</NotificationOption>
            <NotificationOption>
              Both (Send both Email + SMS)
            </NotificationOption>
          </section>
        </div>
      ),
    },
    {
      title: "Schedule Installation",
      content: (
        <form className="flex flex-col justify-center self-center px-12 pt-8 pb-14 mt-4 max-w-full text-base leading-6 rounded-3xl bg-stone-100 text-neutral-600 w-[500px] max-md:px-5">
          <div>Would you like to schedule the installation now?</div>
          <div className="mt-6 font-semibold">Preferred Installation Date</div>
          <div>
            <label htmlFor="installationDate" className="sr-only">
              Preferred Installation Date
            </label>
            <DatePicker className="flex gap-2 justify-between px-4 py-4 mt-2 whitespace-nowrap bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30" />
          </div>
        </form>
      ),
    },
    {
      title: "Approval Complete",
      content: (
        <section className="flex flex-col justify-center items-center px-12 pt-12 pb-14 mt-4 max-w-full text-base font-semibold rounded-3xl bg-stone-100 text-neutral-600 w-[500px] max-md:px-5">
          <h2 className="text-2xl capitalize">Approval Complete</h2>
          <p className="self-stretch mt-6 leading-7 text-center">
            The application has been approved successfully. Notification and
            installation scheduling details (if any) have been updated.
          </p>
          <button className="justify-center items-center px-8 py-4 mt-6 w-60 max-w-full text-white whitespace-nowrap rounded-3xl bg-slate-500 leading-[160%] max-md:px-5">
            Finish
          </button>
        </section>
      ),
    },
  ];

  return (
    <Modal
      title="Approve Application"
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
      width={800}
    >
      <Steps current={currentStep} className="w-full">
        {steps.slice(0, -1).map((item, index) => (
          <Step
            key={item.title}
            title={
              <div className="flex flex-col items-center">
                <span>{item.title}</span>
              </div>
            }
            onClick={() => setCurrentStep(index)}
          />
        ))}
      </Steps>

      <div className="steps-content flex justify-center">
        {steps[currentStep].content}
      </div>
      <div className="flex justify-center mt-4">
        <>
          {currentStep === 0 && (
            <>
              <Button type="primary" onClick={handleSubmit}>
                Save Approval Date
              </Button>
            </>
          )}

          {currentStep > 0 && currentStep < steps.length - 1 && (
            <div className="flex justify-between w-3/4">
              {(currentStep === 1 || currentStep === 2) && (
                <button
                  type="button"
                  className="border w-1/2"
                  onClick={prevStep}
                >
                  Skip
                </button>
              )}
              {currentStep === 1 && (
                <Button type="primary" onClick={handleSubmit}>
                  Send Notification
                </Button>
              )}
            </div>
          )}

          {currentStep === steps.length - 2 && (
            <div className="flex justify-center w-full">
              <Button type="primary" onClick={handleSubmit}>
                Schedule Installation
              </Button>
            </div>
          )}
        </>
      </div>
    </Modal>
  );
};

export default ApplicationFormActions;
