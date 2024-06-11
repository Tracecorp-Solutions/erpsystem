import React, { useState } from "react";
import { DatePicker, Button } from "antd";

const { RangePicker } = DatePicker;

const SearchAccount = ({ handleFilter, options }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleOptionSelection = (value) => {
    setSelectedOption(value);
  };

  const handleDateRangeChange = (dates) => {
    setStartDate(dates[0]);
    setEndDate(dates[1]);
  };

  const handleFilterButtonClick = () => {
    if (selectedOption && startDate && endDate) {
      // Pass selectedOption (accountId), startDate, and endDate to handleFilter
      handleFilter(selectedOption, startDate, endDate);
    } else {
      console.log("Please select an option and date range.");
    }
  };
  

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      <select
        className="w-full lg:w-auto max-w-md rounded-lg p-2 border-gray-500 border"
        placeholder="Select an option"
        onChange={(e) => handleOptionSelection(e.target.value)}
        value={selectedOption}
      >
        <option value="">Select an option</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))}
      </select>
      <RangePicker
        className="w-full lg:w-auto rounded-lg p-2 border-gray-500 border"
        onChange={handleDateRangeChange}
      />
      <div className="flex justify-end w-full lg:w-auto" style={{ width: "100%" }}>
        <Button
          type="primary"
          className="text-white p-2 flex items-center justify-center"
          style={{
            background: "#4467a1",
            borderRadius: "24px",
            width: "150px"
          }}
          onClick={handleFilterButtonClick}
        >
          Filter
        </Button>
      </div>
    </div>
  );
};

export default SearchAccount;
