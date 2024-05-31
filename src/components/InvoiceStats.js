function InvoiceStats() {
  return (
    <div className="justify-between px-6 py-5 bg-white rounded-3xl card-width">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[36%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow font-semibold text-neutral-600 max-md:mt-10">
            <div className="text-base leading-6 text-slate-500">Bill Stats</div>
            <div className="flex gap-2 px-4 py-2 mt-2 text-xs font-medium tracking-wide uppercase rounded-3xl bg-stone-100">
              <div className="my-auto">Last 30 days</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e230b7ea2d550bf640ca159225698ee7a5b604118e1c573aef0dfaf7895e4553?"
                className="shrink-0 w-5 aspect-square"
              />
            </div>
            <div className="mt-9 text-2xl capitalize">$1,920</div>
            <div className="text-sm text-neutral-400">
              Paid in the last 30 days
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[64%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow mx-auto w-full whitespace-nowrap bg-white max-md:mt-10">
            <div className="flex gap-5 justify-between">
              <div className="justify-center items-start px-6 py-5 text-base font-semibold leading-6 text-white rounded bg-slate-500 max-md:px-5">
                20%
              </div>
              <div className="flex flex-col my-auto">
                <div className="self-start ml-5 text-base font-semibold leading-6 text-orange-400 max-md:ml-2.5">
                  $200
                </div>
                <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                  overdue
                </div>
              </div>
            </div>
            <div className="flex gap-5 justify-between mt-1">
              <div className="justify-center items-start px-6 py-5 text-base font-semibold leading-6 text-white rounded bg-slate-500 max-md:px-5">
                38%
              </div>
              <div className="flex flex-col my-auto">
                <div className="text-base font-semibold leading-6 text-lime-400">
                  $900
                </div>
                <div className="self-start ml-3 text-xs font-medium tracking-wide uppercase text-neutral-400 max-md:ml-2.5">
                  paid
                </div>
              </div>
            </div>
            <div className="flex gap-5 justify-between mt-1">
              <div className="justify-center items-start px-6 py-5 text-base font-semibold leading-6 text-white rounded bg-slate-500 max-md:px-5">
                42%
              </div>
              <div className="flex flex-col my-auto">
                <div className="text-base font-semibold leading-6 text-neutral-600">
                  $1,200
                </div>
                <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
                  Unpaid
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceStats;