import React from "react";

const ProfileGroupsForm = ({ onSave }) => {
  // Define the form for User Groups section
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      // Handle form submission
      onSave();
    }}>
      {/* Form fields for User Groups section */}
      <h2>User Groups Form</h2>
      {/* Add your form fields here */}
      <button type="submit">Save</button>
    </form>
  );
};

const InviteUsersForm = ({ onSave }) => {
  // Define the form for Invite Users section
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      // Handle form submission
      onSave();
    }}>
      {/* Form fields for Invite Users section */}
      <h2>Invite Users Form</h2>
      {/* Add your form fields here */}
      <button type="submit">Save</button>
    </form>
  );
};

export { ProfileGroupsForm, InviteUsersForm };
