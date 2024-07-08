import React from 'react';

const Pagination = () => {
  return (
    <nav className="flex gap-2 justify-between mt-2 w-full bg-white max-md:flex-wrap max-md:max-w-full" aria-label="Pagination">
      <div className="my-auto text-base leading-6 text-neutral-400">
        Showing 1 - 10 of 150
      </div>
      <div className="flex gap-2">
        <button className="flex justify-center items-center px-4 w-12 h-12 rounded-3xl bg-stone-100" aria-label="Previous page">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff1835eab83aaba4b3b28c08f4efdfa5b5b13efe57cf4ba87e34e28be72ba65d?apiKey=2b51dad425e04206847488420121dc35&" className="w-6 aspect-square" alt="" />
        </button>
        <button className="justify-center items-center px-4 w-12 h-12 text-base font-semibold leading-6 text-white whitespace-nowrap rounded-3xl bg-slate-500 max-md:px-5">
          1
        </button>
        <button className="justify-center items-start px-4 py-3 text-base font-semibold leading-6 whitespace-nowrap rounded-3xl border border-solid border-neutral-500 border-opacity-10 text-neutral-400">
          2
        </button>
        <button className="flex justify-center items-center px-4 py-3 rounded-3xl border border-solid border-neutral-500 border-opacity-10" aria-label="Next page">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c19c09b34073900dfacfc3a10ceab301e637c63c0b80eb00f201bc01a698a5ef?apiKey=2b51dad425e04206847488420121dc35&" className="w-6 aspect-square" alt="" />
        </button>
        <button className="justify-center px-4 py-3 text-base font-semibold leading-6 whitespace-nowrap rounded-3xl border border-solid border-neutral-500 border-opacity-10 text-neutral-400">
          9
        </button>
        <button className="flex justify-center items-center px-4 w-12 h-12 rounded-3xl bg-stone-100" aria-label="Last page">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/5638cce5b32f789274ceeb5d277945e2b48f65a50c7c69d40aaa318a0cb3751a?apiKey=2b51dad425e04206847488420121dc35&" className="w-6 aspect-square" alt="" />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;