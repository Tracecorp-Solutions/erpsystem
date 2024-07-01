import React, { useState } from "react";
import { Modal, Button } from "antd";
import axios from "axios";
import "../../../styles/AccountCreation.css";

const SubGroupEditForm = ({ visible, subgroup, onEdit, onCancel, group, }) => {
  const [editedSubgroup, setEditedSubgroup] = useState({
    id: subgroup.id,
    name: subgroup.name,
    description: subgroup.description,
    groupId: subgroup.groupId,
  });

  console.log("editedddd", subgroup)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSubgroup({
      ...editedSubgroup,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/EditSubGroupAccount`,
        editedSubgroup
      );
      console.log("Subgroup updated:", response.data);
      onEdit();
    } catch (error) {
      console.error("Error updating subgroup:", error);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Edit Subgroup"
      onCancel={onCancel}
      footer={null}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedSubgroup.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        
        <div className="mb-4">
          <label htmlFor="groupId" className="block mb-1">
            Group
          </label>
          <p>Select the group this subgroup belongs to</p>
          <select
            id="groupId"
            name="groupId"
            value={editedSubgroup.groupId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            style={{ borderRadius: "12px", padding: "15px" }}
          >
            <option value="">Select Group</option>
            {group.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={editedSubgroup.description}
            onChange={handleChange}
            placeholder="Please enter description..."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="py-2 px-4 text-gray-700 rounded focus:outline-none"
            style={{
              borderRadius: "28px",
              fontFamily: "outFit, Sans-serif",
              width: "40%",
              border: "#505050 1px solid",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            style={{
              background: "#4467a1",
              borderRadius: "28px",
              fontFamily: "outFit, Sans-serif",
              width: "40%",
            }}
          >
            Save Account
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SubGroupEditForm;
