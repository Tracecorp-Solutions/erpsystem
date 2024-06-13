import * as React from "react";

function ApplicantSection({ title, children }) {
  return (
    <section className="flex flex-col px-4 pt-2 pb-4 mt-6 rounded-lg bg-stone-100 max-md:max-w-full">
      <h2 className="text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">{title}</h2>
      <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      {children}
    </section>
  );
}

function Document({ src, name, description }) {
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 justify-between px-4 py-5 rounded-xl bg-stone-100">
        <div className="flex flex-col text-sm text-center text-neutral-600">
          <img loading="lazy" src={src} alt={name} className="w-8 aspect-square" />
          <div className="mt-2">{name}</div>
        </div>
        <div className="flex justify-center items-center self-end px-2 mt-7 w-8 h-8 rounded-3xl bg-slate-500">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e26c3fe38d1183a0ed31b3a41a00f1bbd67b7f3f4264dcf95c2481c813f84e09?apiKey=27ec22b9382040ef8580a5e340d3a921&" alt="" className="aspect-square w-[18px]" />
        </div>
      </div>
      <div className="mt-2 text-xs font-medium tracking-wide uppercase text-neutral-400">{description}</div>
    </div>
  );
}

function ApplicationDetail() {
  return (
    <div className="flex flex-col flex-wrap justify-center content-start items-center py-6 rounded-3xl bg-stone-100">
      <header className="flex gap-2 items-center self-stretch px-6 text-base font-semibold leading-6 whitespace-nowrap text-neutral-600 max-md:flex-wrap max-md:px-5">
        <h1 className="self-stretch my-auto">Applications</h1>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=27ec22b9382040ef8580a5e340d3a921&" alt="" className="shrink-0 self-stretch my-auto w-6 aspect-square" />
        <div className="justify-center self-stretch px-4 py-1 bg-white rounded-2xl">APP567890</div>
      </header>

      <section className="flex gap-4 justify-between items-center px-5 mt-6 w-full max-w-[1088px] max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-4 self-stretch font-semibold">
          <div className="justify-center items-center px-3.5 text-2xl text-white capitalize whitespace-nowrap bg-lime-400 h-[60px] rounded-[50px] w-[60px]">GE</div>
          <div className="text-4xl leading-[57.6px] text-neutral-600">Grace Eze</div>
        </div>
        <div className="flex flex-col justify-center self-stretch my-auto">
          <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">current status</div>
          <div className="justify-center px-4 py-1 mt-2 text-base leading-6 bg-white rounded-2xl text-neutral-600">Pending Survey</div>
        </div>
        <div className="flex gap-2 justify-center self-stretch py-3 pr-4 pl-6 my-auto text-base font-semibold leading-6 text-white whitespace-nowrap rounded-3xl bg-slate-500" role="button" tabIndex="0">
          <div>Actions</div>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/bd69caf513a031a441b0ae2c28050f8e01024dfd2f15fb76144d64f2f7d9df8f?apiKey=27ec22b9382040ef8580a5e340d3a921&" alt="" className="shrink-0 self-start w-6 aspect-square" />
        </div>
      </section>

      <article className="flex flex-col px-6 pt-4 pb-5 mt-6 w-full bg-white rounded-3xl max-w-[1088px] max-md:px-5 max-md:max-w-full">
        <header className="flex gap-4 justify-between text-2xl font-semibold capitalize text-neutral-600 max-md:flex-wrap max-md:max-w-full">
          <h2>Applicant Details</h2>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=27ec22b9382040ef8580a5e340d3a921&" alt="" className="shrink-0 my-auto w-6 aspect-square" />
        </header>

        <ApplicantSection title="Applicant Information">
          <div className="flex flex-wrap gap-2 content-center mt-4">
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">full name</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">Ms. Grace Eze</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">Date of birth</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">15th March, 1985</div>
            </div>
            <div className="flex flex-col justify-center whitespace-nowrap">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">EMAIL</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">janecooper@email.com</div>
            </div>
            <div className="flex flex-col justify-center whitespace-nowrap">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">PHONE</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">08087654321</div>
            </div>
          </div>
        </ApplicantSection>

        <ApplicantSection title="Residential Information">
          <div className="flex gap-2 mt-4 max-md:flex-wrap">
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">Street Address</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">Unity Street</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">nearest Landmark</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">Unity Primary School</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">Plot Number</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">12</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">Operation Area</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">Abeokuta South</div>
            </div>
          </div>
          <div className="flex gap-2 mt-6 max-md:flex-wrap">
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">state</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">Ogun State</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">branch</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">Abeokuta Main</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">territory</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">Oke Ilewo</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">sub territory</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">Unity Estate</div>
            </div>
          </div>
        </ApplicantSection>

        <ApplicantSection title="Connection Details">
          <div className="flex flex-wrap gap-2 content-center mt-4">
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">Application Number</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">APP567890</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">Submission Date</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">1st June 2024</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">Type of Connection</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">New Connection</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">Connection Status</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">Pending Survey</div>
            </div>
          </div>
        </ApplicantSection>
      </article>

      <section className="flex flex-col px-6 pt-4 pb-5 mt-6 w-full bg-white rounded-3xl max-w-[1088px] max-md:px-5 max-md:max-w-full">
        <header className="flex gap-4 justify-between text-2xl font-semibold capitalize whitespace-nowrap text-neutral-600 max-md:flex-wrap max-md:max-w-full">
          <h2>Documents</h2>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=27ec22b9382040ef8580a5e340d3a921&" alt="" className="shrink-0 my-auto w-6 aspect-square" />
        </header>
        <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="mt-4 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <Document src="https://cdn.builder.io/api/v1/image/assets/TEMP/e15c1d14b61ebe9160b96a514752c440bc2ed56b9365542b050e313b08bfb7a7?apiKey=27ec22b9382040ef8580a5e340d3a921&" name="Profile pic.PNG" description="passport photo" />
            <Document src="https://cdn.builder.io/api/v1/image/assets/TEMP/c50aa64a000b557051f3507859ff49f84f225f25d8c449dbc2dd915d76344779?apiKey=27ec22b9382040ef8580a5e340d3a921&" name="National ID.PNG" description="national id" />
            <Document src="https://cdn.builder.io/api/v1/image/assets/TEMP/47a8036c7569f00568d2dd568ab0c321a6ee6dd59b052a2313ca34056c95fbaa?apiKey=27ec22b9382040ef8580a5e340d3a921&" name="Ownership.PDF" description="proof of ownership" />
            <Document src="https://cdn.builder.io/api/v1/image/assets/TEMP/f88971b08c1f19e72ce4982cf9837699cfe2b82778d0e77f5ccafffe88673fea?apiKey=27ec22b9382040ef8580a5e340d3a921&" name="Sales.PDF" description="land/sales agreement" />
          </div>

          <div className="flex gap-2 justify-between px-4 py-5 mt-6 max-w-full rounded-xl bg-stone-100 w-[246px]">
            <div className="flex flex-col text-sm text-center text-neutral-600">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/15bab7d3ee1870a044e0dfd0c115fc617faff32818483e187eb058feb34aa48a?apiKey=27ec22b9382040ef8580a5e340d3a921&" alt="Local Authority" className="w-8 aspect-square" />
              <div className="mt-2">Local Authority.PDF</div>
            </div>
            <div className="flex justify-center items-center self-end px-2 mt-7 w-8 h-8 rounded-3xl bg-slate-500">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e26c3fe38d1183a0ed31b3a41a00f1bbd67b7f3f4264dcf95c2481c813f84e09?apiKey=27ec22b9382040ef8580a5e340d3a921&" alt="" className="aspect-square w-[18px]" />
            </div>
          </div>
          <div className="self-start mt-2 text-xs font-medium tracking-wide uppercase text-neutral-400">local authority permission</div>
        </div>
      </section>

      <section className="flex flex-col px-6 pt-4 pb-5 mt-6 w-full bg-white rounded-3xl max-w-[1088px] max-md:px-5 max-md:max-w-full">
        <header className="flex gap-4 justify-between text-2xl font-semibold capitalize text-neutral-600 max-md:flex-wrap max-md:max-w-full">
          <h2>Surveyor Report</h2>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=27ec22b9382040ef8580a5e340d3a921&" alt="" className="shrink-0 my-auto w-6 aspect-square" />
        </header>
        <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex gap-5 justify-between mt-4 max-md:flex-wrap">
          <div className="flex gap-2 justify-between px-6 py-4 rounded-xl bg-stone-100 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
            <div className="flex flex-col justify-center text-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">Surveyor Assigned</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">No surveyor assigned yet</div>
            </div>
            <button className="justify-center self-start px-6 py-3 mt-2.5 text-sm font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5">Assign Surveyor</button>
          </div>

          <div className="flex gap-2 justify-between px-6 py-4 rounded-xl bg-stone-100 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
            <div className="flex flex-col justify-center text-center">
              <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">JOB CARD</div>
              <div className="mt-2 text-base leading-6 text-neutral-600">No Job card generated yet</div>
            </div>
            <button className="justify-center self-start px-6 py-3 mt-2.5 text-sm font-semibold text-white whitespace-nowrap rounded-3xl bg-slate-500 max-md:px-5">Generate</button>
          </div>
        </div>

        <div className="flex gap-2 justify-between px-6 py-4 mt-4 max-w-full rounded-xl bg-stone-100 w-[508px] max-md:flex-wrap max-md:px-5">
          <div className="flex flex-col justify-center text-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">Surveyor report</div>
            <div className="mt-2 text-base leading-6 text-neutral-600">Application is pending survey</div>
          </div>
          <button className="justify-center self-start px-6 py-3 mt-2.5 text-sm font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5">Update Findings</button>
        </div>
      </section>
    </div>
  );
}

export default ApplicationDetail;
