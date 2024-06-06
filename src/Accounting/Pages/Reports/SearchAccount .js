import React, { useState } from "react";
import { DatePicker } from "antd";


const { RangePicker } = DatePicker;

const SearchAccount = () => {

    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
    };

  return (
    <div className="flex flex-col sm:flex-row items-center">
      <select
        style={{ width: 200, marginRight: "10px", borderRadius: "24px", padding: "10px", border: "1px solid gray" }}
        placeholder="Search accounts"
        onChange={handleSearch}
        value={searchValue}
      >
        <option value="">Search accounts</option>
        <option value="1">Account 1</option>
        <option value="2">Account 2</option>
        <option value="3">Account 3</option>
      </select>
      <RangePicker style={{ width: '30%', padding: "10px", borderRadius: "24px" }} />
    </div>
  );
};

export default SearchAccount;
