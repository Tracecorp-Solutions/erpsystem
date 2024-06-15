import React, { useState } from "react";
import { Modal, DatePicker, Button, Steps } from "antd";

const { Step } = Steps;

const NotificationOption = ({ children }) => {
  return (
    <div className="flex items-center mt-3">
      <input type="radio" id={children} name={children.toLowerCase()} />
      <label htmlFor={children} className="ml-2">
        {children}
      </label>
    </div>
  );
};

const ContactApplicantFormAction = ({
  ContactApplicantForm,
  handleApproveApplication,
  setContactApplicantForm,
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
      setContactApplicantForm(false);
    } else {
      nextStep();
    }
  };

  const steps = [
    {
        title: "Contact Method",
        content: (
          <div>
            <section className="flex flex-col justify-center self-center px-12 pt-8 pb-14 mt-4 max-w-full text-base leading-6 rounded-3xl bg-stone-100 text-neutral-600  max-md:px-5">
              <p className="leading-7">
                Choose how you would like to contact the applicant.              </p>
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
      title: "Compose Message",
      content: (
        <section className="flex flex-col justify-center self-center px-12 pt-8 pb-14 mt-4 max-w-full text-base leading-6 rounded-3xl bg-stone-100 text-neutral-600 w-[500px] max-md:px-5">
          <form>
          <div className="mt-6 font-semibold">To: +256777349597</div>
          <label className="text-bold" htmlFor="additionalComments">Send Message</label>
          <textarea id="additionalComments" placeholder="Write message..." className="items-start px-4 pt-3 mt-2 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5 w-full" aria-label="Add comment"/>
          </form>
        </section>
      ),
    },
    {
      title: "Approval Complete",
      content: (
        <section className="flex flex-col justify-center items-center px-12 pt-12 pb-14 mt-4 max-w-full text-base font-semibold rounded-3xl bg-stone-100 text-neutral-600 w-[500px] max-md:px-5">
          <h2 className="text-2xl capitalize">Message Sent</h2>
          <p className="self-stretch mt-6 leading-7 text-center">
          Your message has been sent successfully to the applicant.
          </p>
          <button className="justify-center items-center px-8 py-4 mt-6 w-60 max-w-full text-white whitespace-nowrap rounded-3xl  bg-customBlue text-white leading-[160%] max-md:px-5">
            Finish
          </button>
        </section>
      ),
    },
  ];

  return (
    <Modal
      title="Contact Applicant"
      visible={ContactApplicantForm}
      onCancel={() => setContactApplicantForm(false)}
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
                onClick={() => setContactApplicantForm(false)}
                className="rounded-full border w-1/4"
              >
                Cancel
              </button>
              <Button
                type="button"
                onClick={handleSubmit}
                className="rounded-full  bg-customBlue text-white"
              >
                Save Approval Date
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
                className="rounded-full w-1/3 bg-customBlue text-white"
              >
                Send Message
              </Button>
            </div>
          )}
        </>
      </div>
    </Modal>
  );
  
};

export default ContactApplicantFormAction;
