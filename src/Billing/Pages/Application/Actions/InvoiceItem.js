import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { AiOutlineClose } from "react-icons/ai";

const { Option } = Select;

function InvoiceItem({ applicationNumber }) {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  const onClose = () => {
    setIsUpdateModalVisible(false); // Closing the modal by updating state
  };

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(
          "http://3.216.182.63:8095/TestApi/GetMaterials"
        );
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, []);

  useEffect(() => {
    const selectedMaterialData = materials.find(
      (material) => material.materialName === selectedMaterial
    );
    if (selectedMaterialData) {
      setTotalPrice(selectedMaterialData.materialUnitPrice * itemQuantity);
    }
  }, [selectedMaterial, itemQuantity, materials]);

  const handleMaterialChange = (value) => {
    setSelectedMaterial(value);
  };

  const handleQuantityChange = (e) => {
    setItemQuantity(parseFloat(e.target.value));
  };

  const handleCancel = () => {
    console.log("Cancelled adding item.");
    onClose();
  };

  const handleAddItem = async () => {
    const selectedMaterialData = materials.find(
      (material) => material.materialName === selectedMaterial
    );

    const invoiceData = {
      applicationNumber: applicationNumber,
      date: new Date().toISOString(),
      materialsDtos: [
        {
          newConnectionInvoiceId: 0,
          materialId: selectedMaterialData.materialId,
          quantity: itemQuantity,
          price: totalPrice,
        },
      ],
    };

    try {
      const response = await fetch(
        "http://3.216.182.63:8095/TestApi/AddConnectionInvoice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(invoiceData),
        }
      );

      if (response.ok) {
        alert("Invoice item added successfully");
        onClose(); // Close the modal after successful submission
      } else {
        alert("Failed to add invoice item");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  return (
    <div className="flex flex-col justify-center items-left pt-4 bg-white rounded-3xl max-w-[720px] relative">
      <button
        type="button"
        className="absolute top-4 right-4 text-gray-500"
        onClick={onClose}
      >
        <AiOutlineClose />
      </button>
      
      <div className="text-2xl font-semibold leading-9 text-neutral-600 max-md:max-w-full">
        Create Invoice Item
      </div>

      <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="mt-2 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
        Select Material
      </div>
      <div className="flex gap-2 justify-between px-4 py-2 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap">
        <Select
          placeholder="Choose Material"
          className="w-full"
          value={selectedMaterial}
          onChange={handleMaterialChange}
          dropdownClassName="bg-white text-neutral-600"
        >
          {materials.map((material) => (
            <Option key={material.materialId} value={material.materialName}>
              {material.materialName}
            </Option>
          ))}
        </Select>
      </div>
      <div className="mt-2 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
        Item Quantity
      </div>
      <input
        type="number"
        className="justify-center items-start px-4 py-2 mt-2 max-w-full text-base leading-6 whitespace-nowrap bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:pr-5"
        value={itemQuantity}
        onChange={handleQuantityChange}
        min="1"
      />
      <div className="mt-2 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
        Total Price: ${totalPrice.toFixed(2)}
      </div>
      <div className="flex justify-center items-center self-stretch px-12 py-4 mt-6 w-full text-base leading-6 bg-white-100 max-md:px-5 max-md:mt-6 max-md:max-w-full">
        <div className="flex gap-8 max-w-full w-[696px] max-md:flex-wrap">
          <button
            className="justify-center items-center px-8 py-2 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="justify-center items-center px-8 py-2 font-semibold text-white rounded-3xl bg-blue-400 max-md:px-5"
            onClick={handleAddItem}
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default InvoiceItem;
