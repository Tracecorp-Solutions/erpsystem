import * as React from "react";

const UpdateTicket = () => {
return (
  <div className="flex flex-col flex-wrap justify-center content-start py-6 rounded-3xl bg-stone-100">
    <div className="flex gap-2 justify-between items-center px-6 w-full max-md:flex-wrap max-md:px-5 max-md:max-w-full">
      <div className="flex gap-2 items-center self-stretch my-auto text-base font-semibold leading-6 whitespace-nowrap text-neutral-600">
        <div className="self-stretch my-auto">Tickets</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c154d8841f585cbf3e0cb5a7536d530af74e2f624e3ed71fad0bd8d20294a6a1?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
          className="shrink-0 self-stretch my-auto w-6 aspect-square"
        />
        <div className="self-stretch px-4 py-1 bg-white rounded-2xl">001</div>
      </div>
      <div className="flex flex-col justify-center self-stretch">
        <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
          ticket status
        </div>
        <div className="px-6 py-1 mt-2 text-base leading-6 whitespace-nowrap bg-white rounded-2xl text-slate-500 max-md:px-5">
          Open
        </div>
      </div>
      <div className="flex gap-2 justify-center self-stretch py-3 pr-4 pl-6 my-auto text-base font-semibold leading-6 text-white whitespace-nowrap rounded-3xl bg-slate-500">
        <div>Actions</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d9e9fb3b6e4fe1a5ddbd4d8754a42f4070d9010e315230bdfecd57661bc397bf?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
          className="shrink-0 self-start w-6 aspect-square"
        />
      </div>
    </div>
    <div className="flex flex-col self-center px-6 pt-4 pb-6 mt-6 w-full bg-white rounded-3xl max-w-[1088px] max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 justify-between w-full font-semibold max-md:flex-wrap max-md:max-w-full">
        <div className="text-3xl capitalize text-neutral-600">
          Water Leakage Issue
        </div>
        <div className="flex gap-2 my-auto text-base leading-6 text-slate-500">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2198e70221ffacf809da97fcee817d02ff0b027edb9275bc4d15791b393739f9?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
            className="shrink-0 self-start w-6 aspect-square"
          />
          <div className="underline">Update Ticket</div>
        </div>
      </div>
      <div className="flex flex-col px-4 pt-2 pb-4 mt-6 rounded-lg bg-stone-100 max-md:max-w-full">
        <div className="text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
          Ticket Details
        </div>
        <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex gap-2 mt-4 max-md:flex-wrap">
          <div className="flex flex-col justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              created on
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              05 June 2024
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              ticket category
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              Plumbing
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              ticket source
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              Phone call
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              Ticket priority
            </div>
            <div className="mt-2 text-base leading-6 text-orange-400">
              High
            </div>
          </div>
        </div>
        <div className="flex gap-2 self-start mt-6 max-md:flex-wrap">
          <div className="flex flex-col justify-center whitespace-nowrap">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              department
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              Technical
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              ticket subcategory
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              Plumbing
            </div>
          </div>
        </div>
        <div className="mt-6 text-xs font-medium tracking-wide uppercase text-neutral-400 max-md:max-w-full">
          description
        </div>
        <div className="mt-2 text-base leading-7 text-neutral-600 max-md:max-w-full">
          The customer reports a significant water leakage from the main
          pipeline located in the kitchen area. The leak is causing water to
          spread across the floor, creating a potential slip hazard and water
          damage to nearby appliances and furniture. The issue was first
          noticed early this morning, and the flow appears to be continuous.
          Immediate attention is required to prevent further property damage
          and possible escalation to adjacent areas
        </div>
      </div>
      <div className="flex flex-col px-4 pt-2 pb-4 mt-6 rounded-lg bg-stone-100 max-md:max-w-full">
        <div className="text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
          Customer Details
        </div>
        <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex gap-2 mt-4 max-md:flex-wrap">
          <div className="flex flex-col justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              customer type
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              Registered Customer
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              customer reference
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              034FGTY3
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              FULL NAME
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              Nyaboth Deng
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              phone number
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              +211 928 123 456
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-6 max-md:flex-wrap">
          <div className="flex flex-col justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              address
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              Juba, Hai Malakal, Block 5
            </div>
          </div>
          <div className="flex flex-col justify-center whitespace-nowrap">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              area
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              Ogun
            </div>
          </div>
          <div className="flex flex-col justify-center whitespace-nowrap">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              branch
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              Abeokuta
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              territory
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              Oke llewo
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 text-2xl font-semibold capitalize text-neutral-600 max-md:max-w-full">
        Audit Trail
      </div>
      <div className="flex mt-4 text-base leading-6 text-neutral-400 max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col whitespace-nowrap">
          <div className="py-4 pr-1 pl-4 text-xs font-medium tracking-wide uppercase rounded-3xl bg-stone-100 max-md:pr-5">
            id
          </div>
          <div className="py-4 pr-1 pl-4 bg-white border-b border-neutral-500 border-opacity-10">
            01
          </div>
          <div className="py-4 pr-1 pl-4 bg-white border-b border-neutral-500 border-opacity-10">
            02
          </div>
          <div className="py-4 pr-1 pl-4 bg-white border-b border-neutral-500 border-opacity-10">
            03
          </div>
        </div>
        <div className="flex flex-col whitespace-nowrap">
          <div className="py-4 pr-1 pl-4 text-xs font-medium tracking-wide uppercase bg-stone-100 max-md:pr-5">
            status
          </div>
          <div className="py-4 pr-1 pl-4 bg-white border-b border-neutral-500 border-opacity-10 max-md:pr-5">
            Escalated
          </div>
          <div className="py-4 pr-1 pl-4 bg-white border-b border-neutral-500 border-opacity-10 max-md:pr-5">
            Escalated
          </div>
          <div className="py-4 pr-1 pl-4 bg-white border-b border-neutral-500 border-opacity-10 max-md:pr-5">
            Escalated
          </div>
        </div>
        <div className="flex flex-col">
          <div className="py-4 pr-1 pl-4 text-xs font-medium tracking-wide uppercase bg-stone-100 max-md:pr-5">
            Assigned to
          </div>
          <div className="py-4 pr-1 pl-4 bg-white border-b border-neutral-500 border-opacity-10 max-md:pr-5">
            Level 2{" "}
          </div>
          <div className="py-4 pr-1 pl-4 bg-white border-b border-neutral-500 border-opacity-10 max-md:pr-5">
            Level 3
          </div>
          <div className="py-4 pr-1 pl-4 bg-white border-b border-neutral-500 border-opacity-10 max-md:pr-5">
            Level 4
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="py-4 pr-1 pl-4 text-xs font-medium tracking-wide uppercase bg-stone-100 text-neutral-400 max-md:pr-5">
            resolution details
          </div>
          <div className="py-4 pr-1 pl-4 bg-white border-b border-neutral-500 border-opacity-10 max-md:pr-5">
            Escalated to Level 2
          </div>
          <div className="py-4 pr-1 pl-4 bg-white border-b border-neutral-500 border-opacity-10 max-md:pr-5">
            Escalated to Level 3
          </div>
          <div className="py-4 pr-1 pl-4 bg-white border-b border-neutral-500 border-opacity-10 max-md:pr-5">
            Escalated to Level 4
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="py-4 pr-1 pl-4 text-xs font-medium tracking-wide uppercase bg-stone-100 max-md:pr-5">
            recorded by
          </div>
          <div className="py-4 pr-1 pl-4 whitespace-nowrap bg-white border-b border-neutral-500 border-opacity-10 max-md:pr-5">
            ngobizadokchrist@gmail.com
          </div>
          <div className="py-4 pr-1 pl-4 whitespace-nowrap bg-white border-b border-neutral-500 border-opacity-10 max-md:pr-5">
            ngobizadokchrist@gmail.com
          </div>
          <div className="py-4 pr-1 pl-4 whitespace-nowrap bg-white border-b border-neutral-500 border-opacity-10 max-md:pr-5">
            ngobizadokchrist@gmail.com
          </div>
        </div>
        <div className="flex flex-col">
          <div className="py-4 pr-1 pl-4 text-xs font-medium tracking-wide uppercase bg-stone-100 max-md:pr-5">
            date resolved
          </div>
          <div className="py-4 pr-1 pl-4 whitespace-nowrap bg-white border-b border-neutral-500 border-opacity-10 max-md:pr-5">
            2024/07/15
          </div>
          <div className="py-4 pr-1 pl-4 whitespace-nowrap bg-white border-b border-neutral-500 border-opacity-10 max-md:pr-5">
            2024/07/14
          </div>
          <div className="py-4 pr-1 pl-4 whitespace-nowrap bg-white border-b border-neutral-500 border-opacity-10 max-md:pr-5">
            2024/07/13
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default UpdateTicket;
