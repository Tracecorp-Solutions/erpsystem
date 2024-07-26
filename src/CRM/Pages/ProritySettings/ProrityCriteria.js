import React from "react";
import { Table } from "antd";

const ProrityCriteria = () => {
  const columns = [
    {
      title: "Criteria Type",
      dataIndex: "criteriaType",
      key: "criteriaType",
      render: (text) => (
        <div className="py-5 pr-1 pl-4 text-xs font-medium tracking-wide uppercase bg-stone-100 text-neutral-400 max-md:pr-5">
          {text}
        </div>
      ),
    },
    {
      title: "Condition",
      dataIndex: "condition",
      key: "condition",
      render: (text) => (
        <div className="py-4 pr-1 pl-4 bg-white border-b border-solid border-neutral-500 border-opacity-10">
          {text}
        </div>
      ),
    },
    {
      title: "Assigned Priority",
      dataIndex: "assignedPriority",
      key: "assignedPriority",
      render: (text) => (
        <div className="py-4 pr-1 pl-4 whitespace-nowrap bg-white border-b border-solid border-neutral-500 border-opacity-10 max-md:pr-5">
          {text}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => (
          <div className="flex justify-center items-center px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/73f5d2a5d03447ac57c7af3e21151d0a0f83261585e6422a613b52e9f20aa177?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
              className="w-5 aspect-square"
              alt="Action"
            />
          </div>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      criteriaType: "Urgency",
      condition: "Urgent",
      assignedPriority: "High",
    },
    {
      key: "2",
      criteriaType: "Impact",
      condition: "High",
      assignedPriority: "High",
    },
    {
      key: "3",
      criteriaType: "Impact",
      condition: "Medium",
      assignedPriority: "Medium",
    },
  ];

  return (
    <div className="flex flex-col justify-center content-start py-6 rounded-3xl bg-stone-100">
      
      <div className="flex gap-2 px-6 text-base leading-6 text-neutral-600 max-md:flex-wrap max-md:px-5">
        <div className="font-semibold">Configuration</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
          className="shrink-0 self-start w-6 aspect-square"
          alt="Configuration Image"
        />
        <div className="max-md:max-w-full">Priority Criteria</div>
      </div>
      <div className="flex flex-col self-center p-6 mt-6 w-full bg-white rounded-3xl max-md:px-5 w-full">
        <div className="flex gap-4 justify-between w-full font-semibold leading-[160%] max-md:flex-wrap max-md:max-w-full">
          <div className="text-4xl capitalize text-neutral-600">Priorities Criteria</div>
          <div className="flex gap-2 justify-center px-6 py-3 my-auto text-base text-white rounded-3xl bg-slate-500 max-md:px-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a6fbf858a262ca173836b28ea1635646ad60c82456acd8cee2b922f3be3bea7?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
              className="shrink-0 self-start w-6 aspect-square"
              alt="Add Criteria"
            />
            <div>Add Criteria</div>
          </div>
        </div>
        <Table dataSource={data} columns={columns} pagination={false} />
      </div>
    </div>
  );
};

export default ProrityCriteria;
