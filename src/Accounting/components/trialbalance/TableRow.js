import React from 'react';

const TableRow = ({ account, description, credit, debit }) => {
  return (
    <div className="flex gap-5 justify-between px-6 py-3 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
      <div className="justify-center bg-white">{account}</div>
      <div className="text-ellipsis text-center">{description}</div>
      <div className="justify-center font-semibold whitespace-nowrap bg-white">{credit}</div>
      <div className="justify-center font-semibold whitespace-nowrap bg-white">{debit}</div>
    </div>
  );
};

export default TableRow;