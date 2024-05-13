import React, { useState } from "react";
import { Modal, Button } from "antd";
import axios from "axios";

const SubGroupEditForm = ({ visible, subgroup, onEdit, onCancel, group }) => {
  const [editedSubgroup, setEditedSubgroup] = useState({
    id: subgroup.id,
    name: subgroup.name,
    description: subgroup.description,
    groupId: subgroup.groupId,
  });

  console.log("sub group", subgroup)

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
        "http://54.226.71.2/EditSubGroupAccount",
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

        <div className="flex justify-end">
          <Button type="default" onClick={onCancel} className="mr-2">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SubGroupEditForm;
