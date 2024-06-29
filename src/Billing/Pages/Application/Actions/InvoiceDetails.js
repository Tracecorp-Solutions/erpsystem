import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Reject from "./Reject";

function InvoiceDetails() {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  const handleUpdateModalVisible = () => {
    setIsUpdateModalVisible(!isUpdateModalVisible);
  };

  const handleMenuClick = ({ key }) => {
    if (key === "authorize") {
      console.log("Authorize Invoice clicked");
      // Add logic for authorize action
    } else if (key === "reject") {
      console.log("Reject Invoice clicked");
      handleUpdateModalVisible();
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="authorize">Authorize Invoice</Menu.Item>
      <Menu.Item key="reject" style={{ color: "red" }}>
        Reject Invoice
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="flex flex-col justify-end items-center px-16 pt-8 bg-white max-md:px-5">
        <div className="flex flex-col w-full max-w-[1200px] max-md:max-w-full">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/408fafcebc6b68b9bb22a4c9f099c724596e89747ebf76a6651a94c7f3a08b5e?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/408fafcebc6b68b9bb22a4c9f099c724596e89747ebf76a6651a94c7f3a08b5e?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/408fafcebc6b68b9bb22a4c9f099c724596e89747ebf76a6651a94c7f3a08b5e?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/408fafcebc6b68b9bb22a4c9f099c724596e89747ebf76a6651a94c7f3a08b5e?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/408fafcebc6b68b9bb22a4c9f099c724596e89747ebf76a6651a94c7f3a08b5e?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/408fafcebc6b68b9bb22a4c9f099c724596e89747ebf76a6651a94c7f3a08b5e?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/408fafcebc6b68b9bb22a4c9f099c724596e89747ebf76a6651a94c7f3a08b5e?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/408fafcebc6b68b9bb22a4c9f099c724596e89747ebf76a6651a94c7f3a08b5e?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
            className="aspect-[1.25] w-[87px]"
          />
          
          <div className="flex gap-5 justify-between mt-2 w-full max-md:flex-wrap max-md:max-w-full">
            <div className="flex gap-5 justify-between text-neutral-600 max-md:flex-wrap">
            <div className="text-4xl font-semibold leading-[57.6px]">
            TraceCorp Solutions
          </div>
          <div className="justify-center px-6 py-2.5 my-auto text-xs font-medium tracking-wide uppercase whitespace-nowrap rounded-3xl bg-stone-100 max-md:px-5">
            unpaid
          </div>
            </div>
            <div className="flex gap-2 justify-center py-2 pr-3 pl-4 my-auto text-base bg-blue-400 font-semibold leading-6 text-white whitespace-nowrap rounded-3xl">
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                placement="bottomLeft"
              >
                <div className="flex gap-2 justify-center py-3 pr-4 pl-6 my-auto text-base font-semibold leading-6 text-white whitespace-nowrap rounded-3xl bg-blue-400">
                  <div>Actions</div>
                  <DownOutlined />
                </div>
              </Dropdown>
            </div>
          </div>
          <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
          <div className="mt-6 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                  <div className="flex gap-1 max-md:flex-wrap">
                    <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                      invoice no
                    </div>
                    <div className="text-base font-semibold leading-6 text-neutral-600">
                      #5678
                    </div>
                  </div>
                  <div className="flex gap-1 mt-1 max-md:flex-wrap">
                    <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                      Address
                    </div>
                    <div className="text-base leading-6 text-neutral-600">
                      Abeokuta, Nigeria Ogun
                    </div>
                  </div>
                  <div className="flex gap-1 mt-1 whitespace-nowrap max-md:flex-wrap">
                    <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                      phone
                    </div>
                    <div className="text-base leading-6 text-neutral-600">
                      08139936865
                    </div>
                  </div>
                  <div className="flex gap-1 mt-1 max-md:flex-wrap">
                    <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                      issue date
                    </div>
                    <div className="text-base leading-6 text-neutral-600">
                      18/06/2024
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                  <div className="flex gap-1 max-md:flex-wrap">
                    <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                      invoice to
                    </div>
                    <div className="text-base font-semibold leading-6 text-neutral-600">
                      Grace Eze
                    </div>
                  </div>
                  <div className="flex gap-1 mt-1 max-md:flex-wrap">
                    <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                      Address
                    </div>
                    <div className="text-base leading-6 text-neutral-600">
                      Abeokuta, Nigeria Ogun
                    </div>
                  </div>
                  <div className="flex gap-1 mt-1 whitespace-nowrap max-md:flex-wrap">
                    <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                      phone
                    </div>
                    <div className="text-base leading-6 text-neutral-600">
                      081220000789
                    </div>
                  </div>
                  <div className="flex gap-1 mt-1 max-md:flex-wrap">
                    <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                      due date
                    </div>
                    <div className="text-base leading-6 text-neutral-600">
                      25/06/2024
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="shrink-0 mt-5 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
            <div className="mt-8 max-md:max-w-full">
              <div className="relative overflow-x-auto mt-6 border border-solid border-stone-100">
                <table className="w-full text-left border-collapse table-auto">
                  <thead>
                    <tr className="bg-stone-50">
                      <th className="px-6 py-2 text-xs font-medium tracking-wide uppercase whitespace-nowrap text-neutral-600">
                        service type
                      </th>
                      <th className="px-6 py-2 text-xs font-medium tracking-wide uppercase whitespace-nowrap text-neutral-600">
                        description
                      </th>
                      <th className="px-6 py-2 text-xs font-medium tracking-wide uppercase whitespace-nowrap text-neutral-600">
                        amount
                      </th>
                      <th className="px-6 py-2 text-xs font-medium tracking-wide uppercase whitespace-nowrap text-neutral-600">
                        status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    <tr>
                      <td className="px-6 py-2 whitespace-nowrap">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <div className="text-sm leading-5 text-neutral-600">
                              Water Connection
                            </div>
                            <div className="text-sm leading-5 text-neutral-600">
                              1
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        <div className="flex flex-col gap-2">
                          <div className="text-sm leading-5 text-neutral-600">
                            Residential Water Supply
                          </div>
                          <div className="text-sm leading-5 text-neutral-600">
                            10,000
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        <div className="flex flex-col gap-2">
                          <div className="text-sm leading-5 text-neutral-600">
                            10,000
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        <div className="flex flex-col gap-2">
                          <div className="text-sm leading-5 text-neutral-600">
                            Pending
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-2 whitespace-nowrap">
                        <div className="flex flex-col gap-2">
                          <div className="text-sm leading-5 text-neutral-600">
                            Sewer Connection
                          </div>
                          <div className="text-sm leading-5 text-neutral-600">
                            1
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        <div className="flex flex-col gap-2">
                          <div className="text-sm leading-5 text-neutral-600">
                            Residential Sewer Supply
                          </div>
                          <div className="text-sm leading-5 text-neutral-600">
                            8,000
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        <div className="flex flex-col gap-2">
                          <div className="text-sm leading-5 text-neutral-600">
                            8,000
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        <div className="flex flex-col gap-2">
                          <div className="text-sm leading-5 text-neutral-600">
                            Pending
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-2 whitespace-nowrap">
                        <div className="flex flex-col gap-2">
                          <div className="text-sm leading-5 text-neutral-600">
                            Other Service
                          </div>
                          <div className="text-sm leading-5 text-neutral-600">
                            2
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        <div className="flex flex-col gap-2">
                          <div className="text-sm leading-5 text-neutral-600">
                            Additional Services
                          </div>
                          <div className="text-sm leading-5 text-neutral-600">
                            12,000
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        <div className="flex flex-col gap-2">
                          <div className="text-sm leading-5 text-neutral-600">
                            12,000
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        <div className="flex flex-col gap-2">
                          <div className="text-sm leading-5 text-neutral-600">
                            Pending
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start p-4  mt-8 rounded-lg bg-stone-100 max-md:pr-5">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400 max-md:max-w-full">
              notes
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600 max-md:max-w-full">
              This is the total costing of all the materials on the customer
              invoice as generated by the Engineer
            </div>
          </div>
          <div className="flex justify-end w-full max-w-[1200px] max-md:max-w-full">
            <div className="flex gap-3">
              <div className="flex flex-col w-full gap-3 justify-center">
                <div className="flex justify-end gap-2 my-4">
                  <div className="w-48 px-4 py-4 text-sm font-medium tracking-wide text-center text-white uppercase bg-gray-400 rounded-3xl hover:bg-blue-500">
                    Send Invoice
                  </div>
                  <div className="w-48 px-6 py-3 text-sm font-medium tracking-wide text-center text-white uppercase bg-blue-400 rounded-3xl hover:bg-red-500">
                    Download Invoice
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Reject
        isUpdateModalVisible={isUpdateModalVisible}
        handleUpdateModalVisible={handleUpdateModalVisible}
      />
    </>
  );
}

export default InvoiceDetails;
