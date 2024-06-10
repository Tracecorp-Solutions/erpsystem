import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'antd';
import UserActivityHeader from './UserActivityHeader';

const UserActivity = () => {
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [filter, setFilter] = useState({ startDate: null, endDate: null, user: 'all' });

  useEffect(() => {
    fetchActivities();
  }, [currentPage, filter]);
  
  const fetchActivities = async () => {
    let startDate = '2024-01-01';
    let endDate = '2024-07-01';
  
    if (filter.startDate && filter.endDate) {
      startDate = filter.startDate.format('YYYY-MM-DD');
      endDate = filter.endDate.format('YYYY-MM-DD');
    } else {
      setActivities([]);
      setTotalItems(0);
      return;
    }
  
    console.log("Fetching activities for date range:", startDate, endDate);
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/Report/AuditTrails?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
  
      if (data && data.length > 0) {
        setActivities(data);
        setTotalItems(data.length);
      } else {
        setActivities([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
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

  const handleUserChange = (value) => {
    // Update filter state with the selected user
    setFilter({ ...filter, user: value });
  };

  return (
    <div>
      <UserActivityHeader onFilterChange={setFilter} />
      <Table dataSource={filteredData} columns={columns} pagination={false} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <div style={{ fontSize: '12px', color: '#a1a1a1' }}>
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
