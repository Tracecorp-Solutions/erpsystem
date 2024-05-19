import React, { useState, useEffect } from "react";
import { Dropdown, Menu, Button, Pagination } from "antd";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import VendorNavigationbar from "../components/VendorNavigationbar";
// import FailureSlideInCard from "../components/FailureSlideInCard ";
import ReusableEmptyData from "../components/ReusableEmptyData";
import VendorForm from "../components/VendorForm";
// import SlideInCard from "../components/SlideInCard ";

const Vendor = () => {
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
    vendorType: "vendor",
  });
  const [vendorList, setvendorList] = useState([]);
  const [showFailure, setShowFailure] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [messageInfo, setMessageInfo] = useState({ title: "", message: "" });
  const [toggleDisabled, setToggleDisabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/GetAllVendors`
        );
        setvendorList(response.data);
      } catch (error) {
        setShowFailure(true);
        setMessageInfo({
          title: "Server Error!",
          message: "Failed to fetch vendor details.",
        });
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/CreateVendor`, formData)
      .then((response) => {
        setShowModal(false);
        setShowSuccess(true);
        setMessageInfo({
          title: "Success!",
          message: response.data.message,
        });
        setFormData({
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
          vendorType: "vendor",
        })
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setShowFailure(true);
        if (error.response) {
          setMessageInfo({
            title: "Server Error!",
            message: error.response.data.message,
          });
        } else if (error.request) {
          setMessageInfo({
            title: "Network Error!",
            message: "Failed to connect to the server.",
          });
        } else {
          setMessageInfo({
            title: "Request Error!",
            message: "Failed to send request.",
          });
        }
      });
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const menu = (
    <Menu style={{ width: "250px" }}>
      <Menu.Item key="1">Action 1</Menu.Item>
      <Menu.Item key="2">Action 2</Menu.Item>
      <Menu.Item key="3">Action 3</Menu.Item>
    </Menu>
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredvendorList = vendorList.filter(
    (vendor) =>
      (toggleDisabled ? vendor.status === true : vendor.status === false) &&
      vendor.vendorType === "vendor" &&
      (vendor.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.mobile.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const currentItems = filteredvendorList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
        {/* {showSuccess && (
          <SlideInCard
            title={messageInfo.title}
            message={messageInfo.message}
            onClose={() => setShowSuccess(false)}
          />
        )} */}
        {/* {showFailure && (
          <FailureSlideInCard
            title={messageInfo.title}
            message={messageInfo.message}
            onClose={() => setShowFailure(false)}
          />
        )} */}
        <h2
          style={{
            fontSize: "36px",
            fontFamily: "Sans-serif",
            color: "#505050",
            fontWeight: "600",
          }}
        >
          Vendor
        </h2>
        <Button
          type="button"
          style={{
            background: "#4467a1",
            fontFamily: "outFit, Sans-serif",
            color: "#fff",
            padding: "",
            borderRadius: "24px",
            marginTop: "15px",
          }}
          onClick={handleModal}
        >
          + Create Vendors
        </Button>
      </div>
      <VendorForm
        handleSearch={handleSearch}
        handleSubmit={handleSubmit}
        setFormData={setFormData}
        formData={formData}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div
        style={{ background: "#fff", padding: "15px", borderRadius: "24px" }}
      >
        <VendorNavigationbar
          toggleDisabled={toggleDisabled}
          setToggleDisabled={setToggleDisabled}
          searchQuery={searchQuery}
          handleSearch={handleSearch}
        />
        {/* {showFailure && (
          <FailureSlideInCard
            title={messageInfo.title}
            message={messageInfo.message}
            onClose={() => setShowFailure(false)}
          />
        )} */}
        {currentItems.length === 0 ? (
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
              {currentItems.map((vendor) => (
                <tbody
                  className="bg-white divide-y divide-gray-200"
                  key={vendor.id}
                >
                  <tr className="px-3 py-4 whitespace-nowrap mt-3 text-sm  text-gray-800">
                    <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm  text-gray-800">
                      <input type="checkbox" />
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm  text-gray-800">
                      {vendor.companyName}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                      {vendor.email}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                      {vendor.mobile}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                      {vendor.openingBalance}
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: "40px",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginTop: "15px",
              fontSize: "12px",
              color: "#a1a1a1",
            }}
          >
            Showing {indexOfFirstItem + 1} - {indexOfLastItem} of{" "}
            {filteredvendorList.length} results
          </div>
          <Pagination
            current={currentPage}
            total={filteredvendorList.length}
            pageSize={itemsPerPage}
            onChange={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default Vendor;
