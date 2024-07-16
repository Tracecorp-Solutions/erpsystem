import * as React from "react";
import { useLocation } from "react-router-dom";

const ViewSurveyorDetails = () => {

    const location = useLocation();
    const { state } = location;
    const surveyReport = state?.surveyReport;

    console.log("surveyReport surveyReport surveyReport", surveyReport);
return (
  <div className="flex flex-col flex-wrap justify-center content-start py-6 rounded-3xl bg-stone-100">
    <div className="flex flex-col self-center px-6 pt-4 pb-6 mt-6 w-full bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 justify-between w-full font-semibold max-md:flex-wrap max-md:max-w-full">
        <div className="text-2xl capitalize text-neutral-600">
          Survey Details Report
        </div>
        <div className="flex gap-2 my-auto text-base leading-6 text-slate-500">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d8f00bb04324ac52ecee336d207e60652854eafe383d7350aed6422bd347fd96?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
            className="shrink-0 self-start w-6 aspect-square"
          />
          <div className="underline">Edit Report</div>
        </div>
      </div>
      <div className="flex flex-col px-4 pt-2 pb-4 mt-6 rounded-lg bg-stone-100 max-md:max-w-full">
        <div className="text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
          Application Information
        </div>
        <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex flex-wrap gap-2 justify-between content-center mt-4">
          <div className="flex flex-col justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              Survey Date
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              {new Date(surveyReport.dateCreated).toLocaleDateString()}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              Surveyor Name
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
            {surveyReport.surveyor.fullName}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              Applicant name
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
            {surveyReport.application.fullName}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              application no.
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              {surveyReport.application.applicationNumber}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-4 pt-2 pb-4 mt-6 text-base leading-6 rounded-lg bg-stone-100 text-neutral-600 max-md:max-w-full">
        <div className="font-semibold max-md:max-w-full">
          Distance from Main Line
        </div>
        <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="self-start mt-2 text-neutral-400 max-md:max-w-full">
          What is the distance (in meters) from the main line to the premises
          to be connected?
        </div>
        <div className="self-start mt-1 max-md:max-w-full">{surveyReport.distanceFromMain} {" "} meters</div>
      </div>
      <div className="flex flex-col px-4 pt-2 pb-4 mt-6 text-base leading-6 rounded-lg bg-stone-100 text-neutral-600 max-md:max-w-full">
        <div className="font-semibold max-md:max-w-full">Land Type</div>
        <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="self-start mt-2 text-neutral-400 max-md:max-w-full">
          What is the type of land between the main line and the premises?
        </div>
        <div className="self-start mt-1 max-md:max-w-full">{surveyReport.landType}</div>
      </div>
      <div className="flex flex-col px-4 pt-2 pb-4 mt-6 text-base leading-6 rounded-lg bg-stone-100 text-neutral-600 max-md:max-w-full">
        <div className="font-semibold max-md:max-w-full">Obstructions</div>
        <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="self-start mt-2 text-neutral-400 max-md:max-w-full">
          Are there any obstructions between the main line and the premises?
          If yes, please list them.
        </div>
        <div className="self-start mt-1 max-md:max-w-full">
          {surveyReport.obstractions}
        </div>
      </div>
      <div className="flex flex-col px-4 pt-2 pb-4 mt-6 text-base leading-6 rounded-lg bg-stone-100 text-neutral-600 max-md:max-w-full">
        <div className="font-semibold max-md:max-w-full">
          Main Line 
        </div>
        <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="self-start mt-2 text-neutral-400 max-md:max-w-full">
          What is the type and size (in inches) of the main line to be tapped?
        </div>
        <div className="self-start mt-1 max-md:max-w-full">{surveyReport.servicePipeSize}</div>
      </div>
    </div>
  </div>
);
}


export default ViewSurveyorDetails;
