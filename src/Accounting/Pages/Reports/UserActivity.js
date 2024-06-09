import React, { useState } from 'react';
import { Table, Pagination } from 'antd';
import UserActivityHeader from './UserActivityHeader';

const UserActivity = () => {
  const activities = [
    { user: 'User A', activityName: 'Login', activityDate: '2024-06-01' },
    { user: 'User B', activityName: 'Comment', activityDate: '2024-06-02' },
    { user: 'User A', activityName: 'Update Profile', activityDate: '2024-06-03' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // You can set the number of items per page here
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = activities.slice(indexOfFirstItem, indexOfLastItem);

  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Activity Name',
      dataIndex: 'activityName',
      key: 'activityName',
    },
    {
      title: 'Activity Date',
      dataIndex: 'activityDate',
      key: 'activityDate',
    },
  ];

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <UserActivityHeader />
      <Table dataSource={filteredData} columns={columns} pagination={false} />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        <div style={{ fontSize: "12px", color: "#a1a1a1" }}>
          Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, activities.length)} of {activities.length} results
        </div>
        <Pagination
          current={currentPage}
          total={activities.length}
          pageSize={itemsPerPage}
          onChange={paginate}
        />
      </div>
    </div>
  );
};

export default UserActivity;
