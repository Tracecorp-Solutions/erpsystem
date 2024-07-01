import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from 'react-icons/ai'; // Importing the X icon from React Icons

function CreateMaterials() {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(true); // Assuming the modal is visible initially
  const navigate = useNavigate();

  const handleUpdateModalVisible = () => {
    setIsUpdateModalVisible(!isUpdateModalVisible);
  };

  const [materialName, setMaterialName] = useState('');
  const [materialUnitPrice, setMaterialUnitPrice] = useState('');
  const [unitOfMeasure, setUnitOfMeasure] = useState('');
  const [materialDescription, setMaterialDescription] = useState('');
  const [invoiceable, setInvoiceable] = useState('true'); // Initializing invoiceable state

  const handleSubmit = async (e) => {
    e.preventDefault();

    const materialData = {
      materialName,
      materialUnitPrice: parseFloat(materialUnitPrice),
      unitOfMeasure,
      materialDescription,
      invoiceable: invoiceable === 'true', // Converting to boolean
    };

    try {
      const response = await fetch('http://3.216.182.63:8095/TestApi/AddMaterial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(materialData),
      });

      if (response.ok) {
        alert('Material added successfully');
        // Clear form
        setMaterialName('');
        setMaterialUnitPrice('');
        setUnitOfMeasure('');
        setMaterialDescription('');
        setInvoiceable('true');
      } else {
        alert('Failed to add material');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  if (!isUpdateModalVisible) {
    return null; // Return null if the modal is not visible
  }

  return (
    <div className="flex flex-col items-start text-base leading-6 max-w-[920px] relative">
      <div className="text-4xl font-semibold text-neutral-600 max-md:max-w-full text-left">
        Add Material Item
      </div>
      <button
        type="button"
        className="absolute top-4 right-4 text-gray-500"
        onClick={handleUpdateModalVisible}
      >
        <AiOutlineClose size={24} />
      </button>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mt-4 font-semibold text-neutral-600 max-md:max-w-full text-left">
          Material Name
        </div>
        <input
          type="text"
          value={materialName}
          onChange={(e) => setMaterialName(e.target.value)}
          className="mt-2 w-full px-4 py-2 border border-solid border-neutral-500 rounded-xl"
          required
        />

        <div className="mt-4 font-semibold text-neutral-600 max-md:max-w-full text-left">
          Material Unit Price
        </div>
        <input
          type="number"
          value={materialUnitPrice}
          onChange={(e) => setMaterialUnitPrice(e.target.value)}
          className="mt-2 w-full px-4 py-2 border border-solid border-neutral-500 rounded-xl"
          required
        />

        <div className="mt-4 font-semibold text-neutral-600 max-md:max-w-full text-left">
          Unit of Measure
        </div>
        <input
          type="text"
          value={unitOfMeasure}
          onChange={(e) => setUnitOfMeasure(e.target.value)}
          className="mt-2 w-full px-4 py-2 border border-solid border-neutral-500 rounded-xl"
          required
        />

        <div className="mt-4 font-semibold text-neutral-600 max-md:max-w-full text-left">
          Material Description
        </div>
        <textarea
          value={materialDescription}
          onChange={(e) => setMaterialDescription(e.target.value)}
          className="mt-2 w-full px-4 py-2 border border-solid border-neutral-500 rounded-xl"
          required
        />

        <div className="mt-4 font-semibold text-neutral-600 max-md:max-w-full text-left">
          Invoiceable
        </div>
        <select
          value={invoiceable}
          onChange={(e) => setInvoiceable(e.target.value)}
          className="mt-2 w-full px-4 py-2 border border-solid border-neutral-500 rounded-xl"
          required
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <div className="flex justify-center items-start self-stretch px-16 py-6 mt-10 w-full bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-4 max-w-full w-[496px] max-md:flex-wrap">
            <button
              type="button"
              className="justify-center items-center px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-gray-400 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5 text-left"
              onClick={() => {
                setMaterialName('');
                setMaterialUnitPrice('');
                setUnitOfMeasure('');
                setMaterialDescription('');
                setInvoiceable('true');
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="justify-center items-center px-8 py-4 font-semibold text-white rounded-3xl bg-blue-400 max-md:px-5 text-left"
            >
              Submit Item
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateMaterials;
