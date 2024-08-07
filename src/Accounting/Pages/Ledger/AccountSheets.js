import React from "react";
import { Table } from "antd";
import BalanceSheetFilterDate from "./BalanceSheetFilterDate";

const AccountSheet = () => {
  const tablesData = [
    {
      title: "Assets",
      data: [
        {
          key: "1",
          account: "Asset 1",
          debit: 1000,
          credit: 500,
        },
        {
          key: "2",
          account: "Asset 2",
          debit: 700,
          credit: 900,
        },
      ],
    },
    {
      title: "Liabilities",
      data: [
        {
          key: "1",
          account: "Liability 1",
          debit: 500,
          credit: 1000,
        },
        {
          key: "2",
          account: "Liability 2",
          debit: 900,
          credit: 700,
        },
      ],
    },
  ];

  const renderTotalAmount = (text, record) => record.debit - record.credit;

  const columns = [
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: renderTotalAmount,
    },
  ];

  return (
    <div className="container mx-auto mt-6">
      {/* <BalanceSheetFilterDate />
      {tablesData.map((table, index) => (
        <div key={index} className="mb-6">
          <Table
            dataSource={table.data}
            columns={[
              {
                ...columns[0],
                title: table.title,
              },
              ...columns.slice(1),
            ]}
            pagination={false}
          />
        </div>
      ))} */}
       <div className="flex flex-col p-6 text-base leading-6 bg-white rounded-3xl max-md:px-5">
      <div className="flex gap-2 justify-between w-full whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-2 px-6 py-3 rounded-3xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:px-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3f02b79592faed7d699dd0b3b194f3c1ae722683f5fba56d39d1ae55c28f9d41?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
            className="shrink-0 self-start w-6 aspect-square"
          />
          <div>Filter</div>
        </div>
        <div className="flex gap-2 px-6 py-3 font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2db10bbbfea74ab4d6421f41550d261f3b0fc63c181014f826d06ba56fed8a5c?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
            className="shrink-0 self-start w-6 aspect-square"
          />
          <div>Export</div>
        </div>
      </div>
      <div className="flex gap-5 justify-between px-6 py-4 mt-4 text-xs font-medium tracking-wide uppercase rounded-3xl bg-stone-100 text-neutral-400 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div>Assets</div>
        <div>total amount</div>
      </div>
      <div className="flex gap-5 justify-between px-6 py-3 mt-2 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="justify-center bg-white">Current Assets</div>
        <div className="justify-center font-semibold whitespace-nowrap bg-white">
          $1,000
        </div>
      </div>
      <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="flex gap-5 justify-between px-6 py-3 mt-2 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="justify-center bg-white">Long-term Assets</div>
        <div className="justify-center font-semibold whitespace-nowrap bg-white">
          $1,000
        </div>
      </div>
      <div className="flex gap-5 justify-between px-6 py-4 mt-6 text-xs font-medium tracking-wide uppercase rounded-3xl bg-stone-100 text-neutral-400 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div>liabilities</div>
        <div>total amount</div>
      </div>
      <div className="flex gap-5 justify-between px-6 py-3 mt-2 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="justify-center bg-white">Current Liabilities</div>
        <div className="justify-center font-semibold whitespace-nowrap bg-white">
          $1,400
        </div>
      </div>
      <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="flex gap-5 justify-between px-6 py-3 mt-2 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="justify-center bg-white">Long-term Liabilities</div>
        <div className="justify-center font-semibold whitespace-nowrap bg-white">
          $1,000
        </div>
      </div>
      <div className="flex gap-5 justify-between px-6 py-4 mt-6 text-xs font-medium tracking-wide uppercase rounded-3xl bg-stone-100 text-neutral-400 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div>equity</div>
        <div>total amount</div>
      </div>
      <div className="flex gap-5 justify-between px-6 py-3 mt-2 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="justify-center bg-white">Current Assets</div>
        <div className="justify-center font-semibold whitespace-nowrap bg-white">
          $1,000
        </div>
      </div>
      <div className="flex gap-5 justify-between px-6 py-4 mt-6 text-xs font-medium tracking-wide uppercase rounded-3xl bg-stone-100 text-neutral-400 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div>expenses</div>
        <div>total amount</div>
      </div>
      <div className="flex gap-5 justify-between px-6 py-3 mt-2 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="justify-center bg-white">Current Expenses</div>
        <div className="justify-center font-semibold whitespace-nowrap bg-white">
          $1,400
        </div>
      </div>
      <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="flex gap-5 justify-between px-6 py-3 mt-2 font-semibold whitespace-nowrap rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="shrink-0 max-w-full bg-white h-[26px] w-[300px]" />
        <div className="justify-center bg-white">$1,000</div>
      </div>
    </div>
    </div>
  );
};

export default AccountSheet;



