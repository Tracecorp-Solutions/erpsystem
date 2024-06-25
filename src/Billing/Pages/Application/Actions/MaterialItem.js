import React, { useState } from 'react';

function MaterialItem() {
  const [materialName, setMaterialName] = useState('');
  const [materialUnitPrice, setMaterialUnitPrice] = useState('');
  const [unitOfMeasure, setUnitOfMeasure] = useState('');
  const [materialDescription, setMaterialDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const materialData = {
      materialName,
      materialUnitPrice: parseFloat(materialUnitPrice),
      unitOfMeasure,
      materialDescription,
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
      } else {
        alert('Failed to add material');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="flex flex-col items-start text-base leading-6 max-w-[920px]">
      <div className="text-4xl font-semibold text-neutral-600 max-md:max-w-full text-left">
        Add Material Item
      </div>
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

        <div className="flex justify-center items-start self-stretch px-16 py-6 mt-10 w-full bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-4 max-w-full w-[496px] max-md:flex-wrap">
            <button
              type="button"
              className="justify-center items-center px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5 text-left"
              onClick={() => {
                setMaterialName('');
                setMaterialUnitPrice('');
                setUnitOfMeasure('');
                setMaterialDescription('');
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="justify-center items-center px-8 py-4 font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5 text-left"
            >
              Submit Item
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MaterialItem;
