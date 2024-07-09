import React, { useState, useEffect } from "react";
import {
  DatePicker,
  Select,
  Modal,
  Button,
  Typography,
  Dropdown,
  Menu,
  message,
} from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import axios from "axios";
import BillingDetailsPeriodsDrawer from "./Actions/BillingPeriodDetailsDrawer";

const { Option } = Select;
const { Text } = Typography;

const BillPeriodSetup = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    operationArea: "",
    startDate: null,
    endDate: null,
  });

  const [data, setData] = useState([]);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [billingPeriodDetails, setBillingPeriodDetails] = useState({});

  useEffect(() => {
    fetchBillingPeriods();
  }, []);

  const fetchBillingPeriods = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetBillingPeriods`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching billing periods:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setIsModalVisible(false);
    setFormData({
      operationArea: "",
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

  const handleAddPeriod = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/AddBillingPeriod`,
        {
          name: formData.operationArea,
          startDate: formData.startDate.toISOString(),
          endDate: formData.endDate.toISOString(),
        }
      );

      message.success(response.data);

      setIsModalVisible(false);
      setFormData({
        operationArea: "",
        startDate: null,
        endDate: null,
      });

      fetchBillingPeriods(); // Update data after adding a new period
    } catch (error) {
      message.error(error);
    }
  };

  const renderMenu = (record) => (
    <Menu>
      <Menu.Item key="1">
        <Button type="text" onClick={() => handleOpenDrawer(record)}>
          View Periods Details
        </Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button type="text">Close Period</Button>
      </Menu.Item>
    </Menu>
  );

  const handleOpenDrawer = (record) => {
    setBillingPeriodDetails(record);
    setDrawerVisible(true);
  };

  const columns = [
    {
      title: "Code",
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
        <Dropdown overlay={() => renderMenu(record)} placement="bottomRight">
          <Button
            type="text"
            icon={<EllipsisOutlined style={{ fontSize: 20, color: "#1890ff" }} />}
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
            style={{ width: "100%" }}
            className="h-14 mt-2"
            required
            onChange={(value) => handleChange("operationArea", value)}
            value={formData.operationArea}
          >
            {formData.operationArea === "" && (
              <Option value="">Please select</Option>
            )}
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
                required
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
                required
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
        <div className="flex flex-col p-6 bg-white rounded-3xl w-full">
          <div>
            <div className="shrink-0 mt-4 h-px border bg-neutral-500 w-full" />
            <div className="overflow-x-auto mt-10">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="text-neutral-600">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left tracking-wider">
                      Code
                    </th>
                    <th scope="col" className="px-6 py-3 text-left tracking-wider">
                      Period
                    </th>
                    <th scope="col" className="px-6 py-3 text-left tracking-wider">
                      Start Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left tracking-wider">
                      End Date
                    </th>
                    <th scope="col" className="px-12 py-3 text-end tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-500">{item.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-500">{item.period}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-500">{item.startDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-500">{item.endDate}</div>
                      </td>
                      <td className="px-12 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Dropdown overlay={() => renderMenu(item)} placement="bottomRight">
                          <Button
                            type="text"
                            icon={<EllipsisOutlined style={{ fontSize: 20, color: "#1890ff" }} />}
                          />
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <BillingDetailsPeriodsDrawer
            drawerVisible={drawerVisible}
            setDrawerVisible={setDrawerVisible}
            billingPeriodDetails={billingPeriodDetails}
          />
        </div>
      )}
      <Modal
        title="Add Period"
        visible={isModalVisible}
        onOk={handleAddPeriod}
        onCancel={handleCancel}
        okText="Add Period"
        cancelText="Cancel"
      >
        {/* Modal content */}
      </Modal>
    </div>
  );
};

export default BillPeriodSetup;
