function RecentTransactions() {
  return (
    <div className="flex flex-col px-6 py-4 bg-white rounded-3xl w-full">
      <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
        <div className="my-auto text-base font-semibold leading-6 text-slate-500">
          Recent Transactions
        </div>
        <div className="flex gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase rounded-3xl bg-stone-100 text-neutral-600">
          <div className="my-auto">last 5</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e230b7ea2d550bf640ca159225698ee7a5b604118e1c573aef0dfaf7895e4553?"
            className="shrink-0 w-5 aspect-square"
          />
        </div>
      </div>
      <div className="flex gap-5 justify-between px-6 py-3.5 mt-4 w-full text-xs font-medium tracking-wide uppercase whitespace-nowrap rounded-3xl bg-stone-100 text-neutral-400 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex flex-1 gap-3.5">
          <div className="flex gap-4">
            <div className="shrink-0 w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
            <div className="my-auto">Status</div>
          </div>
          <div className="my-auto">Transaction</div>
        </div>
        <div className="flex flex-1 gap-5 justify-between my-auto">
          <div>Amount</div>
          <div>Date</div>
        </div>
      </div>
      <div className="flex gap-3.5 justify-between px-6 py-3 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex gap-4 my-auto text-xs font-medium tracking-wide text-lime-400 uppercase whitespace-nowrap bg-white">
          <div className="shrink-0 self-start w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
          <div className="justify-center px-3 py-1 rounded-xl bg-lime-400 bg-opacity-10">
            PAID
          </div>
        </div>
        <div className="justify-center bg-white">Deposit to Acme Inc.</div>
        <div className="justify-center items-end px-16 font-semibold whitespace-nowrap bg-white">
          $1,000
        </div>
        <div className="justify-center items-end px-16 bg-white">
          5th May, 2024
        </div>
      </div>
      <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="flex gap-3.5 justify-between px-6 py-3 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex gap-4 my-auto text-xs font-medium tracking-wide text-orange-400 uppercase whitespace-nowrap bg-white">
          <div className="shrink-0 self-start w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
          <div className="justify-center px-3 py-1 rounded-xl bg-orange-400 bg-opacity-10">
            OVERDUE
          </div>
        </div>
        <div className="justify-center bg-white">
          Payment to Utility company
        </div>
        <div className="justify-center items-end px-16 font-semibold whitespace-nowrap bg-white">
          $150
        </div>
        <div className="justify-center items-end px-16 bg-white">
          3rd May, 2024
        </div>
      </div>
      <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="flex gap-3.5 justify-between px-6 py-3 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex gap-4 my-auto text-xs font-medium tracking-wide uppercase whitespace-nowrap bg-white text-neutral-400">
          <div className="shrink-0 self-start w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
          <div className="justify-center px-3 py-1 rounded-xl bg-stone-100">
            UNPAID
          </div>
        </div>
        <div className="justify-center bg-white">
          Transfer to Savings account
        </div>
        <div className="justify-center items-end px-16 font-semibold whitespace-nowrap bg-white">
          $500
        </div>
        <div className="justify-center items-end px-16 bg-white">
          1st May, 2024
        </div>
      </div>
      <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="flex gap-3.5 justify-between px-6 py-3 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex gap-4 my-auto text-xs font-medium tracking-wide text-lime-400 uppercase whitespace-nowrap bg-white">
          <div className="shrink-0 self-start w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
          <div className="justify-center px-3 py-1 rounded-xl bg-lime-400 bg-opacity-10">
            PAID
          </div>
        </div>
        <div className="justify-center bg-white">
          Payment for Office supplies
        </div>
        <div className="justify-center items-end px-16 font-semibold whitespace-nowrap bg-white">
          $200
        </div>
        <div className="justify-center items-end px-16 bg-white">
          28th Apr, 2024
        </div>
      </div>
      <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="flex gap-3.5 justify-between px-6 py-3 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex gap-4 my-auto text-xs font-medium tracking-wide text-lime-400 uppercase whitespace-nowrap bg-white">
          <div className="shrink-0 self-start w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
          <div className="justify-center px-3 py-1 rounded-xl bg-lime-400 bg-opacity-10">
            PAID
          </div>
        </div>
        <div className="justify-center bg-white">
          Payment to Marketing agency
        </div>
        <div className="justify-center items-end px-16 font-semibold whitespace-nowrap bg-white">
          $300
        </div>
        <div className="justify-center items-end px-16 bg-white">
          25th Apr, 2024
        </div>
      </div>
    </div>
  );
}

export default RecentTransactions;
