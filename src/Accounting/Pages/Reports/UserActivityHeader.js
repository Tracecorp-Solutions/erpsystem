import React, { useState } from 'react';
import { DatePicker, Button, Select, Dropdown, Menu } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';

const { RangePicker } = DatePicker;
const { Option } = Select;

const UserActivityHeader = ({ onFilterChange, activities }) => {
  const [dateRange, setDateRange] = useState([]);

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    const columns = ['User', 'Activity', 'Date'];
    const rows = activities.map(activity => [activity.username, activity.action, activity.timestamp]);

    pdf.text('User Activity Report', 10, 10);
    pdf.autoTable({ head: [columns], body: rows });
    pdf.save('user_activity.pdf');
  };

  const handleDownloadCSV = () => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'user_activity.csv');
  };

  const generateCSV = () => {
    const headers = ['User', 'Activity', 'Date'];
    const rows = activities.map(activity => [activity.username, activity.action, activity.timestamp]);
    const csvRows = [headers.join(','), ...rows.map(row => row.join(','))];
    return csvRows.join('\n');
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const handleFilterClick = () => {
    onFilterChange({ startDate: dateRange[0], endDate: dateRange[1] });
  };

  const menu = (
    <Menu onClick={({ key }) => handleDownloadPDF(key)}>
      <Menu.Item key="pdf">Download as PDF</Menu.Item>
      <Menu.Item key="csv" onClick={handleDownloadCSV}>Download as CSV</Menu.Item>
    </Menu>
  );

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
      <div className="mb-4 sm:mb-0 flex items-center">
        <Select
          defaultValue="all"
          className="w-40 mr-4"
          dropdownClassName="rounded-md"
        >
          <Option value="all">All Users</Option>
        </Select>
        <RangePicker
          style={{
            width: '100%',
            maxWidth: '320px',
            borderRadius: '24px',
            padding: '10px',
          }}
          onChange={handleDateRangeChange}
        />
        <Button
          type="primary"
          onClick={handleFilterClick}
          style={{
            marginLeft: '10px',
            borderRadius: '24px',
            background: '#4467a1',
          }}
        >
          Filter
        </Button>
      </div>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button
          type="primary"
          className="mb-4 sm:mb-0"
          icon={<DownloadOutlined />}
          style={{
            width: '150px',
            borderRadius: '24px',
            background: '#4467a1',
          }}
        >
          Export
        </Button>
      </Dropdown>
    </div>
  );
};

export default UserActivityHeader;
