import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MeterDetails = () => {
  const location = useLocation();
  const { state } = location;
  const application = state?.application;

  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-wrap justify-center content-start pt-6 pb-4 rounded-3xl bg-stone-100">
      <div className="flex gap-2 items-center px-6 text-base font-semibold leading-6 text-neutral-600 max-md:flex-wrap max-md:px-5">
        <div className="self-stretch my-auto">Applications</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
          className="shrink-0 self-stretch my-auto w-6 aspect-square"
        />
        <div className="justify-center self-stretch px-4 py-1 whitespace-nowrap bg-white rounded-2xl">
          {application?.application.applicationNumber}
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
          className="shrink-0 self-stretch my-auto w-6 aspect-square"
        />
        <div className="self-stretch my-auto max-md:max-w-full">
          Docket Initiation
        </div>
      </div>
      <div className="flex flex-col self-center px-6 pt-6 pb-4 mt-6 w-full bg-white rounded-3xl max-w-[1088px] max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between w-full font-semibold max-md:flex-wrap max-md:max-w-full">
          <div className="text-2xl capitalize text-neutral-600">
            Field Connection Details Report
          </div>
          <button
            className="flex gap-2 my-auto text-base leading-6 text-slate-500"
            onClick={() =>
              navigate(`/billingdashboard`, {
                state: {
                  screen: "edit-docket-initiation",
                  application
                },
              })
            }
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/28646497e0d940e907e917326b6524fb1bcf7fd8f0e255904c2cf14fe164efa5?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
              className="shrink-0 self-start w-6 aspect-square"
            />
            <div className="underline">Edit Report</div>
          </button>
        </div>
        <div className="flex flex-col px-4 pt-2 pb-4 mt-6 rounded-lg bg-stone-100 max-md:max-w-full">
          <div className="text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Installation Information
          </div>
          <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
          <div className="flex gap-2 mt-4 max-md:flex-wrap w-full justify-between">
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                INSTALLATION DATE
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {application?.dateOfInstallation}
              </div>
            </div>
            <div className="flex gap-2 max-md:flex-wrap w-3/4 justify-between">
              <div className="flex flex-col justify-center">
                <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                  customer type
                </div>
                <div className="mt-2 text-base leading-6 text-neutral-600">
                  Prepaid
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                  BLOCK NUMBER
                </div>
                <div className="mt-2 text-base leading-6 text-neutral-600">
                  {application?.blockNumber}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                  customer reference
                </div>
                <div className="mt-2 text-base leading-6 text-neutral-600">
                  {application?.customerRef}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-6 max-md:flex-wrap w-2/4">
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                installed by
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {application?.installedBy}
              </div>
            </div>
            <div className="flex flex-col justify-center max-md:max-w-full text-center w-3/4">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400 max-md:max-w-full text-center">
                engineer remarks
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600 max-md:max-w-full">
                {application?.remarks}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-4 pt-2 pb-4 mt-6 rounded-lg bg-stone-100 justify-between w-full">
          <div className="text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Meter Information
          </div>
          <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
          <div className="flex gap-2 mt-4 max-md:flex-wrap justify-between w-full">
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                meter number
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {application?.meterNumber}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                meter size
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {application?.meterSize}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                METER TYPE
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {application?.meterType}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                MANUFACTURED DATE
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {application?.meterManufactureDate}
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-6 max-md:flex-wrap max-md:pr-5 w-2/3 justify-between">
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                LOCATION COORDINATES
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {application?.locationCordinates}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                meter initial reading
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {application?.initialReading}
              </div>
            </div>
            <div className="flex flex-col justify-center whitespace-nowrap">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                dials
              </div>
              <div className="mt-2 text-base leading-6 text-neutral-600">
                {application?.dials}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeterDetails;
