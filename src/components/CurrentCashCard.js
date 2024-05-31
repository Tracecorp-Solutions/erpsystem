function CurrentCashCard() {
  return (
    <div className="justify-between px-6 py-4 bg-white rounded-3xl card-width">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[36%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow justify-between text-sm font-semibold text-neutral-400 max-md:mt-10">
            <div className="text-2xl capitalize text-neutral-600">$25,000</div>
            <div>Current cash Balance</div>
            <div className="mt-20 text-base leading-6 text-lime-400 max-md:mt-10">
              +8.7% more
            </div>
            <div>From last month</div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[64%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c1c0d57e8cc313fa2a79c020facead4ad1b18cc54a9bf7c958444b6759160d2?"
            className="grow mt-16 w-full aspect-[2.78] max-md:mt-10"
          />
        </div>
      </div>
    </div>
  );
}

export default CurrentCashCard;
