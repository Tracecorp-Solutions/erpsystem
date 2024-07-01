import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateMaterials from "./CreateMaterials";
import { Table, Menu, Dropdown } from "antd";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

function ConfMaterials() {
  const [materials, setMaterials] = useState([]);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleUpdateModalVisible = () => {
    setIsUpdateModalVisible(true);
  };

  const handleCloseModalVisible = () => {
    setIsUpdateModalVisible(false);
  }

  const handleMenuClick = ({ key }) => {
    // Implement navigation logic based on the key (menu item clicked)
    if (key === "view") {
      navigate(`/billingdashboard`, { state: { screen: "invoice-details" } }); // Navigate to invoice details page
    } else if (key === "approve") {
      // Handle other menu item actions if needed
    }
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

  return (
    <>
      <div className="flex flex-col flex-wrap justify-center content-start py-6 rounded-3xl bg-stone-100 leading-[160%] text-neutral-600">
        <div className="flex gap-2 items-center px-6 text-base font-semibold max-md:flex-wrap max-md:px-5">
          <div className="self-stretch my-auto">Configurations</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
            className="shrink-0 self-stretch my-auto w-6 aspect-square"
            alt="Configurations"
          />
          <div className="justify-center self-stretch px-4 py-1 whitespace-nowrap bg-white rounded-2xl">
            Material Estimates
          </div>
        </div>
        <div className="flex flex-col self-center p-6 mt-6 w-full bg-white rounded-3xl max-w-[1088px] max-md:px-5 max-md:max-w-full">
          <div className="flex gap-4 justify-between w-full font-semibold leading-[160%] max-md:flex-wrap max-md:max-w-full mt-6">
            <div className="text-4xl capitalize text-neutral-600">
              Connection Materials
            </div>
            <div className="flex gap-2 justify-center px-6 py-3 my-auto text-base text-white rounded-3xl max-md:px-5">
              <button
                className="justify-center self-start px-3 py-3 mt-2.5 text-sm font-semibold text-white whitespace-nowrap rounded-3xl bg-blue-400 max-md:px-5"
                onClick={handleUpdateModalVisible}
              >
                + Add Material
              </button>
            </div>
          </div>
          <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
          <div className="mt-4 w-full">
            <div className="grid grid-cols-5 ml-4 gap-8 px-3 py-2 text-xs font-medium tracking-wide uppercase bg-stone-100 text-neutral-600 rounded-3xl">
              <div>Item Name</div>
              <div>Unit of Measure</div>
              <div>Unit Cost</div>
              <div>Invoiceable</div>
              <div>Actions</div>
            </div>
            {materials.map((material, index) => (
              <div
                key={index}
                className="grid grid-cols-5 gap-8 px-3 py-4 mt-4 ml-4 text-xs font-small tracking-wide uppercase rounded-3xl bg-white text-neutral-700 max-md:flex-wrap max-md:px-5 max-md:max-w-full"
              >
                <div>{material.materialName}</div>
                <div>{material.unitOfMeasure}</div>
                <div>{material.materialUnitPrice}</div>
                <div>{material.invoiceable ? "Yes" : "No"}</div>
                <div className="flex justify-center items-center self-stretch px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
                  <Dropdown
                    overlay={
                      <Menu onClick={handleMenuClick}>
                        <Menu.Item key="view">Edit</Menu.Item>
                        <Menu.Item key="approve">Remove</Menu.Item>
                      </Menu>
                    }
                    trigger={["click"]}
                    placement="bottomLeft"
                  >
                    <EllipsisVerticalIcon className="w-7 h-7" />
                  </Dropdown>
                </div>
              </div>
            ))}
          </div>
          <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        </div>
      </div>
    
            <CreateMaterials isUpdateModalVisible={isUpdateModalVisible} handleCloseModalVisible={handleCloseModalVisible} />
      
    </>
  );
}

export default ConfMaterials;
