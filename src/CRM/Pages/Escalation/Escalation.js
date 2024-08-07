import React, { useState, useEffect } from "react";
import CreateEscalation from "./CreateEscalation";
// import EditEscalation from "./EditEscalation";
import axios from "axios";
import { Pagination, Button, message } from "antd";

function Escalation() {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [escalationData, setEscalationData] = useState([]);
  const [editingEscalation, setEditingEscalation] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const pageSize = 12; 

  const handleUpdateModalVisible = () => {
    setIsUpdateModalVisible(true);
    setEditingEscalation(null);
  };

  const handleCloseModalVisible = () => {
    setIsUpdateModalVisible(false);
    setEditingEscalation(null);
  };

  const fetchEscalationData = async () => {
    setIsLoading(true);
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/GetAllEscalationMatrices`;
      const response = await axios.get(apiUrl);
      setEscalationData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEscalationData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate current items based on pagination
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = escalationData.slice(indexOfFirstItem, indexOfLastItem);

  const handleEdit = async (record) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/GetEscalationById/${record.id}`);
      setEditingEscalation(response.data); // Assuming response.data contains escalation details
      setIsUpdateModalVisible(true);
    } catch (error) {
      console.error("Error fetching escalation:", error);
      message.error("Failed to fetch escalation details");
    }
  };

  const handleSave = async (values) => {
    try {
      if (editingEscalation) {
        // Update existing escalation
        await axios.put(`${process.env.REACT_APP_API_URL}/UpdateEscalation/${editingEscalation.id}`, values);
        message.success("Escalation level updated successfully");
      } else {
        // Create new escalation
        await axios.post(`${process.env.REACT_APP_API_URL}/CreateEscalation`, values);
        message.success("Escalation level created successfully");
      }
      fetchEscalationData(); 
      handleCloseModalVisible();
    } catch (error) {
      console.error("Error updating escalation:", error);
      message.error("Failed to update escalation level");
    }
  };

  return (
    <>
      <div className="flex flex-col flex-wrap justify-center content-start py-6 rounded-3xl bg-stone-100">
        <div className="flex gap-2 px-6 text-base leading-6 text-neutral-600 max-md:flex-wrap max-md:px-5">
          <div className="font-semibold">Configuration</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
            className="shrink-0 self-start w-6 aspect-square"
          />
          <div className="max-md:max-w-full">Escalation Matrix</div>
        </div>
        <div className="flex flex-col self-center p-6 mt-6 w-full bg-white rounded-3xl max-w-[1088px] max-md:px-5 max-md:max-w-full">
          <div className="flex gap-4 justify-between w-full font-semibold leading-[160%] max-md:flex-wrap max-md:max-w-full">
            <div className="text-2xl capitalize text-neutral-600">
              Escalation Levels
            </div>
            <div className="flex gap-2 justify-center px-6 py-3 my-auto text-base text-white rounded-3xl max-md:px-5">
              <Button
                type="primary"
                onClick={handleUpdateModalVisible}
              >
                Add escalation level
              </Button>
            </div>
          </div>
          <div className="flex flex-col mt-4 max-md:flex-wrap max-md:max-w-full">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-stone-100">
                  <tr>
                    <th className="py-2 px-4 text-xs font-medium tracking-wide uppercase text-neutral-600">Level Name</th>
                    <th className="py-2 px-4 text-xs font-medium tracking-wide uppercase text-neutral-600">Description</th>
                    <th className="py-2 px-4 text-xs font-medium tracking-wide uppercase text-neutral-600">Department ID</th>
                    <th className="py-2 px-4 text-xs font-medium tracking-wide uppercase text-neutral-600">Ticket Category ID</th>
                    <th className="py-2 px-4 text-xs font-medium tracking-wide uppercase text-neutral-600">Priority ID</th>
                    <th className="py-2 px-4 text-xs font-medium tracking-wide uppercase text-neutral-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={index} className="border-b border-neutral-200">
                      <td className="py-2 px-4 text-neutral-600">{item.levelName}</td>
                      <td className="py-2 px-4 text-neutral-600">{item.levelDescription}</td>
                      <td className="py-2 px-4 text-neutral-600">{item.department.name}</td>
                      <td className="py-2 px-4 text-neutral-600">{item.ticketCategory.name}</td>
                      <td className="py-2 px-4 text-neutral-600">{item.priority.priorityName}</td>
                      <td className="py-2 px-4 text-neutral-600">
                        <Button type="link" onClick={() => handleEdit(item)}>
                          ...
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Pagination component */}
          <Pagination
            current={currentPage}
            total={escalationData.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            className="mt-4"
          />
        </div>
      </div>
      {/* CreateEscalation and EditEscalation modals */}
      <CreateEscalation
        isUpdateModalVisible={isUpdateModalVisible && !editingEscalation}
        handleCloseModalVisible={handleCloseModalVisible}
        handleSave={handleSave}
      />
      {/* {editingEscalation && (
        <EditEscalation
          isUpdateModalVisible={isUpdateModalVisible}
          editingEscalation={editingEscalation}
          handleCloseModalVisible={handleCloseModalVisible}
          handleSave={handleSave}
        />
      )} */}
    </>
  );
}

export default Escalation;