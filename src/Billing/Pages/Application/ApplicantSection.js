const ApplicantSection = ({ title, children }) => {
  return (
    <section className="flex flex-col px-4 pt-2 pb-4 mt-6 rounded-lg bg-stone-100 max-md:max-w-full">
      <h2 className="text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
        {title}
      </h2>
      <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      {children}
    </section>
  );
};

export default ApplicantSection
