import React, { useState, useEffect } from 'react';
import { Select, DatePicker, message } from 'antd';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

const { Option } = Select;

const EditDocketInitiation = () => {
  const location = useLocation();
  const { state } = location;

  const application = state?.application;

  const [formData, setFormData] = useState({
    applicationNumber: state?.applicationNumberDisplay || '',
    customerRef: application?.customerRef || '',
    meterNumber: application?.meterNumber || '',
    blockNumber: application?.blockNumber || '',
    customerType: '',
    meterType: application?.meterType || '',
    meterSize: application?.meterSize || '',
    location: application?.locationCordinates || '',
    initialReading: application?.initialReading || '',
    dials: application?.dials || '',
    meterManufactureDate: application?.meterManufactureDate ? moment(application.meterManufactureDate) : null,
    installationDate: application?.dateOfInstallation ? moment(application.dateOfInstallation) : null,
    installedBy: application?.installedBy || null,
    remarks: application?.remarks || ''
  });

  useEffect(() => {
    if (application) {
      setFormData({
        applicationNumber: application?.application.applicationNumber || '',
        customerRef: application.customerRef || '',
        meterNumber: application.meterNumber || '',
        blockNumber: application.blockNumber || '',
        customerType: 'helllo',
        meterType: application.meterType || '',
        meterSize: application.meterSize || '',
        locationCordinates: application.locationCordinates || '',
        initialReading: application.initialReading || '',
        dials: application.dials || '',
        meterManufactureDate: application.meterManufactureDate ? moment(application.meterManufactureDate) : null,
        installationDate: application.dateOfInstallation ? moment(application.dateOfInstallation) : null,
        installedBy: application.installedBy || null,
        remarks: application.remarks || ''
      });
    }
  }, [application, state]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSelectChange = (value, key) => {
    if (key === 'installedBy') {
      value = parseInt(value);
    }
    setFormData({
      ...formData,
      [key]: value
    });
  };

  const handleDateChange = (date, dateString, key) => {
    setFormData({
      ...formData,
      [key]: dateString
    });
  };

  const handleGetCustomerRef = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/GenerateCustomerRef`, {
        headers: {
          'Accept': 'application/json'
        }
      });
      const generatedRef = response.data;
      setFormData({
        ...formData,
        customerRef: generatedRef
      });
    } catch (error) {
      console.error('Error fetching customer reference:', error);
    }
  };
  const handleSubmit = async () => {
    try {
      const dataToSend = {
        ...formData,
        meterManufactureDate: formData.meterManufactureDate ? formData.meterManufactureDate.format('YYYY-MM-DD') : null,
        installationDate: formData.installationDate ? formData.installationDate.format('YYYY-MM-DD') : null
      };
  
      await axios.post(`${process.env.REACT_APP_API_URL}/EditDocketInitiation`, dataToSend, {
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        }
      });
      message.success('Docket initiated successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
      message.error('Failed to initiate docket. Please try again.');
    }
  };
  

  return (
    <div className="flex flex-col justify-center pt-6 pb-12 px-4 text-base leading-6 bg-stone-100 rounded-3xl sm:px-6 lg:px-8">
      {/* Applications section */}
      <div className="flex items-center gap-2 px-6 font-semibold text-neutral-600 max-md:flex-wrap max-md:px-5">
        <div className="self-stretch my-auto">Applications</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
          className="self-stretch my-auto w-6 h-6"
          alt="Icon"
        />
        <div className="justify-center self-stretch px-4 py-1 whitespace-nowrap bg-white rounded-2xl">
        {application?.application.applicationNumber}
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
          className="self-stretch my-auto w-6 h-6"
          alt="Icon"
        />
        <div className="self-stretch my-auto">Docket Initiation</div>
      </div>

      {/* Main content section */}
      <div className="flex flex-col mt-6 space-y-6 bg-white rounded-3xl shadow-lg pb-10">
        {/* Section title */}
        <div className="self-start px-6 pt-6 text-3xl font-semibold capitalize text-neutral-600 sm:px-8 lg:px-10">
          Docket Initiation
        </div>

        {/* Form section */}
        <div className="grid grid-cols-1 gap-6 px-6 pb-6 sm:grid-cols-2 sm:px-8 lg:px-10">
          {/* Placeholder for your inputs */}
          <div className="flex flex-col space-y-4">
            <label htmlFor="customerType" className="font-semibold text-neutral-600">
              Customer Type
            </label>
            <Select
              id="customerType"
              placeholder="Select customer type"
              className="w-full h-14"
              allowClear
              onChange={(value) => handleSelectChange(value, 'customerType')}
            >
              <Option value="prepaid">Prepaid</Option>
              <Option value="postpaid">Postpaid</Option>
              <Option value="corporate">Corporate</Option>
            </Select>

            <label htmlFor="blockNumber" className="font-semibold text-neutral-600">
              Block Number
            </label>
            <input
              id="blockNumber"
              type="text"
              placeholder="Enter block number"
              className="p-4 rounded-xl border focus:outline-none focus:border-blue-500"
              onChange={handleInputChange}
              value={formData.blockNumber}
            />

            <div className="flex gap-2 justify-between font-semibold text-neutral-600 max-md:flex-wrap max-md:max-w-full">
              <label htmlFor="customerRef" className="font-semibold text-neutral-600">
                Customer References
              </label>
              <div
                className="justify-center px-4 rounded bg-lime-400 bg-opacity-20 cursor-pointer"
                onClick={handleGetCustomerRef}
              >
                Get Number
              </div>
            </div>
            <input
              id="customerRef"
              type="text"
              placeholder="customer reference"
              value={formData.customerRef}
              className="px-4 py-3 mt-2 rounded-xl border focus:outline-none focus:border-blue-500"
              disabled
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="meterType" className="font-semibold text-neutral-600">
              Meter Type
            </label>
            <Select
              id="meterType"
              placeholder="Select meter type"
              className="w-full h-14"
              allowClear
              onChange={(value) => handleSelectChange(value, 'meterType')}
              value={formData.meterType}
            >
              <Option value="type1">Type 1</Option>
              <Option value="type2">Type 2</Option>
              <Option value="type3">Type 3</Option>
            </Select>

            <label htmlFor="meterNumber" className="font-semibold text-neutral-600">
              Meter Number
            </label>
            <input
              id="meterNumber"
              type="text"
              placeholder="Enter meter number"
              className="p-4 rounded-xl border focus:outline-none focus:border-blue-500"
              onChange={handleInputChange}
              value={formData.meterNumber}
            />

            <label htmlFor="meterSize" className="font-semibold text-neutral-600">
              Meter Size
            </label>
            <input
              id="meterSize"
              type="text"
              placeholder="Enter meter size"
              className="p-4 rounded-xl border focus:outline-none focus:border-blue-500"
              onChange={handleInputChange}
              value={formData.meterSize}
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="location" className="font-semibold text-neutral-600">
              Location Coordinated
            </label>
            <input
              id="location"
              type="text"
              placeholder="Latitude, Longitude"
              className="p-4 mt-2 rounded-xl border focus:outline-none focus:border-blue-500"
              onChange={handleInputChange}
              value={formData.location}
            />

            <label htmlFor="initialReading" className="font-semibold text-neutral-600">
              Meter Initial Reading
            </label>
            <input
              id="initialReading"
              type="text"
              placeholder="Enter meter reading"
              className="p-4 mt-2 rounded-xl border focus:outline-none focus:border-blue-500"
              onChange={handleInputChange}
              value={formData.initialReading}
            />

            <label htmlFor="dials" className="font-semibold text-neutral-600">
              Dials
            </label>
            <input
              id="dials"
              type="text"
              placeholder="Enter Dials"
              className="p-4 mt-2 rounded-xl border focus:outline-none focus:border-blue-500"
              onChange={handleInputChange}
              value={formData.dials}
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="manufactureDate" className="font-semibold text-neutral-600">
              Meter Manufacture Date
            </label>
            <DatePicker
              id="manufactureDate"
              placeholder="Select manufacture date"
              className="w-full h-14"
              onChange={(date, dateString) => handleDateChange(date, dateString, 'meterManufactureDate')}
              value={formData.meterManufactureDate ? moment(formData.meterManufactureDate) : null}
            />

            <label htmlFor="installationDate" className="font-semibold text-neutral-600">
              Dates of Installation
            </label>
            <DatePicker
              id="installationDate"
              placeholder="Select installation date"
              className="w-full h-14"
              onChange={(date, dateString) => handleDateChange(date, dateString, 'installationDate')}
              value={formData.installationDate ? moment(formData.installationDate) : null}
            />

            <label htmlFor="installedBy" className="font-semibold text-neutral-600">
              Installed by
            </label>
            <Select
              id="installedBy"
              placeholder="Choose Field Officer"
              className="w-full h-14"
              allowClear
              onChange={(value) => handleSelectChange(value, 'installedBy')}
              value={formData.installedBy}
            >
              <Option value="1">Field Officer 1</Option>
              <Option value="2">Field Officer 2</Option>
              <Option value="3">Field Officer 3</Option>
            </Select>
          </div>
        </div>

        {/* Remarks Section */}
        <div className="flex flex-col px-6 mt-6">
          <label htmlFor="remarks" className="font-semibold text-neutral-600">
            Remarks
          </label>
          <textarea
            id="remarks"
            rows={1}
            placeholder="Enter Remarks"
            className="p-4 mt-2 rounded-xl border focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
            value={formData.remarks}
          ></textarea>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end mt-6 px-6">
          <button
            className="hidden sm:inline-block px-6 py-3 mr-4 text-sm font-semibold text-neutral-600 w-[200px] bg-stone-100 rounded-full border border-solid border-neutral-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
            onClick={() => message.info('Canceled')}
          >
            Cancel
          </button>
          <button
            className="hidden sm:inline-block px-6 py-3 text-sm font-semibold text-white bg-slate-500 w-[200px] rounded-full hover:bg-slate-600 focus:outline-none focus:bg-slate-600"
            onClick={handleSubmit}
          >
            Save Docket
          </button>
          {/* Mobile Buttons */}
          <div className="sm:hidden flex w-full justify-end">
            <button
              className="px-4 py-2 mr-2 text-sm font-semibold text-neutral-600 bg-stone-100 rounded-full border border-solid border-neutral-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
              onClick={() => message.info('Canceled')}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm font-semibold text-white bg-slate-500 rounded-full hover:bg-slate-600 focus:outline-none focus:bg-slate-600"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDocketInitiation;
