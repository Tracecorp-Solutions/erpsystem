import { Select } from "antd";
const {Option} =Select;


const SelectField = ({ label, value, options, onChange }) =>{
return (
    <div className="flex flex-col gap-2 w-full">
      <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
        {label}
      </div>
      <Select
        className="h-12"
        placeholder={`Select ${label.toLowerCase()}`}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <Option key={option.id} value={option.id}>
            {option.name}
          </Option>
        ))}
      </Select>
    </div>
  );
} 

export default SelectField;
