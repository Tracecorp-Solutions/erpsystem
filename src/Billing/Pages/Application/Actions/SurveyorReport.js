import React, { useState } from "react";
import { Modal, DatePicker, Button, Upload, message, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";


function LabelInput({ label, id, value }) {
    return (
      <div className="flex flex-col grow text-base leading-6 text-neutral-600">
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
        <div id={id} className="mt-2">
          {value}
        </div>
      </div>
    );
  }
  
  function SurveyQuestion({ title, description }) {
    return (
      <>
        <h3 className="mt-4 text-base font-semibold leading-6 text-neutral-600">
          {title}
        </h3>
        <p className="mt-1 text-sm text-neutral-400">{description}</p>
        <div className="shrink-0 mt-2 max-w-full h-14 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30"></div>
      </>
    );
  }

const SurveyorReport = ({
  surveyorReport,
  handleApproveApplication,
  setSurveyorReport,
}) => {
  // State to manage input values for each text field
  const [textFields, setTextFields] = useState({
    field2: "", // Placeholder for file upload, can be used for file name or other metadata
    field3: "",
    field20: "",
  });

  const [dateOfSurvey, setDateOfSurvey] = useState(null);

  // Function to handle text field changes (if needed for metadata)
  const handleTextFieldChange = (fieldName, value) => {
    setTextFields((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };

  // Function to handle date picker change
  const handleDateChange = (date) => {
    setDateOfSurvey(date);
  };

  const handleFileUpload = (info) => {
    if (info && info.file && info.file.status) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
        // You can handle file upload progress or success here
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        // Update textFields with file name or other relevant metadata
        setTextFields((prevFields) => ({
          ...prevFields,
          field2: info.file.name, // Example: Update field2 with file name
        }));
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    } else {
      console.warn("Invalid file upload info:", info);
    }
  };

  // Function to handle submission of the report
  const handleSubmit = () => {
    // Construct your report object with dateOfSurvey and textFields data
    const report = {
      dateOfSurvey: dateOfSurvey ? moment(dateOfSurvey).format("YYYY-MM-DD") : "",
      textFields: textFields,
    };

    // Example log to console
    console.log("Submitting report:", report);

    // Example logic to handle submission (e.g., call API, update state, etc.)
    // handleApproveApplication(report); // Uncomment this if you have a handler for submitting the report
    setSurveyorReport(false); // Close the modal after submission
  };

  const questions = [
    {
      title: "Distance from Main Line",
      description: "What is the distance (in meters) from the main line to the premises to be connected?",
    },
    {
      title: "Land Type",
      description: "What is the type of land between the main line and the premises?",
    },
    {
      title: "Obstructions",
      description: "Are there any obstructions between the main line and the premises? If yes, please list them.",
    },
    {
      title: "Main Line Details",
      description: "What is the type and size (in inches) of the main line to be tapped?",
    },
    {
      title: "Service Pipe Size",
      description: "What is the size (in inches) of the service pipe to be laid?",
    },
    {
      title: "Service Pipe Length",
      description: "What is the length (in meters) of the service pipe to be laid?",
    },
    {
      title: "Ideal Connection Type",
      description: "What type of connection is ideal for the customer?",
    },
    {
      title: "Service Pipe Material",
      description: "What is the suggested material for the service pipe?",
    },
    {
      title: "Existing Main Size",
      description: "What is the size (in inches) of the existing main line to be tapped?",
    },
    {
      title: "Service Pipe Depth",
      description: "What is the suggested depth (in feet) for the service pipe below ground level?",
    },
    {
      title: "Connection from Existing Service Pipe",
      description: "Is the customer connecting from another customer’s existing service pipe?",
    },
    {
      title: "Existing Connections",
      description: "Does the customer have any other connections with the corporation?",
    },
    {
      title: "Bloc Map Number",
      description: "What is the Bloc Map Number for the property?",
    },
    {
      title: "Nearby Customers",
      description: "Is there any nearby customer? If yes, please provide their reference number, name, and meter number",
    },
    {
      title: "Distance to Connection Point",
      description: "What is the distance (in meters) from the main line to the premises to be connected?",
    },
    {
      title: "Connection Main Details",
      description: "What is the type and size (in inches) of the main line to be connected?",
    },
    {
      title: "Road Information",
      description: "What type of road (if any) will be affected, and what is its width?",
    },
    {
      title: "Recommendations",
      description: "What do you recommend for the next action depending on your findings?",
    },
  ];


  return (
    <Modal
      title="Surveyor’s Report"
      visible={surveyorReport}
      onCancel={() => setSurveyorReport(false)}
      footer={null}
    >
       <div className="flex flex-col justify-center items-center bg-white rounded-3xl max-w-[820px]">
      <header className="flex flex-col self-stretch pt-6 w-full text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
      </header>

      <main className="justify-between px-5 pt-4 pb-5 mt-4 max-w-full w-[500px]">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <LabelInput label="Application Number" id="applicationNumber" value="APP567890" />
          <LabelInput label="Applicant Name" id="applicantName" value="Grace Eze" />
          <LabelInput label="Surveyor’s Name" id="surveyorName" value="Nowembabazi Nickson" />
        </div>
        <section>
          <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Date of Survey
          </div>
          <div className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap">
            <div>-- / -- / ----</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c7515d0e48a8702b0a75494e4c7e35f39776b5b1f5e110f501c8205396c6041?apiKey=a1e51d57a9bf4fb0a44541a454bc05bc&"
              alt="Calendar Icon"
              className="shrink-0 self-start w-6 aspect-square"
            />
          </div>

          <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Upload Job card
          </div>
          <Upload
            onChange={handleFileUpload}
            beforeUpload={() => false} // To prevent automatic file upload
            maxCount={1} // Allow only one file to be uploaded
            className="flex justify-center items-center px-16 py-10 mt-2 max-w-full text-sm rounded-xl border border-dashed bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:px-5"
          >
            <div className="flex gap-2">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/793609836090771e5ddbc973db12ec417778aa7d279b0ec29cef462cff815634?apiKey=a1e51d57a9bf4fb0a44541a454bc05bc&"
                alt="Upload Icon"
                className="shrink-0 w-6 aspect-square"
              />
              <p className="my-auto underline">
                Drag and Drop file here or{" "}
                <span className="underline text-neutral-600">Choose file</span>
              </p>
            </div>
          </Upload>
        </section>

        <div className="shrink-0 mt-10 max-w-full h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 w-[500px]"></div>

        <section>
          <h2 className="mt-4 text-2xl font-semibold capitalize text-neutral-600 max-md:max-w-full">
            Survey Questions Checklist
          </h2>

          {questions.map((question, index) => (
            <SurveyQuestion
              key={index}
              title={question.title}
              description={question.description}
            />
          ))}

          <div className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:flex-wrap">
            <div>Proceed with installation</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=a1e51d57a9bf4fb0a44541a454bc05bc&"
              alt="Proceed Icon"
              className="shrink-0 self-start w-6 aspect-square"
            />
          </div>
        </section>

        <div className="flex justify-center items-center self-stretch px-16 py-6 mt-8 w-full text-base font-semibold leading-6 text-white bg-stone-100 max-md:px-5 max-md:max-w-full">
          <button className="justify-center items-center px-8 py-4 max-w-full rounded-3xl bg-slate-500 w-[500px] max-md:px-5">
            Submit Report
          </button>
        </div>
      </main>
    </div>
    </Modal>
  );
};

export default SurveyorReport;
