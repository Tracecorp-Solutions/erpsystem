import React, { useState, useEffect } from "react";
import { Select, Modal } from "antd";
import { AiOutlineClose } from "react-icons/ai";

const { Option } = Select;

function InvoiceItem({ applicationNumber, modalView, closeAddItemsForm, onItemAdded }) {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [materialName,setMaterialName] = useState("");
  const [quantity, setItemQuantity] = useState(0);
  const [price, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    materialId: "",
    quantity: "",
    price: "",
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/GetMaterials`);
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
      setTotalPrice(selectedMaterialData.materialUnitPrice * quantity);
      setFormData((prevFormData) => ({
        ...prevFormData,
        materialId: selectedMaterialData.materialId,
        price: selectedMaterialData.materialUnitPrice * quantity,
        totalSum: totalSum
      }));
    }
  }, [selectedMaterial, quantity, materials]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { ...formData };
    setData([...data, newItem]);
    setFormData({ materialId: "", quantity: "", price: "" });
    setSelectedMaterial("");
    setItemQuantity(0);
    setTotalPrice(0);
    onItemAdded(newItem);
    handleCancel();
  };

  const handleMaterialChange = (e) => {
    setSelectedMaterial(e);
    setFormData((prevFormData) =>({
      ...prevFormData,
      materialId: e
    }));
  };

  const handleQuantityChange = (e) => {
    const quantity = parseFloat(e.target.value);
    setItemQuantity(quantity);
    setFormData((prevFormData) => ({
      ...prevFormData,
      quantity: quantity,
    }));
  };

  const handleCancel = () => {
    closeAddItemsForm();
    console.log("Cancelled adding item.");
  };

  const totalSum = data.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <Modal visible={modalView} footer={null} onCancel={handleCancel}>
      <div className="flex flex-col justify-center items-left pt-4 bg-white rounded-3xl max-w-[720px] relative">

        <form onSubmit={handleSubmit}>
          <div className="text-2xl font-semibold leading-9 text-neutral-600 max-md:max-w-full">
            Create Invoice Item
          </div>
          <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
          <div className="mt-2 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Select Material
          </div>
          <Select
            placeholder="Choose Material"
            className="w-full h-10"
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
          <div className="mt-2 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Item Quantity
          </div>
          <input
            type="number"
            className="justify-center items-start px-4 py-2 mt-2 max-w-full text-base leading-6 whitespace-nowrap bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:pr-5"
            value={quantity}
            onChange={handleQuantityChange}
            min="0"
          />
          <div className="mt-2 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Total Price: ${totalSum.toFixed(2)}
          </div>
          <div className="flex justify-center items-center self-stretch px-12 py-4 mt-6 w-full text-base leading-6 bg-white-100 max-md:px-5 max-md:mt-6 max-md:max-w-full">
            <div className="flex gap-8 max-w-full w-[696px] max-md:flex-wrap">
              <button
                type="button"
                className="justify-center items-center px-8 py-2 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="justify-center items-center px-8 py-2 font-semibold text-white rounded-3xl bg-blue-400 max-md:px-5"
              >
                Add Item
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default InvoiceItem;
