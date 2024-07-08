import React from 'react';

const TableHeader = () => {
  return (
    <header className="flex gap-5 justify-between px-6 py-4 mt-4 w-full text-xs font-medium tracking-wide uppercase whitespace-nowrap rounded-3xl bg-stone-100 text-neutral-400 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 justify-between">
        <div>Account</div>
        <div>description</div>
      </div>
      <div className="flex gap-5 justify-between">
        <div>credit</div>
        <div>debit</div>
      </div>
    </header>
  );
};

export default TableHeader;