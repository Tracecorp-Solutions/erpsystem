import React, { useState, useEffect } from "react";
import { Table, Menu, Dropdown, message } from "antd";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function ConnectedCustomers() {
  const [applications, setApplications] = useState([]);
  const [customers,setConnectedCustomers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    GetConnectedCustomers();
    //fetchApplications();
    //fetchApplicationById();
  }, []);

  const GetConnectedCustomers = async() =>{
    try{
        const resp = await axios.get(`${process.env.REACT_APP_API_URL}/GetConnectedCustomers`);
        setConnectedCustomers(resp.data);
    }catch(error){
        message.error(error.response)
    }

  };

  const fetchApplications = () => {
    fetch(`${process.env.REACT_APP_API_URL}/GetApplications`)
      .then(response => response.json())
      .then(data => {
        setApplications(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchApplicationById = (applicationNumber) => {
    fetch(`${process.env.REACT_APP_API_URL}/GetApplicationByApplicationNumnber?applicationId=${applicationNumber}`)
      .then(response => response.json())
      .then(data => {
        // Handle the fetched application data, for example:
        console.log("Fetched application data:", data);
        // Optionally, update state with this specific application data if needed
      })
      .catch(error => {
        console.error("Error fetching application by id:", error);
        // Optionally, show an error message to the user
      });
  };

  const handleMenuClick = (applicationNumber, action) => {
    switch (action) {
      case "view":
        navigate(`/billingdashboard`, { state: { screen: 'customer-details', applicationNumber } });
        break;
      case "generate":
        // Handle generate job card
        break;
      case "print":
        // Handle print application
        break;
      case "contact":
        // Handle contact applicant
        break;
      case "approve":
        // Handle approve application
        break;
      case "assign":
        // Handle assign surveyor
        break;
      default:
        console.log("Unknown action:", action);
    }
  };

  const columns = [
    {
      title: "Applicant Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Customer Ref",
      dataIndex: "customerRef",
      key: "customerRef",
    },
    {
      title: "Application Number",
      dataIndex: "applicationNo",
      key: "applicationNo",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: status => <span className="px-3 py-1">{status}</span>,
    },
    {
        title: "Date Created",
        dataIndex: "dateConnected",
        key: "dateConnected",
        render: status => <span className="px-3 py-1">{status}</span>,
      },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu onClick={({ key }) => handleMenuClick(record.applicationNumber, key)}>
              <Menu.Item key="view">View Details</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
          placement="bottomLeft"
        >
          <EllipsisVerticalIcon className="w-7 h-7" />
        </Dropdown>
      ),
    },
  ];

  return (
    <section className="pb-0.5 mx-auto rounded-3xl bg-stone-100 max-md:mr-2.5 w-full">
      <h1 className="text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full p-6">
        Customers
      </h1>
      <div className="p-6 mt-6 bg-white">
        <Table
          dataSource={customers}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 768 }}
          className="max-md:px-5 w-full"
        />
      </div>
    </section>
  );
}

export default ConnectedCustomers;