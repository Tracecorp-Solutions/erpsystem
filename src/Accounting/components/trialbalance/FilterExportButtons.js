import React from 'react';

const FilterExportButtons = () => {
  return (
    <div className="flex gap-2 justify-between w-full text-base leading-6 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
      <button className="flex gap-2 px-6 py-3 rounded-3xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:px-5">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3f02b79592faed7d699dd0b3b194f3c1ae722683f5fba56d39d1ae55c28f9d41?apiKey=2b51dad425e04206847488420121dc35&" className="shrink-0 self-start w-6 aspect-square" alt="" />
        <span>Filter</span>
      </button>
      <button className="flex gap-2 px-6 py-3 font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/2db10bbbfea74ab4d6421f41550d261f3b0fc63c181014f826d06ba56fed8a5c?apiKey=2b51dad425e04206847488420121dc35&" className="shrink-0 self-start w-6 aspect-square" alt="" />
        <span>Export</span>
      </button>
    </div>
  );
};

export default FilterExportButtons;