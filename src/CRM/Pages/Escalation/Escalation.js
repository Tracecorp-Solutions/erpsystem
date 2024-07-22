import React, { useState, useEffect } from "react";
import CreateEscalation from "./CreateEscalation";
import axios from "axios";

function Escalation() {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [escalationData, setEscalationData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateModalVisible = () => {
    setIsUpdateModalVisible(true);
  };

  const handleCloseModalVisible = () => {
    setIsUpdateModalVisible(false);
  };

  useEffect(() => {
    const fetchEscalationData = async () => {
      setIsLoading(true);
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}/GetAllEscalationMatrices`;
        const response = await axios.get(apiUrl);
        setEscalationData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEscalationData();
  }, []);

  return (
    <>
      <div className="flex flex-col flex-wrap justify-center content-start py-6 rounded-3xl bg-stone-100">
        <div className="flex gap-2 px-6 text-base leading-6 text-neutral-600 max-md:flex-wrap max-md:px-5">
          <div className="font-semibold">Configuration</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
            className="shrink-0 self-start w-6 aspect-square"
          />
          <div className="max-md:max-w-full">Escalation Matrix</div>
        </div>
        <div className="flex flex-col self-center p-6 mt-6 w-full bg-white rounded-3xl max-w-[1088px] max-md:px-5 max-md:max-w-full">
          <div className="flex gap-4 justify-between w-full font-semibold leading-[160%] max-md:flex-wrap max-md:max-w-full">
            <div className="text-2xl capitalize text-neutral-600">
              Escalation Levels
            </div>
            <div className="flex gap-2 justify-center px-6 py-3 my-auto text-base text-white rounded-3xl max-md:px-5">
              <button
                className="justify-center self-start px-3 py-3 mt-2.5 text-sm font-semibold text-white whitespace-nowrap rounded-3xl bg-blue-400 max-md:px-5"
                onClick={handleUpdateModalVisible}
              >
                Add escalation level
              </button>
            </div>
          </div>
          <div className="flex flex-col mt-4 max-md:flex-wrap max-md:max-w-full">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-stone-100">
                  <tr>
                    <th className="py-2 px-4 text-xs font-medium tracking-wide uppercase text-neutral-600">Level Name</th>
                    <th className="py-2 px-4 text-xs font-medium tracking-wide uppercase text-neutral-600">Description</th>
                    <th className="py-2 px-4 text-xs font-medium tracking-wide uppercase text-neutral-600">Department ID</th>
                    <th className="py-2 px-4 text-xs font-medium tracking-wide uppercase text-neutral-600">Ticket Category ID</th>
                    <th className="py-2 px-4 text-xs font-medium tracking-wide uppercase text-neutral-600">Priority ID</th>
                    <th className="py-2 px-4 text-xs font-medium tracking-wide uppercase text-neutral-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {escalationData.map((item, index) => (
                    <tr key={index} className="border-b border-neutral-200">
                      <td className="py-2 px-4 text-neutral-600">{item.levelName}</td>
                      <td className="py-2 px-4 text-neutral-600">{item.levelDescription}</td>
                      <td className="py-2 px-4 text-neutral-600">{item.department.name}</td>
                      <td className="py-2 px-4 text-neutral-600">{item.ticketCategory.name}</td>
                      
                      <td className="py-2 px-4 text-neutral-600">{item.priority.priorityName}</td>
                      <td className="py-2 px-4 text-neutral-600">
                        <div className="flex justify-center items-center w-8 h-8 rounded-3xl bg-stone-100 cursor-pointer">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/42a5d3f78babd3069a71e10613168804eab1586a963c62ad0e2851d7f0c22f93?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                            className="w-5 aspect-square"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <CreateEscalation
        isUpdateModalVisible={isUpdateModalVisible}
        handleCloseModalVisible={handleCloseModalVisible}
      />
    </>
  );
}

export default Escalation;
