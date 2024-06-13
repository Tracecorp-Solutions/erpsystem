import React, { useState } from "react";

export default function EditAccountForm({ account, onSubmit }) {
  const [editedAccount, setEditedAccount] = useState({
    name: account.name,
    behaviour: account.behaviour,
    description: account.description,
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
        <label htmlFor="behaviour">Behaviour:</label>
        <input
          type="text"
          id="behaviour"
          name="behaviour"
          value={editedAccount.behaviour}
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
      <button type="submit">Submit</button>
    </form>
  );
}
