import React, { useState, useEffect } from "react";
import { Table, Menu, Dropdown } from "antd";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

function ApplicationPage() {
  const [applications, setApplications] = useState([]);

  console.log("application data application data", applications)

  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
    fetchApplicationById();
  }, []);

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
        navigate(`/billingdashboard`, { state: { screen: 'view-detail', applicationNumber } });
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
      title: "Application Number",
      dataIndex: "applicationNumber",
      key: "applicationNumber",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
              <Menu.Item key="generate">Generate Job Card</Menu.Item>
              <Menu.Item key="print">Print Application</Menu.Item>
              <Menu.Item key="contact">Contact Applicant</Menu.Item>
              <Menu.Item key="approve">Approve Application</Menu.Item>
              <Menu.Item key="assign">Assign Surveyor</Menu.Item>
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
        Applications
      </h1>
      <div className="p-6 mt-6 bg-white">
        <Table
          dataSource={applications}
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

export default ApplicationPage;
