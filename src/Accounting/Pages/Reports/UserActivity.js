import React from 'react';
import { Table } from 'antd';
import UserActivityHeader from './UserActivityHeader';

const UserActivity = () => {
  const activities = [
    { user: 'User A', activityName: 'Login', activityDate: '2024-06-01' },
    { user: 'User B', activityName: 'Comment', activityDate: '2024-06-02' },
    { user: 'User A', activityName: 'Update Profile', activityDate: '2024-06-03' },
  ];

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

  return (
    <div>
        <UserActivityHeader />
      <Table dataSource={activities} columns={columns} />
    </div>
  );
};

export default UserActivity;
