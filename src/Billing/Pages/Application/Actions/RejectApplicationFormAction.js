import React, { useState } from "react";
import { Modal, Steps, Button } from "antd";
import { useLocation } from "react-router-dom";
import axios from "axios";

const { Step } = Steps;

const NotificationOption = ({ children }) => {
  return (
    <div className="flex items-center mt-3">
      <input type="radio" id={children} name="selectedReason" />
      <label htmlFor={children} className="ml-2">
        {children}
      </label>
    </div>
  );
};

const RejectApplicationFormAction = ({
  rejectApplication,
  setRejectApplication,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    selectedReason: "", // State to store the selected reason
    additionalComments: "",
  });

  const location = useLocation();
  const { state } = location;
  const applicationNumber = state?.applicationNumber;

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    const { id } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      selectedReason: id,
    }));
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (currentStep === 0) {
      try {
        let reasonText = formData.selectedReason;
        if (formData.additionalComments) {
          reasonText += `" "${formData.additionalComments}`;
        }

        console.log("Sending data:", {
          applicationNumber: applicationNumber,
          reason: reasonText,
          rejected: true,
        });

        const response = await axios.post(
          "http://3.216.182.63:8095/TestApi/ApproveOrRejectApplication",
          {
            applicationNumber: applicationNumber,
            reason: reasonText,
            rejected: true,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("response", response);

        if (response.status === 200) {
          console.log("Application rejected successfully");
          nextStep();
        } else {
          console.error("Failed to reject application");
          // Handle error scenarios, show message to user, etc.
        }
      } catch (error) {
        console.error("Error rejecting application:", error);
        // Handle network errors or other exceptions
      }
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
          <div onChange={handleRadioChange}>
            <NotificationOption children="Incomplete Documentation" />
            <NotificationOption children="Failed Site Survey" />
            <NotificationOption children="Invalid Information" />
            <NotificationOption children="Others" />
          </div>
          <div className="mt-6 font-semibold">Additional Comments</div>
          <label className="sr-only" htmlFor="additionalComments">
            Add comment
          </label>
          <textarea
            id="additionalComments"
            name="additionalComments"
            className="items-start px-4 pt-3 pb-12 mt-2 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5 w-full"
            aria-label="Add comment"
            value={formData.additionalComments}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
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
            <NotificationOption children="Email" />
            <NotificationOption children="SMS" />
            <NotificationOption children="Both (Send both Email + SMS)" />
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
            The application has been rejected successfully. Notification details
            (if any) have been updated.
          </p>
          <button
            className="justify-center items-center px-8 py-4 mt-6 w-60 max-w-full text-white whitespace-nowrap rounded-3xl bg-customBlue font-custom leading-[160%] max-md:px-5"
            onClick={() => setRejectApplication(false)}
          >
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
      </div>
    </Modal>
  );
};

export default RejectApplicationFormAction;
