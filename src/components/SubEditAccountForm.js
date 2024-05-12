import React, { useState } from "react";

export default function EditSubAccountForm({ account, onSubmit }) {
  const [editedAccount, setEditedAccount] = useState({
    id: account.id,
    name: account.name,
    description: account.description,
    groupId: account.groupId,
    dateCreated: account.dateCreated,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAccount({ ...editedAccount, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedAccount);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={editedAccount.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={editedAccount.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="groupId">Group ID:</label>
        <input
          type="number"
          id="groupId"
          name="groupId"
          value={editedAccount.groupId}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="dateCreated">Date Created:</label>
        <input
          type="text"
          id="dateCreated"
          name="dateCreated"
          value={editedAccount.dateCreated}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
