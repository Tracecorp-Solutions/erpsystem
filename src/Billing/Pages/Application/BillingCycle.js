import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, Input, Pagination, Table } from 'antd';
import { SearchOutlined, FilterOutlined, DownOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PaymentDetails from './Actions/PaymentDetails';
import BillingCustomer from './Actions/BillingCustomer';
import BulkSms from './Actions/BulkSms';
import axios from 'axios';

const BillingCycle = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [customerBills,setCustomerBills] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [showBillingCustomer, setShowBillingCustomer] = useState(false);
  const [showBulkSms, setShowBulkSms] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/GetCustomerBills`);
        setCustomerBills(response.data);
        // if (!response.ok) {
        //   throw new Error('Failed to fetch data');
        // }
        const data = response.data;
        const formattedData = data.map((item, index) => ({
          item,
          key: item.customerBillId,
          customerRef: item.customer.customerRef,
          customerName: item.customer.application.fullName,
          paymntReference: item.billPeriod,
          vendor: item.vendor,
          amount: item.totalBillAmount,
          paymentDate: item.billDate,
          paymentMethod: item.paymentMethod,
        }));
        setPayments(formattedData);
        console.log("*****************");
        console.log(payments);
        console.log("*****************");
        setFilteredPayments(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleShowPaymentForm = () => {
    setShowPaymentForm(true);
  };

  const handleCancelPayment = () => {
    setShowPaymentForm(false);
  };

  const handleShowBillingCustomer = () => {
    setShowBillingCustomer(true);
  };

  const handleCancelBillingCustomer = () => {
    setShowBillingCustomer(false);
  };

  const handleShowBulkSms = () => {
    setShowBulkSms(true);
  };

  const handleCancelBulkSms = () => {
    setShowBulkSms(false);
  };

 const handleSearch = (value) => {
  setSearchText(value);
  const lowerCaseValue = value.toLowerCase();

  const filteredData = payments.filter(payment => {
    return Object.keys(payment).some(key => {
      if (key === 'paymentDate') {
        return new Date(payment[key]).toLocaleDateString().toLowerCase().includes(lowerCaseValue);
      } else {
        const fieldValue = payment[key];
        if (typeof fieldValue === 'string' || typeof fieldValue === 'number') {
          return fieldValue.toString().toLowerCase().includes(lowerCaseValue);
        }
        return false;
      }
    });
  });

  setFilteredPayments(filteredData);
  setCurrentPage(1);
};


  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentDisplayData = payments.slice(startIndex, endIndex);

  const handleMenuClick = (applicationNumber, action) => {
    switch (action) {
      case 'view':
        navigate(`/billingdashboard`, { state: { screen: 'view-detail', applicationNumber } });
        break;
      case 'generate':
        // Handle generate job card
        break;
      case 'print':
        // Handle print application
        break;
      case 'contact':
        // Handle contact applicant
        break;
      case 'approve':
        // Handle approve application
        break;
      case 'assign':
        // Handle assign surveyor
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const handleDropdownMenuClick = (e) => {
    console.log('Clicked on menu item:', e.key);
    // Implement your logic based on the selected menu item
    switch (e.key) {
      case 'view':
        handleShowBillingCustomer();
        break;
      case 'bulkbilling':
        handleShowBulkSms();
        break;
      default:
        break;
    }
  };

  const actionMenu = (
    <Menu onClick={handleDropdownMenuClick}>
      <Menu.Item key="view">
        Bill Customer
      </Menu.Item>
      <Menu.Item key="generate">
        Download Bill
      </Menu.Item>
      <Menu.Item key="print">
        Print Bill
      </Menu.Item>
      <Menu.Item key="contact">
        View Bill
      </Menu.Item>
      <Menu.Item key="bulkbilling">
        Bulk Billing
      </Menu.Item>
    </Menu>
  );

  const renderActions = (text, record) => (
    <Dropdown overlay={actionMenu} trigger={['click']} placement="bottomLeft">
      <button className="ant-dropdown-link bg-transparent border-none outline-none">
        <EllipsisOutlined style={{ fontSize: 20, color: '#1890ff' }} />
      </button>
    </Dropdown>
  );

  const columns = [
    {
      title: 'Customer Ref',
      dataIndex: 'customerRef',
      key: 'customerRef',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Payment Ref',
      dataIndex: 'paymntReference',
      key: 'paymntReference',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Payment Date',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: renderActions,
    },
  ];

  return (
    <div className="md:px-6 md:py-5 rounded-3xl bg-stone-100">
      <div className="mb-6 md:flex md:justify-between md:items-center md:mb-6 font-semibold text-4xl text-neutral-600">
        <div className="mb-4 md:mb-0">Billing</div>
        <Dropdown overlay={actionMenu} trigger={['click']}>
          <button className="flex items-center gap-1 bg-slate-500 py-3 rounded-full text-white px-5 border-none outline-none">
            <span className="text-xl">Actions</span>{' '}
            <DownOutlined className="mt-2 text-xl" />
          </button>
        </Dropdown>
      </div>
      <div className="bg-white rounded-3xl">
        <div className="flex flex-col md:flex-row md:justify-between p-6 border-b border-neutral-500 border-opacity-10">
          <div className="mb-4 md:mb-0 md:mr-4">
            <div className="flex items-center gap-2 rounded-3xl border border-neutral-500 border-opacity-10 p-3">
              <SearchOutlined />
              <Input
                placeholder="Customer Reference"
                className="bg-transparent outline-none border-none"
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-3xl border border-neutral-500 border-opacity-30 p-3 w-40">
            <FilterOutlined />
            <div>Filter</div>
          </div>
        </div>
        <div className="p-6 overflow-x-auto">
          <Table
            dataSource={payments}
            columns={columns}
            rowKey="customerBillId"
            pagination={false}
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys: selectedRows,
              onChange: (selectedRowKeys) => setSelectedRows(selectedRowKeys),
            }}
          />
        </div>
        <div className="flex justify-end p-6">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredPayments.length}
            onChange={handleChangePage}
          />
        </div>
      </div>
      <PaymentDetails
        handleShowPaymentForm={handleShowPaymentForm}
        handleCancelPayment={handleCancelPayment}
        showPaymentForm={showPaymentForm}
      />
      <BillingCustomer
        showBillingCustomer={showBillingCustomer}
        handleCancelBillingCustomer={handleCancelBillingCustomer}
      />
      <BulkSms
        showBulkSms={showBulkSms}
        handleCancelBulkSms={handleCancelBulkSms}
      />
    </div>
  );
};

export default BillingCycle;
