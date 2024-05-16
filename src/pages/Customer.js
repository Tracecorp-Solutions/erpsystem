import React, { useState, useEffect } from "react";
import { Dropdown, Menu, Button } from "antd";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import AccountNavigationFilter from "../components/SubGroupNavigationFilter";
import FailureSlideInCard from "../components/FailureSlideInCard ";
import ReusableEmptyData from "../components/ReusableEmptyData";

const Customer = () => {
  const [customerList, setCustomerList] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [messageInfo, setMessageInfo] = useState({ title: "", message: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/GetAllVendors`
        );
        setCustomerList(response.data);
      } catch (error) {
        setShowFailure(true);
        setMessageInfo({
          title: "Server Error!",
          message: "Failed to fetch customer details.",
        });
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const menu = (
    <Menu style={{ width: "250px" }}>
      <Menu.Item key="1">Action 1</Menu.Item>
      <Menu.Item key="2">Action 2</Menu.Item>
      <Menu.Item key="3">Action 3</Menu.Item>
    </Menu>
  );

  //   const handleCloseSuccess = () => {
  //     setShowFailure(false);
  //   };

  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px"
      }}>
        <h2 style={{
          fontSize: "36px",
          fontFamily: "Sans-serif",
          color: "#505050",
          fontWeight: "600"
          }}>
            Customer
        </h2>
        <Button
          type="button"
          style={{
            background: "#4467a1",
            fontFamily: "outFit, Sans-serif",
            color: "#fff",
            padding: "",
            borderRadius: "24px",
            marginTop: "15px"
          }}
        >
          + Create Customer
        </Button>
      </div>
      <div style={{ background: "#fff", padding: "15px", borderRadius: "24px" }}>
      <AccountNavigationFilter />
      {showFailure && (
        <FailureSlideInCard
          title={messageInfo.title}
          message={messageInfo.message}
          onClose={() => setShowFailure(false)}
        />
      )}
      {customerList.length < 0 ? (
        <ReusableEmptyData />
      ) : (
        <div style={{ overflowY: "auto" }}>
          <table className="table-auto min-w-full divide-gray-200">
            <thead className="bg-gray-50">
              <tr style={{ borderRadius: "50px" }}>
                <input
                  type="checkbox"
                  style={{ marginLeft: "10px", marginTop: "15px" }}
                />
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Company Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Opening Balance
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ACTION
                </th>
              </tr>
            </thead>
            {customerList.map((customer) => (
              <tbody
                className="bg-white divide-y divide-gray-200"
                key={customer.id}
              >
                <tr className="px-3 py-4 whitespace-nowrap mt-3 text-sm  text-gray-800">
                  <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm  text-gray-800">
                    <input type="checkbox" />
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm  text-gray-800">
                    {customer.companyName}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                    {customer.email}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                    {customer.mobile}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                    {customer.openingBalance}
                  </td>
                  <div
                    style={{
                      width: "100px",
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <EllipsisVerticalIcon
                        className="h-5 w-5 mt-3"
                        aria-hidden="true"
                      />
                    </Dropdown>
                  </div>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
    </div>
  );
};

export default Customer;
