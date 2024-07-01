import React, { useState, useEffect } from "react";
import { Dropdown, Menu, Button, Pagination } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import VendorNavigationbar from "./VendorNavigationbar";
import EmptyData from "../../components/Shared/EmptyData";
import VendorForm from "./VendorForm";
import VendorDetails from "./VendorDetails";
import ErrorMessageCard from "../../components/Shared/ErrorMessageCard";
import SuccessMessageCard from "../../components/Shared/SuccessMessageCard";
// import TopNav from "../components/TopNav";
// import SideNav from "../components/SideNav";

const VendorSetup = () => {
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
  const [vendorList, setVendorList] = useState([]);
  const [showFailure, setShowFailure] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
  const [showMessage, setShowMessage] = useState(false);
  const [messageInfo, setMessageInfo] = useState({
    title: "",
    message: "",
    color: "",
  });
  const [vendorDetails, setVendorDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/GetAllVendors`
        );
        if (response.data.length === 0) {
          setVendorList([]); // No vendors found
          setShowMessage(true);
          setMessageInfo({
            title: "No Vendors Found",
            message: "Start your journey by creating vendors.",
            color: "yellow",
          });
        } else {
          setVendorList(response.data);
          setShowMessage(false); // Hide any previous messages
          setMessageInfo({ title: "", message: "", color: "" }); // Clear previous message
        }
      } catch (error) {
        setVendorList([]); // Clear vendor list on error
        setShowMessage(true);
        setMessageInfo({
          title: "Server Error!",
          message: "Failed to fetch vendor details.",
          color: "red",
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
          bankName: "",
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

  const handleDisable = async (vendorId) => {
    try {
      const response = await axios.get(
        `http://3.216.182.63:8095/GetVendorById?id=${vendorId}`
      );
      console.log("Vendor :", response.data);
      setSelectedVendor(response.data); // Assuming you want to update the selected vendor data
      setToggleDisabled(false); // Example state update to enable some feature
    } catch (error) {
      console.error("Error fetching vendor data:", error);
    }
  };

  const fetchVendorDetails = async (vendorId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/GetVendorById`,
        {
          id: vendorId,
          vendType: "Vendor",
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching vendor details:", error);
      throw error;
    }
  };

  const handleViewVendorDetails = async (vendorId) => {
    try {
      const vendorDetails = await fetchVendorDetails(vendorId);
      setVendorDetails(vendorDetails);
      setDrawerVisible(true);
    } catch (error) {
      console.error("Error viewing vendor details:", error);
    }
    console.log(vendorId);
    setDrawerVisible(true);
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const handleDropdownVisibleChange = (visible, vendorId) => {
    setDropdownVisible({ ...dropdownVisible, [vendorId]: visible });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredVendorList = vendorList.filter(
    (vendor) =>
      (toggleDisabled ? vendor.status === true : vendor.status === false) &&
      vendor.vendorType === "Vendor" &&
      (vendor.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.mobile.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const currentItems = filteredVendorList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      {/* <SideNav /> */}
      <div className="content">
        {/* <TopNav /> */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          {showSuccess && (
            <SuccessMessageCard
              title={messageInfo.title}
              message={messageInfo.message}
              onClose={() => setShowSuccess(false)}
            />
          )}
          {showFailure && (
            <ErrorMessageCard
              title={messageInfo.title}
              message={messageInfo.message}
              onClose={() => setShowFailure(false)}
            />
          )}
          <h2
            style={{
              fontSize: "36px",
              fontFamily: "Sans-serif",
              color: "#505050",
              fontWeight: "600",
            }}
          >
            Vendors
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
          {showFailure && (
            <ErrorMessageCard
              title={messageInfo.title}
              message={messageInfo.message}
              onClose={() => setShowFailure(false)}
            />
          )}
          {currentItems.length === 0 ? (
            <EmptyData />
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
                          overlay={
                            <Menu style={{ width: "250px" }}>
                              <Menu.Item
                                key="1"
                                onClick={() =>
                                  handleViewVendorDetails(vendor.id)
                                }
                              >
                                <EyeOutlined style={{ marginRight: "5px" }} />
                                <span>View</span>
                              </Menu.Item>
                              <Menu.Item key="2">Edit</Menu.Item>
                              <Menu.Item key="3">Disable</Menu.Item>
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
              {filteredVendorList.length} results
            </div>
            <Pagination
              current={currentPage}
              total={filteredVendorList.length}
              pageSize={itemsPerPage}
              onChange={paginate}
            />
          </div>
          <VendorDetails
            drawerVisible={drawerVisible}
            setDrawerVisible={setDrawerVisible}
            vendorDetails={vendorDetails}
          />
        </div>
      </div>
    </>
  );
};

export default VendorSetup;
