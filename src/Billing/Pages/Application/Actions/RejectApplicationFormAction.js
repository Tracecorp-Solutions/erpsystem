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

const CheckboxOption = ({ label }) => {
    return (
      <div className="flex items-center mt-3">
        <input type="checkbox" id={label} name={label.toLowerCase()} />
        <label htmlFor={label} className="ml-2">
          {label}
        </label>
      </div>
    );
  };

const RejectApplicationFormAction = ({
  rejectApplication,
  handleApproveApplication,
  setRejectApplication,
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
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = () => {
    if (currentStep === steps.length - 1) {
      handleApproveApplication(formData);
      setRejectApplication(false);
    } else {
      nextStep();
    }
  };

  const steps = [
    {
      title: "Reject Reason",
      content: (
        <div className="flex flex-col justify-center self-center px-12 pt-8 pb-10 mt-4 max-w-full text-base leading-6 rounded-3xl bg-stone-100 text-neutral-600 w-[500px] max-md:px-5">
        <p>Are you sure you want to reject this application?</p>
        <div className="mt-6 font-semibold">Rejection Reason</div>
        <form>
          <CheckboxOption label="Incomplete Documentation" />
          <CheckboxOption label="Failed Site Survey" />
          <CheckboxOption label="Invalid Information" />
          <CheckboxOption label="Others" />
          <div className="mt-6 font-semibold">Additional Comments</div>
          <label className="sr-only" htmlFor="additionalComments">Add comment</label>
          <textarea id="additionalComments" className="items-start px-4 pt-3 pb-12 mt-2 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5 w-full" aria-label="Add comment"/>
        </form>
      </div>
      ),
    },
    {
      title: "Notify Applicant",
      content: (
        <div>
          <section className="flex flex-col justify-center self-center px-12 pt-8 pb-14 mt-4 max-w-full text-base leading-6 rounded-3xl bg-stone-100 text-neutral-600 w-[500px] max-md:px-5">
            <p className="leading-7">
              Would you like to notify the applicant about the rejection?
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
      title: "Approval Complete",
      content: (
        <article className="flex flex-col justify-center items-center px-12 pt-12 pb-14 mt-4 max-w-full text-base font-semibold rounded-3xl bg-stone-100 text-neutral-600 w-[500px] max-md:px-5">
        <h2 className="text-2xl capitalize">Rejection Complete</h2>
        <p className="self-stretch mt-6 leading-7 text-center">
          The application has been rejected successfully. Notification details (if any) have been updated.
        </p>
        <button className="justify-center items-center px-8 py-4 mt-6 w-60 max-w-full text-white whitespace-nowrap rounded-3xl bg-customBlue font-custom leading-[160%] max-md:px-5">
          Finish
        </button>
      </article>
      ),
    },
  ];

  return (
    <Modal
      title="Reject Application"
      visible={rejectApplication}
      onCancel={() => setRejectApplication(false)}
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
            <div className="w-full flex justify-around">
              <button
                type="button"
                onClick={() => setRejectApplication(false)}
                className="rounded-full border w-1/4"
              >
                Cancel
              </button>
              <Button
                type="button"
                onClick={handleSubmit}
                className="rounded-full bg-customBlue text-white"
              >
                Submit Reason
              </Button>
            </div>
          )}
  
          {currentStep === 1 && (
            <div className="flex justify-between w-3/4">
              <button
                type="button"
                className="border w-1/3 rounded-full border"
                onClick={prevStep}
              >
                Skip
              </button>
              <Button
                type="button"
                onClick={handleSubmit}
                className="rounded-full bg-customBlue text-white"
              >
                Send Notification
              </Button>
            </div>
          )}
        </>
      </div>
    </Modal>
  );
  
};

export default RejectApplicationFormAction;
