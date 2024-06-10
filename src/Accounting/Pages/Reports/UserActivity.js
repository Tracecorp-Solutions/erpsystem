import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'antd';
import UserActivityHeader from './UserActivityHeader';

const UserActivity = ({ filters, exportOptions }) => {
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchActivities();
  }, [currentPage, filters]);

  const fetchActivities = async () => {
    const startDate = filters && filters.startDate ? filters.startDate.format('YYYY-MM-DD') : '2024-01-01';
    const endDate = filters && filters.endDate ? filters.endDate.format('YYYY-MM-DD') : '2024-07-01';
    const response = await fetch(`http://3.216.182.63:8095/api/Report/AuditTrails?startDate=${startDate}&endDate=${endDate}`);
    const data = await response.json();
    setActivities(data);
    setTotalItems(data.length); // Update totalItems for pagination
  };
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = activities.slice(indexOfFirstItem, indexOfLastItem);

  const columns = [
    {
      title: 'User',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Activity',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Date',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
  ];

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <UserActivityHeader onFilterChange={fetchActivities} />
      <Table dataSource={filteredData} columns={columns} pagination={false} />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        <div style={{ fontSize: "12px", color: "#a1a1a1" }}>
          Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, totalItems)} of {totalItems} results
        </div>
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={itemsPerPage}
          onChange={paginate}
        />
      </div>
    </div>
  );
};

export default UserActivity;
