import React, { useState, useEffect } from "react";

function ShowMaterials() {
  const [materials, setMaterials] = useState([]);

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
    <div className="flex flex-col flex-wrap justify-center content-start py-6 rounded-3xl bg-stone-100 leading-[160%] text-neutral-600">
      <div className="flex gap-2 items-center px-6 text-base font-semibold max-md:flex-wrap max-md:px-5">
        <div className="self-stretch my-auto">Applications</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
          className="shrink-0 self-stretch my-auto w-6 aspect-square"
        />
        <div className="justify-center self-stretch px-4 py-1 whitespace-nowrap bg-white rounded-2xl">
          APP567890
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
          className="shrink-0 self-stretch my-auto w-6 aspect-square"
        />
        <div className="self-stretch my-auto max-md:max-w-full">
          Materials Expenditure List
        </div>
      </div>
      <div className="flex flex-col self-center p-6 mt-6 w-full bg-white rounded-3xl max-w-[1088px] max-md:px-5 max-md:max-w-full">
        <div className="text-4xl font-semibold capitalize max-md:max-w-full">
          Materials Expenditure List
        </div>
        <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="mt-4 w-full">
          <div className="grid grid-cols-4 gap-4 px-3 py-2 text-xs font-medium tracking-wide uppercase bg-stone-100 text-neutral-600 rounded-3xl">
            <div>Item Name</div>
            <div>Unit of Measure</div>
            <div>Description</div>
            <div>Unit Cost</div>
          </div>
          {materials.map((material, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 px-3 py-4 mt-4 text-x font-small tracking-wide uppercase rounded-3xl bg-white text-neutral-700 max-md:flex-wrap max-md:px-5 max-md:max-w-full"
            >
              <div>{material.materialName}</div>
              <div>{material.unitOfMeasure}</div>
              <div>{material.materialDescription}</div>
              <div>{material.materialUnitPrice}</div>
            </div>
          ))}
        </div>

        <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      </div>
    </div>
  );
}

export default ShowMaterials;
