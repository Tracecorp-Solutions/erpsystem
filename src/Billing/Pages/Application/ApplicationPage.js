import * as React from "react";

function ApplicationPage() {
  return (
    <section className="flex flex-col flex-wrap justify-center content-start pb-0.5 mx-8 rounded-3xl bg-stone-100 max-md:mr-2.5 max-md:max-w-full">
      <h1 className="text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
        Applications
      </h1>
      <div className="flex gap-5 pr-20 mt-6 text-base font-semibold leading-6 text-neutral-400 max-md:flex-wrap max-md:pr-5">
        <div className="justify-center px-6 py-4 bg-white rounded-lg text-slate-500 max-md:px-5">
          Pending Applications
        </div>
        <div className="justify-center px-6 py-4 bg-white rounded-lg max-md:px-5">
          Approved Applications
        </div>
        <div className="justify-center px-6 py-4 bg-white rounded-lg max-md:px-5">
          Rejected Applications
        </div>
      </div>
      <div className="flex flex-col p-6 mt-6 bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
        <form className="flex gap-2 justify-between w-full text-base leading-6 text-neutral-400 max-md:flex-wrap max-md:max-w-full">
          <label for="search" className="sr-only">
            Search
          </label>
          <input
            type="text"
            id="search"
            className="flex gap-2 py-3 pr-6 pl-4 rounded-3xl border border-solid border-neutral-500 border-opacity-10"
            placeholder="Search Applicant, Application NO."
            aria-label="Search Applicant, Application NO."
          />
          <button className="flex gap-2 px-6 py-3 whitespace-nowrap rounded-3xl border border-solid border-neutral-500 border-opacity-30 max-md:px-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3f02b79592faed7d699dd0b3b194f3c1ae722683f5fba56d39d1ae55c28f9d41?apiKey=27ec22b9382040ef8580a5e340d3a921&"
              className="shrink-0 self-start w-6 aspect-square"
              alt="Filter icon"
            />
            <span>Filter</span>
          </button>
        </form>
        <div className="flex gap-5 justify-between items-center px-6 py-3.5 mt-4 w-full text-xs font-medium tracking-wide uppercase rounded-3xl bg-stone-100 text-neutral-400 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
          <div className="flex gap-4 self-stretch">
            <div className="shrink-0 w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
            <span className="my-auto">Applicant name</span>
          </div>
          <span className="self-stretch my-auto">application no.</span>
          <span className="self-stretch my-auto">submission Date</span>
          <span className="self-stretch my-auto">status</span>
        </div>
        {[...Array(10)].map((_, index) => (
          <React.Fragment key={index}>
            <div className="flex gap-5 justify-between items-center px-6 py-2 mt-2 w-full rounded-3xl max-md:flex-wrap max-md:px-5 max-md:max-w-full">
              <div className="flex gap-4 self-stretch my-auto text-base leading-6 bg-white text-neutral-600">
                <div className="shrink-0 my-auto w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
                <span>Jane Cooper</span>
              </div>
              <span className="self-stretch my-auto text-base leading-6 text-neutral-600">
                06062024/0067
              </span>
              <span className="justify-center self-stretch my-auto text-base leading-6 bg-white text-neutral-600">
                5th May, 2024
              </span>
              <div className="flex flex-col justify-center self-stretch my-auto text-xs font-medium tracking-wide uppercase bg-white text-neutral-600">
                <span className="justify-center px-3 py-1 rounded-xl bg-stone-100">
                  pending survey
                </span>
              </div>
              <button className="flex justify-center items-center self-stretch px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0ba5735fbf119d2ce1739ba512a932141ff0d2c39f18ebd814b74c9afd86d7c7?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                  className="w-5 aspect-square"
                  alt="More options icon"
                />
              </button>
            </div>
            {index < 9 && (
              <hr className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
            )}
          </React.Fragment>
        ))}
        <div className="flex gap-2 justify-between mt-4 w-full bg-white max-md:flex-wrap max-md:max-w-full">
          <span className="my-auto text-base leading-6 text-neutral-400">
            Showing 1 - 10 of 150
          </span>
          <div className="flex gap-2">
            <button className="flex justify-center items-center px-4 w-12 h-12 rounded-3xl bg-stone-100">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff1835eab83aaba4b3b28c08f4efdfa5b5b13efe57cf4ba87e34e28be72ba65d?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                className="w-6 aspect-square"
                alt="Previous page icon"
              />
            </button>
            <span className="justify-center items-center px-4 w-12 h-12 text-base font-semibold leading-6 text-white whitespace-nowrap rounded-3xl bg-slate-500 max-md:px-5">
              1
            </span>
            <button className="justify-center items-start px-4 py-3 text-base font-semibold leading-6 whitespace-nowrap rounded-3xl border border-solid border-neutral-500 border-opacity-10 text-neutral-400">
              2
            </button>
            <button className="flex justify-center items-center px-4 py-3 rounded-3xl border border-solid border-neutral-500 border-opacity-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c19c09b34073900dfacfc3a10ceab301e637c63c0b80eb00f201bc01a698a5ef?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                className="w-6 aspect-square"
                alt="Next page icon"
              />
            </button>
            <span className="justify-center px-4 py-3 text-base font-semibold leading-6 whitespace-nowrap rounded-3xl border border-solid border-neutral-500 border-opacity-10 text-neutral-400">
              9
            </span>
            <button className="flex justify-center items-center px-4 w-12 h-12 rounded-3xl bg-stone-100">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5638cce5b32f789274ceeb5d277945e2b48f65a50c7c69d40aaa318a0cb3751a?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                className="w-6 aspect-square"
                alt="Last page icon"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ApplicationPage;
