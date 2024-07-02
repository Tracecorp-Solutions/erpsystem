import React, { useState } from "react";
import {
  DatePicker,
  Select,
  Modal,
  Table,
  Space,
  Typography,
  Checkbox,
  Dropdown,
  Menu,
  Button,
} from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import BillingDetailsPeriodsDrawer from "./Actions/BillingPeriodDetailsDrawer";

const { Option } = Select;
const { Text } = Typography;

const BillPeriodSetup = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    operationArea: "Abeokuta",
    startDate: null,
    endDate: null,
  });
  const [data, setData] = useState([
    {
      key: "1",
      code: "213032024",
      period: "032024",
      cycle: "30",
      startDate: "01/03/2024",
      endDate: "31/03/2024",
      isClosed: "No",
      closedBy: "Ogun Billing",
      isChecked: false,
    },
  ]);

  const [drawerVisible, setDrawerVisible] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setIsModalVisible(false);
    setFormData({
      operationArea: "Abeokuta",
      startDate: null,
      endDate: null,
    });
  };

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleAddBillingPeriodClick = () => {
    setIsFormVisible(true);
  };

  const handleViewBillingPeriodsClick = () => {
    setIsFormVisible(false);
  };

  const renderMenu = () => (
    <Menu>
      <Menu.Item key="1">
        <Button type="text" onClick={() => setDrawerVisible(true)}>
          View Periods Details
        </Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button type="text">
          Close Period
        </Button>
      </Menu.Item>
    </Menu>
  );


  const columns = [
    {
      title: (
        <div className="flex gap-4 items-center">
          <div className="w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
          <div>Code</div>
        </div>
      ),
      dataIndex: "code",
      key: "code",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Period",
      dataIndex: "period",
      key: "period",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Cycle",
      dataIndex: "cycle",
      key: "cycle",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Is Closed",
      dataIndex: "isClosed",
      key: "isClosed",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Closed By",
      dataIndex: "closedBy",
      key: "closedBy",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown overlay={renderMenu(record)} placement="bottomRight">
          <Button
            type="text"
            icon={
              <EllipsisOutlined style={{ fontSize: 20, color: "#1890ff" }} />
            }
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="flex flex-col flex-wrap justify-center content-start px-8 py-6 rounded-3xl bg-white leading-[160%] max-md:px-5">
      <div className="text-4xl font-semibold text-neutral-600 max-md:max-w-full">
        Billing Period Setup
      </div>
      <div className="flex gap-5 pr-20 mt-10 bg-white font-semibold max-md:flex-wrap max-md:pr-5">
        <button
          type="button"
          className={`justify-center px-6 py-4 rounded-lg ${
            isFormVisible
              ? "bg-stone-100 text-slate-500"
              : "bg-white text-neutral-400"
          } max-md:px-5`}
          onClick={handleAddBillingPeriodClick}
        >
          Add Billing Period
        </button>
        <button
          type="button"
          className={`justify-center px-6 py-4 rounded-lg ${
            !isFormVisible
              ? "bg-stone-100 text-slate-500"
              : "bg-white text-neutral-400"
          } max-md:px-5`}
          onClick={handleViewBillingPeriodsClick}
        >
          View Billing Periods
        </button>
      </div>
      {isFormVisible ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-6 mt-6 text-base bg-white rounded-3xl max-md:px-5 w-full"
        >
          <div className="mt-8 font-semibold text-neutral-600 max-md:max-w-full">
            Operation Area
          </div>
          <Select
            defaultValue="Abeokuta"
            style={{ width: "100%" }}
            className="h-14 mt-2"
            onChange={(value) => handleChange("operationArea", value)}
            value={formData.operationArea}
          >
            <Option value="Abeokuta">Abeokuta</Option>
            <Option value="Lagos">Lagos</Option>
            <Option value="Ibadan">Ibadan</Option>
            <Option value="Kano">Kano</Option>
            <Option value="Abuja">Abuja</Option>
          </Select>
          <div className="flex gap-4 mt-4 max-md:flex-wrap">
            <div className="flex flex-col flex-1 max-md:max-w-full">
              <label
                htmlFor="startDate"
                className="font-semibold text-neutral-600 max-md:max-w-full"
              >
                Start Date
              </label>
              <DatePicker
                id="startDate"
                className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-w-full"
                onChange={(date) => handleChange("startDate", date)}
                value={formData.startDate}
              />
            </div>
            <div className="flex flex-col flex-1 max-md:max-w-full">
              <label
                htmlFor="endDate"
                className="font-semibold text-neutral-600 max-md:max-w-full"
              >
                End Date
              </label>
              <DatePicker
                id="endDate"
                className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-w-full"
                onChange={(date) => handleChange("endDate", date)}
                value={formData.endDate}
              />
            </div>
          </div>
          <div className="flex flex-col pt-2 mt-4 font-semibold bg-white max-md:max-w-full">
            <div className="shrink-0 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
            <div className="flex gap-4 self-end mt-4 max-w-full w-[498px] max-md:flex-wrap">
              <button
                type="button"
                className="justify-center items-center px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="justify-center items-center px-8 py-4 text-white rounded-3xl bg-slate-500 max-md:px-5"
              >
                Add Period
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex flex-col p-6 bg-white rounded-3xl w-full mt-10">
          <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-10 w-full" />
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            className="mt-8"
          />
        </div>
      )}
      <Modal
        visible={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        closable={false}
        footer={null}
      >
        <div className="flex flex-col pb-20 mt-10 leading-[160%] max-w-[700px] text-neutral-600">
          <div className="flex flex-col pt-6 w-full text-4xl font-semibold max-md:max-w-full">
            <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap">
              <div>Review Setup</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
                className="shrink-0 my-auto w-8 aspect-square cursor-pointer"
                onClick={handleCancel}
                alt="Close"
              />
            </div>
            <div className="mt-6 w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
          </div>
          <div className="flex flex-col justify-center self-center px-12 pt-8 pb-10 mt-12 text-base rounded-3xl bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div>Are you sure you want to save the Billing period?</div>
            <div className="mt-6 font-semibold">
              {formData.startDate
                ? formData.startDate.format("YYYY-MM-DD")
                : "--"}{" "}
              -{" "}
              {formData.endDate ? formData.endDate.format("YYYY-MM-DD") : "--"}
            </div>
          </div>
          <div className="flex justify-center items-center px-16 py-6 mt-10 text-base leading-6 whitespace-nowrap bg-stone-100 max-w-[700px] max-md:px-5">
            <div className="flex justify-between gap-6 w-full">
              <button
                type="button"
                className="justify-center items-center px-8 py-4 rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600"
                style={{ width: "200px" }}
                onClick={handleCancel}
              >
                No
              </button>
              <button
                type="submit"
                className="justify-center items-center px-8 py-4 font-semibold text-white rounded-3xl bg-slate-500"
                style={{ width: "200px" }}
                onClick={handleSubmit}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <BillingDetailsPeriodsDrawer drawerVisible={drawerVisible} setDrawerVisible={setDrawerVisible} />
    </div>
  );
};

export default BillPeriodSetup;
