import React, { useState } from "react";
import { Modal, DatePicker, message, Select, Button } from "antd";
import axios from "axios";
import moment from "moment";

const { Option } = Select;

function LabelInput({ label, value }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="font-semibold">{label}</label>
      <div className="mt-1">{value}</div>
    </div>
  );
}

const SurveyorReport = ({
  surveyorReport,
  setSurveyorReport,
  applicationNumberDisplay,
}) => {
  const [formData, setFormData] = useState({
    surveyorId: 2,
    applicationNumber: applicationNumberDisplay,
    jobCard: "",
    distanceFromMain: "",
    landType: "",
    obstructions: "",
    mainLineDetails: "",
    servicePipeSize: "",
    servicePipeLength: "",
    idealConnectionType: "",
    servicePipeMaterial: "",
    existingMainSize: "",
    servicePipeDepth: "",
    connectionFromExistingServicePipe: "",
    existingConnections: "",
    blocMapNumber: "",
    nearByCustomer: "",
    distanceToConnectionPoint: "",
    connectionMainDetails: "",
    roadInformation: "",
    recommendation: "",
  });

  const [dateOfSurvey, setDateOfSurvey] = useState(null);
  const [installationOption, setInstallationOption] = useState("proceed");

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      setFormData({ ...formData, jobCard: file.name }); // Store the file name
    }
  };

  const handleInstallationChange = (value) => {
    setInstallationOption(value);
  };

  const handleSubmit = async () => {
    const jsonData = {
      ...formData,
      dateOfSurvey: dateOfSurvey
        ? moment(dateOfSurvey).format("YYYY-MM-DD")
        : null,
    };

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("jsonData", JSON.stringify(jsonData));
    formDataToSubmit.append("jobCard", formData.jobCard);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/SubmitSurveyReport`,
        formDataToSubmit,
        {
          "Content-Type": "multipart/form-data"
        }
      );

      console.log("Survey report submitted successfully:", response.data);
      setSurveyorReport(false);
      message.success("Survey report submitted successfully!");
    } catch (error) {
      console.error("Error submitting survey report:", error.message);
      message.error("Failed to submit survey report. Please try again later.");
    }
  };

  return (
    <Modal
      title="Surveyor’s Report"
      visible={surveyorReport}
      onCancel={() => setSurveyorReport(false)}
      footer={null}
    >
      <div className="p-6">
        <div className="flex gap-4">
          <LabelInput
            label="Application Number"
            value={formData.applicationNumber}
          />
          <LabelInput label="Surveyor’s ID" value={formData.surveyorId} />
        </div>
        <div className="flex gap-4 mt-4">
          <LabelInput
            label="Date Created"
            value={
              formData.dateCreated
                ? moment(formData.dateCreated).format("YYYY-MM-DD HH:mm:ss")
                : ""
            }
          />
          <LabelInput
            label="Date Updated"
            value={
              formData.dateUpdated
                ? moment(formData.dateUpdated).format("YYYY-MM-DD HH:mm:ss")
                : ""
            }
          />
        </div>

        <div className="mt-6">
          <label className="block text-base font-semibold text-gray-700">
            Date of Survey
          </label>
          <DatePicker
            value={dateOfSurvey}
            onChange={setDateOfSurvey}
            style={{ width: "100%" }}
            className="mt-2"
          />
        </div>

        <div className="mt-6">
          <label className="block text-base font-semibold text-gray-700">
            Upload Job Card
          </label>
          <div className="mt-6">
            <label className="block text-base font-semibold text-gray-700">
              Upload Job Card
            </label>
            <input type="file" onChange={handleFileChange} className="mt-2" />
          </div>
        </div>

        <div className="border-t border-gray-200 mt-6 pt-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Survey Questions
          </h2>

          <div className="mt-4">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Distance from Main Line
            </label>
            <input
              type="text"
              value={formData.distanceFromMain}
              onChange={(e) =>
                setFormData({ ...formData, distanceFromMain: e.target.value })
              }
              className="w-full border p-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              What is the distance (in meters) from the main line to the
              premises to be connected?
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Land Type
            </label>
            <input
              type="text"
              value={formData.landType}
              onChange={(e) =>
                setFormData({ ...formData, landType: e.target.value })
              }
              className="w-full border p-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              What is the type of land between the main line and the premises?
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Obstructions
            </label>
            <input
              type="text"
              value={formData.obstructions}
              onChange={(e) =>
                setFormData({ ...formData, obstructions: e.target.value })
              }
              className="w-full border p-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              Are there any obstructions between the main line and the premises?
              If yes, please list them.
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Main Line Details
            </label>
            <input
              type="text"
              value={formData.mainLineDetails}
              onChange={(e) =>
                setFormData({ ...formData, mainLineDetails: e.target.value })
              }
              className="w-full border p-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              What is the type and size (in inches) of the main line to be
              tapped?
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Service Pipe Size
            </label>
            <input
              type="text"
              value={formData.servicePipeSize}
              onChange={(e) =>
                setFormData({ ...formData, servicePipeSize: e.target.value })
              }
              className="w-full border p-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              What is the size (in inches) of the service pipe to be laid?
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Service Pipe Length
            </label>
            <input
              type="text"
              value={formData.servicePipeLength}
              onChange={(e) =>
                setFormData({ ...formData, servicePipeLength: e.target.value })
              }
              className="w-full border p-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              What is the length (in meters) of the service pipe to be laid?
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Ideal Connection Type
            </label>
            <input
              type="text"
              value={formData.idealConnectionType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  idealConnectionType: e.target.value,
                })
              }
              className="w-full border p-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              What type of connection is ideal for the customer?
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Service Pipe Material
            </label>
            <input
              type="text"
              value={formData.servicePipeMaterial}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  servicePipeMaterial: e.target.value,
                })
              }
              className="w-full border p-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              What material should the service pipe be made of?
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Existing Main Size
            </label>
            <input
              type="text"
              value={formData.existingMainSize}
              onChange={(e) =>
                setFormData({ ...formData, existingMainSize: e.target.value })
              }
              className="w-full border p-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              What is the size (in inches) of the existing main line?
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Service Pipe Depth
            </label>
            <input
              type="text"
              value={formData.servicePipeDepth}
              onChange={(e) =>
                setFormData({ ...formData, servicePipeDepth: e.target.value })
              }
              className="w-full border p-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              What is the depth (in meters) at which the service pipe should be
              laid?
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Connection from Existing Service Pipe
            </label>
            <input
              type="text"
              value={formData.connectionFromExistingServicePipe}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  connectionFromExistingServicePipe: e.target.value,
                })
              }
              className="w-full border p-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              Should the connection be made from an existing service pipe?
              Please specify.
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Existing Connections
            </label>
            <input
              type="text"
              value={formData.existingConnections}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  existingConnections: e.target.value,
                })
              }
              className="w-full border p-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              Are there any existing connections nearby? If yes, please specify.
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Bloc Map Number
            </label>
            <input
              type="text"
              value={formData.blocMapNumber}
              onChange={(e) =>
                setFormData({ ...formData, blocMapNumber: e.target.value })
              }
              className="w- border p-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              What is the bloc map number of the area?
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Near By Customer
            </label>
            <input
              type="text"
              value={formData.nearByCustomer}
              onChange={(e) =>
                setFormData({ ...formData, nearByCustomer: e.target.value })
              }
              className="w-full border p-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              Are there any nearby customers who could benefit from this
              connection?
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Distance to Connection Point
            </label>
            <input
              type="text"
              value={formData.distanceToConnectionPoint}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  distanceToConnectionPoint: e.target.value,
                })
              }
              className="w-full border p-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              What is the distance (in meters) to the connection point?
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Connection Main Details
            </label>
            <input
              type="text"
              value={formData.connectionMainDetails}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  connectionMainDetails: e.target.value,
                })
              }
              className="w-full border p-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              Provide details about the connection to the main line.
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Road Information
            </label>
            <input
              type="text"
              value={formData.roadInformation}
              onChange={(e) =>
                setFormData({ ...formData, roadInformation: e.target.value })
              }
              className="w-full border p-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              What are the road conditions that might affect the installation?
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Recommendation
            </label>
            <input
              type="text"
              value={formData.recommendation}
              onChange={(e) =>
                setFormData({ ...formData, recommendation: e.target.value })
              }
              className="w-full border p-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              Any recommendations for the installation or connection process?
            </p>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-base font-semibold text-gray-700">
            Proceed with Installation
          </label>
          <Select
            value={installationOption}
            onChange={handleInstallationChange}
            style={{ width: "100%", marginTop: "8px" }}
            className="border"
          >
            <Option value="proceed">Proceed</Option>
            <Option value="not-proceed">Do Not Proceed</Option>
          </Select>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SurveyorReport;
