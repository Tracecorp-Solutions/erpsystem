import React, { useState, useEffect } from "react";
import { Dropdown, Menu, Button, Pagination } from "antd";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import CustomerNavigationbar from "../components/CustomerNavigationbar";
import FailureSlideInCard from "../components/FailureSlideInCard ";
import ReusableEmptyData from "../components/ReusableEmptyData";
import CustomerForm from "../components/CustomerForm";
import SlideInCard from "../components/SlideInCard ";
import CustomerSidebar from "../components/CustomerSidebar";

const Invoice = () => {
  const [formData, setFormData] = useState({
    title: "",
    fullName: "",
    email: "",
    companyName: "",
    phone: "",
    mobile: "",
    website: "",
    addres: {
      street: "",
      city: "",
      zipCode: "",
      country: "",
    },
    accountNo: "",
    billingRate: 0,
    openingBalance: 0,
    openingBalanceDate: "",
    notes: "",
    businessIdNo: "",
    status: true,
    paymentAccount: 0,
    subGroupId: 0,
    vendorType: "Customer",
  });
  const [customerList, setCustomerList] = useState([]);
  const [showFailure, setShowFailure] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [messageInfo, setMessageInfo] = useState({ title: "", message: "" });
  const [toggleDisabled, setToggleDisabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(null);

  console.log("customer details", customerDetails);

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

  const fetchCustomerDetails = async (customerId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/GetVendorById`,
        {
          id: customerId,
          vendType: "Customer",
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching customer details:", error);
      throw error;
    }
  };

  const handleViewCustomerDetails = async (customerId) => {
    console.log("Selected Customer ID:", customerId);
    try {
      const customerDetails = await fetchCustomerDetails(customerId);
      setCustomerDetails(customerDetails);
      setDrawerVisible(true);
    } catch (error) {
      console.error("Error viewing customer details:", error);
    }
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div style={{ overflowY: "auto", width: "100%" }}>
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
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="px-3 py-4 whitespace-nowrap mt-3 text-sm  text-gray-800">
                <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm  text-gray-800">
                  <input type="checkbox" />
                </td>
                <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm  text-gray-800">
                  ruurur
                </td>
                <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                  aajjaj
                </td>
                <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                  aajjaj
                </td>
                <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                  shshhsj
                </td>
                <div
                  style={{
                    width: "100px",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <Dropdown
                    overlay={
                      <Menu style={{ width: "250px" }}>
                        <Menu.Item key="1">
                          <EyeOutlined style={{ marginRight: "5px" }} />
                          <span>View</span>
                        </Menu.Item>
                        <Menu.Item key="2">Action 2</Menu.Item>
                        <Menu.Item key="3">Action 3</Menu.Item>
                      </Menu>
                    }
                    trigger={["click"]}
                  >
                    <EllipsisVerticalIcon
                      className="h-5 w-5 mt-3"
                      aria-hidden="true"
                    />
                  </Dropdown>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
