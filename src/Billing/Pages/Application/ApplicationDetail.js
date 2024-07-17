import React, { useState, useEffect, useRef } from "react";
import { Dropdown, Menu, Modal, Button, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas"; // Import html2canvas library
import jsPDF from "jspdf";
import ApplicantSection from "./ApplicantSection";
import Document from "./Document";
import ApplicationFormActions from "./Actions/ApplicationFormActions";
import RejectApplicationFormAction from "./Actions/RejectApplicationFormAction";
import ContactApplicantFormAction from "./Actions/ContactApplicantForm";
import AssignSurveyor from "./Actions/AssignSurveyor";
import SurveyorReport from "./Actions/SurveyorReport";
import UpdateAuthorizeModal from "./Actions/UpdateAuthorizeModal ";
import Payslip from "./Actions/Payslip";
import ViewSurveyorDetails from "./VeiwSurveyorDetails";

const ApplicationDetail = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rejectApplication, setRejectApplication] = useState(false);
  const [contactApplicantForm, setContactApplicantForm] = useState(false);
  const [assignSurveyorAction, setAssignSurveyorAction] = useState(false);
  const [surveyorReport, setSurveyorReport] = useState(false);
  const [applicationData, setApplicationData] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [application, setApplication] = useState(null);
  const [surveyReport, setSurveyReport] = useState(null);

  const [isVisible, setIsVisible] = useState(false);
  const [jobCardInfo, setJobCardInfo] = useState(null);
  const [surveyorAssigned, setSurveyorAssigned] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [localAuthorizationDocumentUrl, setLocalAuthorizationDocumentUrl] =
    useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const pdfDownloadRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const applicationNumber = state?.applicationNumber;

  const userid = sessionStorage.getItem("userid");

  const handleClickModalVisible = () => {
    setIsVisible(true);
  };

  const handleIsModalVisible = () => {
    setIsModalVisible(true);
  };

  const handleHideModal = () => {
    setIsModalVisible(false);
    setIsVisible(false);
  };

  useEffect(() => {
    if (applicationNumber) {
      fetchApplicationById(applicationNumber);
    }
    fetchApplicationData();
    fetchJobCard(applicationNumber);
    fetchSurveyReport();
  }, [applicationNumber]);

  const fetchJobCard = async (applicationNumber) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetJobCardNumberByApplicationId?applicationNumber=${applicationNumber}`
      );
      if (!response.ok) setJobCardInfo(null);

      setJobCardInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchApplicationById = (applicationNumber) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/GetApplicationByApplicationNumnber?applicationId=${applicationNumber}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch application details");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched application data:", data);
        setApplicationData(data);
        setLocalAuthorizationDocumentUrl(data.proofOfIdentity);
        // Check if surveyor is assigned and update state accordingly
        if (data && data.assignedTo) {
          setSurveyorAssigned(true);
        } else {
          setSurveyorAssigned(false);
        }

        if (data && data.status) {
          setApplicationStatus(true);
        } else {
          setApplicationStatus(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching application details:", error.message);
      });
  };

  const fetchApplicationData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/GetDocketInitiation?applicationNumber=${applicationNumber}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setApplication(data);
      } else {
        console.error("Failed to fetch application data");
      }
    } catch (error) {
      console.error("Error fetching application data:", error);
    }
  };
  const handleGenerateJobCard = () => {
    if (!applicationNumber || !userid) {
      console.error("Application number or userId is missing");
      return;
    }

    const apiUrl = `${
      process.env.REACT_APP_API_URL
    }/GenerateJobCard?applicationNumber=${encodeURIComponent(
      applicationNumber
    )}&userid=${encodeURIComponent(userid)}`;

    axios
      .post(apiUrl, {
        applicationNumber: applicationNumber,
        userid: userid,
      })
      .then((response) => {
        console.log("Job card generated successfully:", response.data);
        message.success("Job card generated successfully", response.data);
        setJobCardInfo(response.data);
      })
      .catch((error) => {
        console.error("Error generating job card:", error.message);
        message.error("Error generating job card", error.message);
      });
  };

  const fetchSurveyReport = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetSurveyReportByApplicationNumber`,
        {
          params: {
            applicationNumber,
          },
        }
      );
      setSurveyReport(response.data);
    } catch (error) {
      console.error("Error fetching survey report:", error);
    }
  };

  const handleDownloadDocument = () => {
    console.log("localAuthorizationDocumentUrl", localAuthorizationDocumentUrl);
    const url = localAuthorizationDocumentUrl;

    if (url) {
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "local_authorization_document.pdf");

      document.body.appendChild(link);

      console.log("Link appended to body:", link);

      link.click();

      document.body.removeChild(link);
    } else {
      console.error("No document URL available");
    }
  };

  const handleApproveApplication = () => {
    setIsModalVisible(false);
  };

  const handleUpdateModalVisible = () => {
    setIsUpdateModalVisible(!isUpdateModalVisible);
  };

  const handleShowModalVisible = () => {
    setIsVisible(true);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">Print Application</Menu.Item>
      <Menu.Item key="2" onClick={() => setRejectApplication(true)}>
        Reject Application
      </Menu.Item>
      <Menu.Item key="3" onClick={() => setContactApplicantForm(true)}>
        Contact Applicant
      </Menu.Item>
      <Menu.Item key="4" onClick={() => setIsModalVisible(true)}>
        Approve Application
      </Menu.Item>
      <Menu.Item key="5">Generate Job card</Menu.Item>
      <Menu.Item key="6" onClick={() => setAssignSurveyorAction(true)}>
        Assign Surveyor
      </Menu.Item>
    </Menu>
  );

  // Safely accessing applicationData properties
  const applicationNumberDisplay =
    applicationData?.applicationNumber || "Not Available";
  const fullName = applicationData?.fullName || "Not Available";
  const dateOfBirth = applicationData?.dateOfBirth || "Not Available";
  const emailAddress = applicationData?.emailAddress || "Not Available";
  const phoneNumber = applicationData?.phoneNumber || "Not Available";
  const streetAddress = applicationData?.streetAddress || "Not Available";
  const nearestLandMark = applicationData?.nearestLandMark || "Not Available";
  const plotNumber = applicationData?.plotNumber || "Not Available";
  const operationArea = applicationData?.operationArea?.name || "Not Available";
  const operationState = applicationData?.state?.name || "Not Available";
  const branch = applicationData?.branch?.name || "Not Available";
  const territory = applicationData?.territory?.name || "Not Available";
  const subTerritory = applicationData?.subTerritory?.name || "Not Available";
  const status = applicationData?.status || "Not Available";
  const localAuthorizationDocument =
    applicationData?.localAuthorizationDocument || "Not Available";

  if (!applicationData) {
    return <div>Loading...</div>;
  }

  const { assignedTo } = applicationData;

  console.log(
    "applicationData applicationData applicationData applicationData",
    applicationData
  );

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
  
    const input = document.getElementById("pdf-content");
    input.style.display = "block";
  
    try {
      await Promise.all(
        Array.from(document.images).map((img) => {
          if (!img.complete) {
            return new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
            });
          }
          return true;
        })
      );
  
      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
          pdf.save("download.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    } catch (error) {
      console.error("Error loading images:", error);
    } finally {
      setIsGenerating(false);
      input.style.display = "none";
    }
  };
  

  console.log("applicationData applicationData", applicationData);

  return (
    <div className="flex flex-wrap justify-center content-start items-center py-6 rounded-3xl bg-stone-100">
      <a
        ref={pdfDownloadRef}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleDownloadPDF();
        }}
        style={{ display: "none" }}
      >
        Download PDF
      </a>
      <header className="flex gap-2 items-center self-stretch px-6 text-base font-semibold leading-6 whitespace-nowrap text-neutral-600 max-md:flex-wrap max-md:px-5 w-full">
        <h1 className="self-stretch my-auto">Applications</h1>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=27ec22b9382040ef8580a5e340d3a921&"
          alt=""
          className="shrink-0 self-stretch my-auto w-6 aspect-square"
        />
        <div className="justify-center self-stretch px-4 py-1 bg-white rounded-2xl">
          {applicationNumberDisplay}
        </div>
      </header>

      <section className="flex gap-4 justify-between items-center px-5 mt-6 w-full  max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-4 self-stretch font-semibold">
          <div className="justify-center items-center px-3.5 text-2xl text-white capitalize whitespace-nowrap bg-lime-400 h-[60px] rounded-[50px] w-[60px]">
            GE
          </div>
          <div className="text-4xl leading-[57.6px] text-neutral-600">
            {fullName}
          </div>
        </div>
        <div className="flex flex-col justify-center self-stretch my-auto">
          <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
            current status
          </div>
          <div className="justify-center px-4 py-1 mt-2 text-white leading-6 bg-green-600 rounded-2xl text-neutral-600">
            {status}
          </div>
        </div>
        <Dropdown overlay={menu} trigger={["click"]}>
          <div className="flex gap-2 justify-center self-stretch py-3 pr-4 pl-6 my-auto text-base font-semibold leading-6 text-white whitespace-nowrap rounded-3xl bg-slate-500">
            <div>Actions</div>
            <DownOutlined />
          </div>
        </Dropdown>
      </section>

      <article className="flex flex-col px-6 pt-4 pb-5 mt-6 w-full bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
        <header className="flex gap-4 justify-between text-2xl font-semibold capitalize text-neutral-600 max-md:flex-wrap max-md:max-w-full">
          <h2>Applicant Details</h2>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=27ec22b9382040ef8580a5e340d3a921&"
            alt=""
            className="shrink-0 my-auto w-6 aspect-square"
          />
        </header>

        <ApplicantSection title="Applicant Information">
          <div className="flex flex-wrap justify-between gap-4 content-center mt-4">
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                full name
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {fullName}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                Date of Birth
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {dateOfBirth}
              </div>
            </div>
            <div className="flex flex-col justify-center whitespace-nowrap">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                EMAIL
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {emailAddress}
              </div>
            </div>
            <div className="flex flex-col justify-center whitespace-nowrap">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                PHONE
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {phoneNumber}
              </div>
            </div>
          </div>
        </ApplicantSection>

        <ApplicantSection title="Residential Information">
          <div className="flex gap-2 justify-between mt-4 max-md:flex-wrap">
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                Street Address
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {streetAddress}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                nearest Landmark
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {nearestLandMark}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                Plot Number
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {plotNumber}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                Operation Area
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {operationArea}
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-6 justify-between max-md:flex-wrap">
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                state
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {operationState}
              </div>
            </div>
            <div className="flex flex-col justify-center md:ml-10">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                branch
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {branch}
              </div>
            </div>
            <div className="flex flex-col justify-center md:ml-10">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                territory
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {territory}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                sub territory
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {subTerritory}
              </div>
            </div>
          </div>
        </ApplicantSection>

        <ApplicantSection title="Connection Details">
          <div className="flex flex-wrap gap-2 justify-between content-center mt-4">
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                Application Number
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {applicationNumberDisplay}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                Submission Date
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                1st June 2024
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                Type of Connection
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                New Connection
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                Connection Status
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                Pending Survey
              </div>
            </div>
          </div>
        </ApplicantSection>
      </article>

      <section className="flex flex-col px-6 pt-4 pb-5 mt-6 w-full bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
        <header className="flex gap-4 justify-between text-2xl font-semibold capitalize whitespace-nowrap text-neutral-600 max-md:flex-wrap max-md:max-w-full">
          <h2>Documents</h2>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=27ec22b9382040ef8580a5e340d3a921&"
            alt=""
            className="shrink-0 my-auto w-6 aspect-square"
          />
        </header>
        <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="mt-4 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <Document
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e15c1d14b61ebe9160b96a514752c440bc2ed56b9365542b050e313b08bfb7a7?apiKey=27ec22b9382040ef8580a5e340d3a921&"
              name="Profile pic.PNG"
              description="passport photo"
            />
            <Document
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c50aa64a000b557051f3507859ff49f84f225f25d8c449dbc2dd915d76344779?apiKey=27ec22b9382040ef8580a5e340d3a921&"
              name="National ID.PNG"
              description="national id"
            />
            <Document
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/47a8036c7569f00568d2dd568ab0c321a6ee6dd59b052a2313ca34056c95fbaa?apiKey=27ec22b9382040ef8580a5e340d3a921&"
              name="Ownership.PDF"
              description="proof of ownership"
            />
            <Document
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f88971b08c1f19e72ce4982cf9837699cfe2b82778d0e77f5ccafffe88673fea?apiKey=27ec22b9382040ef8580a5e340d3a921&"
              name="Sales.PDF"
              description="land/sales agreement"
            />
          </div>

          <div className="flex gap-2 justify-between px-4 py-5 mt-6 max-w-full rounded-xl bg-stone-100 w-[646px]">
            <div className="flex flex-col text-sm text-center text-neutral-600">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/15bab7d3ee1870a044e0dfd0c115fc617faff32818483e187eb058feb34aa48a?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                alt="Local Authority"
                className="w-8 aspect-square"
              />
              <div className="mt-2">{localAuthorizationDocument}</div>
            </div>
            <div className="flex justify-center items-center self-end px-2 mt-7 w-8 h-8 rounded-3xl bg-slate-500">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e26c3fe38d1183a0ed31b3a41a00f1bbd67b7f3f4264dcf95c2481c813f84e09?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                alt=""
                className="aspect-square w-[18px] cursor-pointer"
                onClick={handleDownloadDocument}
              />
            </div>
          </div>
          <div className="self-start mt-2 text-xs font-medium tracking-wide uppercase text-neutral-400">
            local authority permission
          </div>
        </div>
      </section>

      <section className="flex flex-col px-6 pt-4 pb-5 mt-6 w-full bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
        <header className="flex gap-4 justify-between text-2xl font-semibold capitalize text-neutral-600 max-md:flex-wrap max-md:max-w-full">
          <h2>Surveyor Report</h2>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=27ec22b9382040ef8580a5e340d3a921&"
            alt=""
            className="shrink-0 my-auto w-6 aspect-square"
          />
        </header>
        <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex gap-5 justify-between mt-4 max-md:flex-wrap">
          <div className="flex gap-2 justify-between px-6 py-4 rounded-xl bg-stone-100 max-md:flex-wrap max-md:px-5 w-full">
            <div className="flex flex-col justify-center text-center w-full">
              <div className="text-xs text-start font-medium tracking-wide uppercase text-neutral-400">
                Surveyor Assigned
              </div>
              {surveyorAssigned ? (
                <div className="mt-2 text-base flex justify-between leading-6">
                  <span>Surveyor Name: {applicationData.user.fullName}</span>
                  <button
                    type="button"
                    onClick={() => setAssignSurveyorAction(true)}
                    className="justify-center w-2/4 self-start px-6 py-3 text-sm font-semibold text-white whitespace-nowrap bg-lime-400 rounded-3xl max-md:px-5"
                  >
                    Change Surveyor
                  </button>
                </div>
              ) : (
                <div className="mt-2 text-base leading-6 text-neutral-600">
                  No surveyor assigned yet
                </div>
              )}
            </div>
            {!surveyorAssigned ? (
              <button
                className="justify-center self-start px-6 py-3 mt-2.5 text-sm font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5"
                onClick={() => setAssignSurveyorAction(true)}
              >
                Assign Surveyor
              </button>
            ) : null}
          </div>
          <div className="flex gap-2 justify-between px-6 py-4 rounded-xl bg-stone-100  max-md:px-5 w-full">
            <div className="flex flex-col  text-center w-full">
              <div className="text-xs text-start font-medium tracking-wide uppercase text-neutral-400">
                JOB CARD
              </div>
              {jobCardInfo ? (
                <div className="mt-2 flex justify-between text-base leading-6 text-neutral-400 gap-4">
                  <span className="">{jobCardInfo} is generated</span>
                  <button
                    type="button"
                    ref={pdfDownloadRef}
                    onClick={handleDownloadPDF}
                    className="justify-center w-2/4 self-start px-6 py-3 text-sm font-semibold text-white whitespace-nowrap bg-lime-400 rounded-3xl max-md:px-5"
                  >
                    Download
                  </button>
                </div>
              ) : (
                <div className="mt-2 text-base leading-6 text-neutral-400">
                  No job card generated yet
                </div>
              )}
            </div>
            {!jobCardInfo && (
              <button
                className="justify-center self-start px-6 py-3 mt-2.5 text-sm font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5"
                onClick={handleGenerateJobCard}
              >
                Generate
              </button>
            )}
          </div>
        </div>
        {status === "PENDING JOB CARD" ? (
          <div className="flex gap-2 justify-between px-6 py-4 mt-4 max-w-full rounded-xl bg-stone-100 w-[508px] max-md:flex-wrap max-md:px-5">
            <div className="flex flex-col justify-center text-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                Surveyor report
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                Application is pending survey
              </div>
            </div>
            <button
              className="justify-center self-start px-6 py-3 mt-2.5 text-sm font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5"
              onClick={() => setSurveyorReport(true)}
            >
              Update Findings
            </button>
          </div>
        ) : (
          <div className="flex gap-2 justify-between px-6 py-4 mt-4 w-full rounded-xl bg-stone-100 max-md:flex-wrap max-md:px-5">
            <div className="flex flex-col justify-center text-center w-full">
              <div className="text-xs text-start font-medium tracking-wide uppercase text-neutral-400">
                Surveyor report
              </div>
              <div className="mt-2 flex text-base w-full justify-between leading-6">
                <span>{applicationData.status}</span>
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/billingdashboard`, {
                      state: {
                        screen: "surveyor-details",
                        surveyReport,
                      },
                    })
                  }
                  className="justify-center w-1/4 self-start px-6 py-3 text-sm font-semibold text-white whitespace-nowrap bg-lime-400 rounded-3xl max-md:px-5"
                >
                  View Report
                </button>
              </div>
            </div>{" "}
          </div>
        )}
      </section>
      <section className="flex flex-col px-6 pt-4 pb-5 mt-6 w-full bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
        <header className="flex gap-4 justify-between text-2xl font-semibold capitalize text-neutral-600 max-md:flex-wrap max-md:max-w-full">
          <h2>Connection Invoice</h2>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=27ec22b9382040ef8580a5e340d3a921&"
            alt=""
            className="shrink-0 my-auto w-6 aspect-square"
          />
        </header>
        <div className="shrink-0 mt-4 h-px border bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10" />
        <div className="flex gap-5 justify-between mt-4 max-md:flex-wrap w-full">
          <div className="flex gap-2 justify-between px-6 py-4 rounded-xl bg-stone-100 max-md:flex-wrap max-md:px-5 border w-full">
            <div>
              <h2
                style={{
                  color: "#a1a1a1",
                  fontFamily: "outFit, Sans-serif",
                  fontSize: "16px",
                }}
              >
                CONNECTION DETAILS
              </h2>
              <p>Update details to reflect surveyor recommendations</p>
            </div>
            {status === "PENDING CONNECTION INVOICE" ? (
              <button
                className="justify-center self-start px-6 py-3 mt-2.5 text-sm font-semibold text-white whitespace-nowrap rounded-3xl bg-slate-500 max-md:px-5"
                onClick={handleUpdateModalVisible}
              >
                Update and Authorize Connection
              </button>
            ) : (
              <div className="flex gap-2 justify-between px-6 py-4 mt-4 max-w-full rounded-xl bg-green-100 max-md:flex-wrap max-md:px-5">
                <div className="flex flex-col justify-center text-center">
                  <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                    STATUS
                  </div>
                  <div className="mt-2 text-base leading-6 text-neutral-400">
                    {applicationData.status}
                  </div>
                </div>{" "}
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="grow justify-between px-6 py-4 w-full rounded-xl bg-stone-100 max-md:px-5 max-md:mt-6 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-[65%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow justify-center max-md:mt-10">
                      <div className="text-xs font-medium tracking-wide text-center uppercase text-neutral-400">
                        generate invoice
                      </div>
                      <div className="mt-2 text-base leading-7 text-neutral-600">
                        The invoice will depend on the material
                        <br />
                        details required for the connection
                      </div>
                    </div>
                  </div>
                  {status === "APPROVED FOR CONNECTION" ? (
                    <div className="flex flex-col ml-5 w-[35%] max-md:ml-0 max-md:w-full">
                      <button
                        className="grow justify-center px-4 py-3 mt-9 w-full text-sm font-semibold text-white whitespace-nowrap rounded-3xl bg-blue-400 max-md:px-5 max-md:mt-10"
                        onClick={() =>
                          navigate("/billingdashboard", {
                            state: {
                              screen: "update-invoice",
                              applicationNumber,
                              applicationData,
                            },
                          })
                        }
                      >
                        Generate invoice
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        navigate("/billingdashboard", {
                          state: {
                            screen: "invoice-details",
                            applicationNumber,
                          },
                        })
                      }
                      className="justify-center w-1/4 self-start px-6 py-3 mt-4 text-sm font-semibold text-white whitespace-nowrap bg-lime-400 rounded-3xl max-md:px-5"
                    >
                      See Details
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <div className="grow justify-between px-6 py-4 w-full rounded-xl bg-stone-100 max-md:px-5 max-md:mt-6 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-[65%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow justify-center max-md:mt-10">
                      <div className="text-xs font-medium tracking-wide text-center uppercase text-neutral-400">
                        docket details
                      </div>
                      <div className="mt-2 text-base leading-7 text-neutral-600">
                        Capture the details of the meter installed at the
                        customer’s premises
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex flex-col ml-5  max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col ml-5  max-md:ml-0 max-md:w-full">
                      <button
                        type="button"
                        className="grow justify-center px-6 py-3 mt-9 w-full text-sm font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5 max-md:mt-10"
                        onClick={() =>
                          navigate(`/billingdashboard`, {
                            state: { screen: "add-meter", applicationNumberDisplay },
                          })
                        }
                      >
                        Add Meter
                      </button>
                    </div>
                    <button
                        type="button"
                        className="grow justify-center px-6 py-3 mt-9 w-full text-sm font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5 max-md:mt-10"
                        onClick={() =>
                          navigate(`/billingdashboard`, {
                            state: { screen: "report-details", applicationNumberDisplay},
                          })
                        }
                      >
                        Report Details
                      </button>
                  </div> */}

                  <div className="flex flex-col ml-5 max-md:ml-0 max-md:w-full">
                    <>
                      {application?.customerRef ? (
                        <button
                          type="button"
                          className="justify-center px-6 py-3 mt-9 w-[200px] text-sm font-semibold text-white rounded-3xl max-md:mt-10"
                          style={{
                            background: "#9EC137",
                          }}
                          onClick={() =>
                            navigate(`/billingdashboard`, {
                              state: {
                                screen: "report-details",
                                application,
                              },
                            })
                          }
                        >
                          Report Details
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="grow justify-center px-6 py-3 mt-9 w-full text-sm font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5 max-md:mt-10"
                          onClick={() =>
                            navigate(`/billingdashboard`, {
                              state: {
                                screen: "add-meter",
                                applicationNumberDisplay,
                              },
                            })
                          }
                        >
                          Add Meter
                        </button>
                      )}
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        id="pdf-content"
        className="flex flex-col px-14 py-6 w-full max-w-[1200px] max-md:px-5 max-md:max-w-full"
        style={{ display: "none" }}
      >
        <div className="flex justify-center items-center px-16 bg-white max-md:px-5">
          <div className="flex flex-col px-14 py-6 w-full bg-stone-100 max-w-[1200px] max-md:px-5 max-md:max-w-full">
            <div className="flex gap-5 justify-between text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:flex-wrap">
              <img src="../images/imagelogo.svg" className="shrink-0 aspect-[1.25] w-[87px]" />
              <div className="my-auto max-md:max-w-full">
                TraceCorp Solutions
              </div>
            </div>
            <div className="flex flex-col px-6 pt-4 pb-5 mt-6 bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
              <div className="text-2xl font-semibold uppercase text-neutral-600 max-md:max-w-full">
                Job card <span className="uppercase">#{jobCardInfo}</span>
              </div>
              <div className="flex flex-col px-4 pt-2 pb-4 mt-6 rounded-lg bg-stone-100 max-md:max-w-full">
                <div className="text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
                  Application Information
                </div>
                <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
                <div className="flex flex-wrap w-full justify-between gap-2 content-center mt-4">
                  <div className="flex flex-col justify-center">
                    <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                      Survey Date
                    </div>
                    <div className="mt-2 text-base leading-6 text-neutral-600">
                      {applicationData.applicationDate}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                      Surveyor Name
                    </div>
                    <div className="mt-2 text-base leading-6 text-neutral-600">
                      {applicationData.user.fullName}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                      Applicant name
                    </div>
                    <div className="mt-2 text-base leading-6 text-neutral-600">
                      {fullName}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                      application no.
                    </div>
                    <div className="mt-2 text-base leading-6 text-neutral-600">
                      {applicationNumberDisplay}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-6 text-base font-semibold leading-7 text-neutral-600 max-md:flex-wrap">
                <div className="flex-1 max-md:max-w-full">
                  Distance of Premises from Main to be Tapped (in meters):
                </div>
                <div className="shrink-0 px-4 max-w-full h-12 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 w-[400px]" />
              </div>
              <div className="flex gap-2 mt-6 text-base font-semibold leading-7 text-neutral-600 max-md:flex-wrap">
                <div className="flex-1 max-md:max-w-full">
                  Type of Land between Main and Premises:
                </div>
                <div className="shrink-0 px-4 max-w-full h-12 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 w-[400px]" />
              </div>
              <div className="flex gap-2 mt-6 text-base font-semibold leading-7 text-neutral-600 max-md:flex-wrap">
                <div className="flex-1 max-md:max-w-full">
                  List any Obstructions between the Main and the Premises:
                </div>
                <div className="shrink-0 px-4 max-w-full h-12 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 w-[400px]" />
              </div>
              <div className="flex gap-2 mt-6 text-base font-semibold leading-7 text-neutral-600 max-md:flex-wrap">
                <div className="flex-1 max-md:max-w-full">
                  Type and Size of Main to be Tapped (in inches):
                </div>
                <div className="shrink-0 px-4 max-w-full h-12 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 w-[400px]" />
              </div>
              <div className="flex gap-2 mt-6 text-base font-semibold leading-7 text-neutral-600 max-md:flex-wrap">
                <div className="flex-1 max-md:max-w-full">
                  Size of the Service Pipe to be Laid (in inches):
                </div>
                <div className="shrink-0 px-4 max-w-full h-12 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 w-[400px]" />
              </div>
              <div className="flex gap-2 mt-6 text-base font-semibold leading-7 text-neutral-600 max-md:flex-wrap">
                <div className="flex-1 max-md:max-w-full">
                  Length of the Service Pipe to be Laid (in meters):
                </div>
                <div className="shrink-0 px-4 max-w-full h-12 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 w-[400px]" />
              </div>
              <div className="flex gap-2 mt-6 text-base font-semibold leading-7 text-neutral-600 max-md:flex-wrap">
                <div className="flex-1 max-md:max-w-full">
                  Ideal Connection Type for the Customer:
                </div>
                <div className="shrink-0 px-4 max-w-full h-12 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 w-[400px]" />
              </div>
              <div className="flex gap-2 mt-6 text-base font-semibold leading-7 text-neutral-600 max-md:flex-wrap">
                <div className="flex-1 max-md:max-w-full">
                  Suggested Material for Service Pipe:
                </div>
                <div className="shrink-0 px-4 max-w-full h-12 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 w-[400px]" />
              </div>
              <div className="flex gap-2 mt-6 text-base font-semibold leading-7 text-neutral-600 max-md:flex-wrap">
                <div className="flex-1 max-md:max-w-full">
                  Size of the Existing Main to be Tapped (in inches):
                </div>
                <div className="shrink-0 px-4 max-w-full h-12 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 w-[400px]" />
              </div>
              <div className="flex gap-2 mt-6 text-base font-semibold leading-7 text-neutral-600 max-md:flex-wrap">
                <div className="flex-1 max-md:max-w-full">
                  Suggested Depth of the Service Pipe Below Ground Level (in
                  feet):
                </div>
                <div className="shrink-0 px-4 max-w-full h-12 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 w-[400px]" />
              </div>
              <div className="flex gap-2 mt-6 text-base font-semibold leading-7 text-neutral-600 max-md:flex-wrap">
                <div className="flex-1 max-md:max-w-full">
                  Is the Customer Connecting from Another Customer’s Existing
                  Service Pipe?
                </div>
                <div className="shrink-0 px-4 max-w-full h-12 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 w-[400px]" />
              </div>
              <div className="flex gap-2 mt-6 text-base font-semibold leading-7 text-neutral-600 max-md:flex-wrap">
                <div className="flex-1 max-md:max-w-full">
                  Does the Customer Have Another Connection with the
                  Corporation?
                </div>
                <div className="shrink-0 px-4 max-w-full h-12 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 w-[400px]" />
              </div>
              <div className="flex gap-2 mt-6 text-base font-semibold leading-7 text-neutral-600 max-md:flex-wrap">
                <div className="flex-1 max-md:max-w-full">
                  Bloc Map Number of the Property:
                </div>
                <div className="shrink-0 px-4 max-w-full h-12 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 w-[400px]" />
              </div>
              <div className="flex gap-2 mt-6 text-base font-semibold leading-7 text-neutral-600 max-md:flex-wrap">
                <div className="flex-1 max-md:max-w-full">
                  Is There Any Nearby Customer? If Yes, Provide Customer Ref,
                  Name, and Meter Number
                </div>
                <div className="shrink-0 self-start px-4 mt-1 max-w-full h-12 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 w-[400px]" />
              </div>
              <div className="flex gap-2 mt-6 text-base font-semibold leading-7 text-neutral-600 max-md:flex-wrap">
                <div className="flex-1 max-md:max-w-full">
                  Distance of Premises from the Main to be Connected (in meters)
                </div>
                <div className="shrink-0 px-4 max-w-full h-12 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 w-[400px]" />
              </div>
              <div className="flex gap-2 mt-6 text-base font-semibold leading-7 text-neutral-600 max-md:flex-wrap">
                <div className="flex-1 max-md:max-w-full">
                  Type and Size of Main to be Connected (in inches):
                </div>
                <div className="shrink-0 px-4 max-w-full h-12 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 w-[400px]" />
              </div>
              <div className="flex gap-2 mt-6 text-base font-semibold leading-7 text-neutral-600 max-md:flex-wrap">
                <div className="flex-1 max-md:max-w-full">
                  Type of Road to be Affected and Its Width:
                </div>
                <div className="shrink-0 px-4 max-w-full h-12 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 w-[400px]" />
              </div>
              <div className="flex flex-col px-4 pt-2 pb-10 mt-6 text-base font-semibold leading-6 rounded-lg bg-stone-100 text-neutral-600 max-md:max-w-full">
                <div className="max-md:max-w-full">
                  Surveyor Recommendations and Notes
                </div>
                <div className="shrink-0 mt-4 mb-16 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:mb-10 max-md:max-w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ApplicationFormActions
        isModalVisible={isModalVisible}
        handleApproveApplication={handleApproveApplication}
        setIsModalVisible={setIsModalVisible}
      />
      <RejectApplicationFormAction
        rejectApplication={rejectApplication}
        setRejectApplication={setRejectApplication}
      />
      <ContactApplicantFormAction
        ContactApplicantForm={contactApplicantForm}
        setContactApplicantForm={setContactApplicantForm}
      />
      <AssignSurveyor
        applicationId={applicationNumber}
        assignSurveyorAction={assignSurveyorAction}
        setAssignSurveyorAction={setAssignSurveyorAction}
      />
      <SurveyorReport
        surveyorReport={surveyorReport}
        fullName={fullName}
        setSurveyorReport={setSurveyorReport}
        applicationNumberDisplay={applicationNumberDisplay}
        applicationData={applicationData}
      />
      <UpdateAuthorizeModal
        applicationData={applicationData}
        applicationNumberDisplay={applicationNumberDisplay}
        fullName={fullName}
        isUpdateModalVisible={isUpdateModalVisible}
        handleUpdateModalVisible={handleUpdateModalVisible}
      />
      {/* <Payslip visible={isVisible} onCancel={() => setIsVisible(false)} /> */}
    </div>
  );
};

export default ApplicationDetail;
