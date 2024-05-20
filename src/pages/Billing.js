import React, { useState, useEffect } from "react";
import { Dropdown, Menu, Button, Pagination } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import BillsNavigationBar from "../components/BillsNavigationBar";
import FailureSlideInCard from '../components/FailureSlideInCard';
import SlideInCard from '../components/SlideInCard';
import ReusableEmptyData from "../components/ReusableEmptyData";
import VendorForm from "../components/VendorForm";
import BillsCard from "../components/BillsCard"


const Bill = () => {
  const [formData, setFormData] = useState({
    id: 0,
    billDate: "2024-05-20T10:52:56.389Z",
    dueDate: "2024-05-20T10:52:56.389Z",
    billNo: "string",
    billTranItems: [
      {
        id: 0,
        accountId: 0,
        description: "string",
        amount: 0,
      }
    ],
    totalAmount: 0,
    type: "bill",
    narration: "string",
    status: "string"
  });

  const [billsList, setBillsList] = useState([]);
  const [bills, setBills] = useState([]);
  const [showFailure, setShowFailure] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [messageInfo, setMessageInfo] = useState({ title: "", message: "" });
  const [toggleDisabled, setToggleDisabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBills, setSelectedBills] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editedBills, setEditedBills] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);


 ;useEffect(() => {
  // Fetch all bills when component mounts
  axios.get('http://3.216.182.63:8095/GetAllBills')
    .then(response => {
      setBills(response.data);
    })
    .catch(error => {
      console.error("Error fetching bills:", error);
    });
}, []);

const handleSubmit = (e) => {
  e.preventDefault();
  axios
    .post('http://3.216.182.63:8095/CreateBill', formData, {
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      setShowModal(false);
      setShowSuccess(true);
      setMessageInfo({
        title: "Success!",
        message: response.data.message,
      });
      // Reset form data
      setFormData({
        id: 0,
        billDate: "",
        dueDate: "",
        billNo: "",
        billTranItems: [
          {
            id: 0,
            accountId: 0,
            description: "",
            amount: 0,
          }
        ],
        totalAmount: 0,
        type: "",
        narration: "",
        status: ""
      });
      // Refetch bills to update the list
      axios.get('http://3.216.182.63:8095/GetAllBills')
        .then(response => {
          setBills(response.data);
        })
        .catch(error => {
          console.error("Error fetching bills:", error);
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
      setSelectedBills(response.data); // Adjust this line if necessary based on the response structure
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
        setSelectedBills(response.data);
        setEditedBills(response.data);
      } else if (type === "type") {
        response = await axios.get(
          `http://3.216.182.63:8095/GetVendorsByType?type=${identifier}`
        );
        const vendors = response.data;
        if (vendors.length > 0) {
          setSelectedBills(vendors[0]);
          setEditedBills(vendors[0]);
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

  // const handleEditSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("Editing vendor:", editedBills); // Updated log message for clarity
  //   try {
  //     const response = await axios.post(
  //       `http://3.216.182.63:8095/UpdateVendorDetails`,
  //       editedVendor
  //     );
  //     console.log("Vendor updated:", response.data);
  //     setShowEditForm(false);
  //   } catch (error) {
  //     console.error("Error updating vendor:", error);
  //   }
  // };  

  const handleDisable = async (vendorId) => {
    try {
      const response = await axios.get(`http://3.216.182.63:8095/GetVendorById?id=${vendorId}`);
      console.log("Bills :", response.data);
      setSelectedBills(response.data); // Assuming you want to update the selected vendor data
      setToggleDisabled(false); // Example state update to enable some feature
    } catch (error) {
      console.error("Error fetching vendor data:", error);
    }
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const renderMenu = (billsId) => (
    <Menu style={{ width: "200px" }}>
      <Menu.Item
        key="1"
        onClick={() => handleViewDetails(billsId)}
        icon={<EyeOutlined />}
      >
        View
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => handleEdit(billsId)}
        icon={<EditOutlined />}
      >
        Edit
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={() => handleDisable(billsId)}
        icon={<EditOutlined />}
      >
        Disable
      </Menu.Item>
    </Menu>
  );

  const handleDropdownVisibleChange = (visible, billsId) => {
    setDropdownVisible({ ...dropdownVisible, [billsId]: visible });
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

  const filteredBillsList = billsList.filter(
    (vendor) =>
      (toggleDisabled ? bills.status === true : bills.status === false) &&
      bills.vendorType === "bills" &&
      (bills.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bills.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bills.mobile.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const currentItems = filteredBillsList.slice(
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
          marginBottom: "7px",
        }}
      >
        {showSuccess && (
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
        )}
        <h2
          style={{
            fontSize: "36px",
            fontFamily: "Sans-serif",
            color: "#505050",
            fontWeight: "600",
          }}
        >
          Bills
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
          + Add Bill
        </Button>
      </div>
      <BillsCard />
      <VendorForm
        handleSearch={handleSearch}
        handleSubmit={handleSubmit}
        setFormData={setFormData}
        formData={formData}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div
        style={{ background: "#fff", padding: "15px", borderRadius: "24px", marginTop: "10px" }}
      >
        <BillsNavigationBar
          toggleDisabled={toggleDisabled}
          setToggleDisabled={setToggleDisabled}
          searchQuery={searchQuery}
          handleSearch={handleSearch}
        />
        {showFailure && (
          <FailureSlideInCard
            title={messageInfo.title}
            message={messageInfo.message}
            onClose={() => setShowFailure(false)}
          />
        )}
       
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
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Vendor
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Billing Number
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                      Due Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                      Amount Due
                  </th>


                </tr>
              </thead>
              {currentItems.map((bills) => (
                <tbody
                  className="bg-white divide-y divide-gray-200"
                  key={bills.id}
                >
                  <tr className="px-3 py-4 whitespace-nowrap mt-3 text-sm  text-gray-800">
                    <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm  text-gray-800">
                      <input type="checkbox" />
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm  text-gray-800">
                      {bills.status}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                      {bills.Vendor}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                      {bills.date}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                      {bills.billingNumber}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                      {bills.dueDate}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                      {bills.amountDue}
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
                        overlay={renderMenu(bills.id)}
                        trigger={["click"]}
                        visible={dropdownVisible[bills.id]}
                        onVisibleChange={(visible) =>
                          handleDropdownVisibleChange(visible, bills.id)
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
            {filteredBillsList.length} results
          </div>
          <Pagination
            current={currentPage}
            total={filteredBillsList.length}
            pageSize={itemsPerPage}
            onChange={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default Bill;
