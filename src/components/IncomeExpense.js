function IncomeExpense() {
  return (
    <div className="flex flex-col justify-between px-6 py-4 bg-white rounded-3xl card-width">
      <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
        <div className="my-auto text-base font-semibold leading-6 text-slate-500">
          Income and Expenses
        </div>
        <div className="flex gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase rounded-3xl bg-stone-100 text-neutral-600">
          <div className="my-auto">Last 30 days</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e230b7ea2d550bf640ca159225698ee7a5b604118e1c573aef0dfaf7895e4553?"
            className="shrink-0 w-5 aspect-square"
          />
        </div>
      </div>
      <div className="self-start mt-2 text-2xl font-semibold capitalize text-neutral-600">
        $42,000
      </div>
      <div className="self-start text-sm text-neutral-400">
        Net income for the last 30 days
      </div>
      <div className="flex gap-4 justify-between mt-4 max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col">
          <div className="flex flex-col justify-center rounded-lg bg-lime-400 bg-opacity-10">
            <div className="shrink-0 h-2 bg-lime-400 rounded-lg" />
          </div>
          <div className="mt-2 text-base font-semibold leading-6 text-neutral-600">
            $100,000
          </div>
          <div className="text-sm text-neutral-600">Income</div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col justify-center rounded-lg bg-slate-500 bg-opacity-10">
            <div className="shrink-0 h-2 rounded-lg bg-slate-500" />
          </div>
          <div className="mt-2 text-base font-semibold leading-6 text-neutral-600">
            $21,000
          </div>
          <div className="text-sm text-neutral-600">Expenses</div>
        </div>
      </div>
    </div>
  );
}

export default IncomeExpense;
