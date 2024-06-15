import React, { useState } from "react";
import { Modal, DatePicker, Button } from "antd";
import moment from 'moment';

const AssignSurveyor = ({
  setAssignSurveyorAction,
  handleApproveApplication,
  assignSurveyorAction,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    surveyor: "", // Add surveyor field if not already present
    scheduleDate: null, // Initialize scheduleDate to null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date, dateString) => {
    setFormData((prevData) => ({
      ...prevData,
      scheduleDate: dateString,
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
      setAssignSurveyorAction(false);
    } else {
      nextStep();
    }
  };

  const steps = [
    {
      content: (
        <div>
          <section className="flex flex-col justify-center self-center px-12 pt-8 pb-14 mt-4 w-full text-base leading-6 rounded-3xl bg-stone-100 text-neutral-600 max-md:px-5">
            <div className="mb-6">
              <label htmlFor="surveyor" className="font-semibold">
                Select Surveyor:
              </label>
              <select
                id="surveyor"
                name="surveyor"
                onChange={handleChange}
                value={formData.surveyor}
                className="ml-2 border rounded-lg border-neutral-500 w-full p-2"
              >
                <option value="">Select Surveyor...</option>
                <option value="surveyor1">Surveyor 1</option>
                <option value="surveyor2">Surveyor 2</option>
                <option value="surveyor3">Surveyor 3</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="scheduleDate" className="font-semibold">
                Schedule Date:
              </label>
              <DatePicker
                id="scheduleDate"
                name="scheduleDate"
                onChange={handleDateChange}
                value={formData.scheduleDate ? moment(formData.scheduleDate) : null} // Ensure valid moment object or null
                className="ml-2 border rounded-lg border-neutral-500 w-full p-2"
              />
            </div>
          </section>
        </div>
      ),
    },
    {
      content: (
        <section className="flex flex-col justify-center items-center px-12 pt-12 pb-14 mt-4 max-w-full text-base font-semibold rounded-3xl bg-stone-100 text-neutral-600 w-[500px] max-md:px-5">
          <h2 className="text-2xl capitalize">Assignment Successful!</h2>
          <p className="self-stretch mt-6 leading-7 text-center">
            The surveyor has been assigned successfully. They will be notified
            of the schedule.
          </p>
          <button className="justify-center items-center px-2 py-2 mt-6 w-60 max-w-full text-white whitespace-nowrap rounded-3xl bg-customBlue text-white leading-[160%] max-md:px-5">
            Close
          </button>
        </section>
      ),
    },
  ];

  return (
    <Modal
      title="Assign Surveyor"
      visible={assignSurveyorAction}
      onCancel={() => setAssignSurveyorAction(false)}
      footer={null}
      width={800}
    >
      <div className="steps-content flex justify-center">
        {steps[currentStep].content}
      </div>
      <div className="flex justify-center mt-4">
        <>
          {currentStep === 0 && (
            <div className="w-full flex justify-around">
              <button
                type="button"
                onClick={() => setAssignSurveyorAction(false)}
                className="rounded-full border w-1/4"
              >
                Cancel
              </button>
              <Button
                type="button"
                onClick={handleSubmit}
                className="rounded-full  bg-customBlue text-white"
              >
                Assign Surveyor
              </Button>
            </div>
          )}
        </>
      </div>
    </Modal>
  );
};

export default AssignSurveyor;
