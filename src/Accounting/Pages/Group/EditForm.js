import { useState } from "react";
const EditForm = ({ editedGroupAccount, handleSubmitEdit, closeEditForm }) => {
    const [editedAccount, setEditedAccount] = useState(editedGroupAccount);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedAccount({ ...editedAccount, [name]: value });
    };
  
    const handleBehaviorChange = (e) => {
      const { value } = e.target;
      setEditedAccount({ ...editedAccount, behaviour: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      handleSubmitEdit(editedAccount);
    };
  
    return (
      <>
        <div className="content fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 mt-10">
          <div
            className="modal-content bg-white rounded-lg shadow-lg"
            style={{
              width: "80%",
              maxWidth: "600px ",
              maxHeight: "600px",
              borderRadius: "25px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                position: "relative",
                bottom: "25px",
              }}
            >
            </div>
            <h2 className="text-xl font-semibold mb-4">Edit {editedAccount.name}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name:
                </label>
                <input
                  type="text"
                  onClick={(e) => e.stopPropagation()}
                  id="name"
                  name="name"
                  className="
                mt-1
                p-4 block
                w-full
                sm:text-sm
                rounded-md
                text-input
                focus:ring-indigo-500
                focus:border-gray-400
                focus-visible:border-indigo-500
                "
                  value={editedAccount.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="behaviour"
                  className="block text-sm font-medium text-gray-700"
                >
                  Behaviour:
                </label>
                <select
                  id="behaviour"
                  name="behaviour"
                  className="
                  mt-1
                  focus:ring-indigo-500
                  focus:border-indigo-500
                  p-4 block
                  w-full
                  border-gray-300
                  rounded-md
                  sm:text-sm
                  text-input
                  "
                  value={editedAccount.behaviour}
                  onChange={handleBehaviorChange}
                >
                  <option value="">Select group behavior</option>
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  onClick={(e) => e.stopPropagation()}
                  name="description"
                  value={editedAccount.description}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1
                p-4 block
                w-full
                sm:text-sm
                rounded-md
                text-input
                focus:ring-indigo-500
                focus:border-gray-400
                focus-visible:border-indigo-500
                "
                ></textarea>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  type="button"
                  className="px-4
              py-2
              text-white
              rounded-md
              text-sm
              font-semibold
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-offset-2
              focus-visible:ring-indigo-
              "
                  style={{
                    background: "#F6F6F4",
                    color: "#505050",
                    width: "40%",
                    borderRadius: "25px",
                    fontFamily: "out-fit, sans-serif"
                  }}
                  onClick={closeEditForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="
              ml-3
              px-4
              py-2
              bg-indigo-600
              text-white
              rounded-md
              text-sm
              font-semibold
              hover:bg-indigo-700
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-offset-2
              focus-visible:ring-indigo-500
              "
                  style={{
                    color: "#fff",
                    width: "40%",
                    borderRadius: "25px",
                    fontFamily: "out-fit, sans-serif"
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
  
    );
  };
  
export default EditForm;