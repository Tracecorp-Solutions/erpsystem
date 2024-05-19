import React, { useState, useEffect } from "react";
import { Dropdown, Menu, Button, Pagination } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import VendorNavigationbar from "../components/VendorNavigationbar";
// import FailureSlideInCard from "../components/FailureSlideInCard ";
import ReusableEmptyData from "../components/ReusableEmptyData";
import VendorForm from "../components/VendorForm";
// import SlideInCard from "../components/SlideInCard ";

const Customer = () => {
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
    vendorType: "Vendor",
  });
  const [customerList, setCustomerList] = useState([]);
  const [showFailure, setShowFailure] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [messageInfo, setMessageInfo] = useState({ title: "", message: "" });
  const [toggleDisabled, setToggleDisabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editedVendor, setEditedVendor] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

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
          vendorType: "Vendor",
        });
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

  const handleViewDetails = async (vendorId) => {
    try {
      const response = await axios.get(
        `http://3.216.182.63:8095/GetVendorById?id=${vendorId}`
      );
      setSelectedVendor(response.data); // Adjust this line if necessary based on the response structure
      setDrawerVisible(true);
    } catch (error) {
      console.error("Error fetching vendor details:", error);
    }
  };

  const handleEdit = async (identifier, type = "id") => {
    try {
      let response;
      if (type === "id") {
        response = await axios.get(
          `http://3.216.182.63:8095/GetVendorById?id=${identifier}`
        );
        setSelectedVendor(response.data);
        setEditedVendor(response.data);
      } else if (type === "type") {
        response = await axios.get(
          `http://3.216.182.63:8095/GetVendorsByType?type=${identifier}`
        );
        const vendors = response.data;
        if (vendors.length > 0) {
          setSelectedVendor(vendors[0]);
          setEditedVendor(vendors[0]);
        } else {
          console.warn("No vendors found for the specified type.");
          return;
        }
      }
      setShowEditForm(true);
    } catch (error) {
      console.error("Error fetching vendor details for edit:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log("Editing vendor:", editedVendor); // Updated log message for clarity
    try {
      const response = await axios.post(
        `http://3.216.182.63:8095/UpdateVendorDetails`,
        editedVendor
      );
      console.log("Vendor updated:", response.data);
      setShowEditForm(false);
    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const renderMenu = (vendorId) => (
    <Menu style={{ width: "200px" }}>
      <Menu.Item
        key="1"
        onClick={() => handleViewDetails(vendorId)}
        icon={<EyeOutlined />}
      >
        View
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => handleEdit(vendorId)}
        icon={<EditOutlined />}
      >
        Edit
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => handleEdit(vendorId)}
        icon={<EditOutlined />}
      >
        Disable
      </Menu.Item>
    </Menu>
  );

  const handleDropdownVisibleChange = (visible, vendorId) => {
    setDropdownVisible({ ...dropdownVisible, [vendorId]: visible });
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

  const filteredCustomerList = customerList.filter(
    (customer) =>
      (toggleDisabled ? customer.status === true : customer.status === false) &&
      customer.vendorType === "Customer" &&
      (customer.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.mobile.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const currentItems = filteredCustomerList.slice(
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
        )}
        {showFailure && (
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
          + Create Vendor
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
                      <Dropdown
                        overlay={renderMenu(vendor.id)}
                        trigger={["click"]}
                        visible={dropdownVisible[vendor.id]}
                        onVisibleChange={(visible) =>
                          handleDropdownVisibleChange(visible, vendor.id)
                        }
                      >
                        <EllipsisVerticalIcon
                          className="h-5 w-5"
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
            {filteredCustomerList.length} results
          </div>
          <Pagination
            current={currentPage}
            total={filteredCustomerList.length}
            pageSize={itemsPerPage}
            onChange={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default Customer;
