import {Input} from "antd";

const TextAreaField = ({ label, value, onChange }) =>{
    return (
        <div className="flex flex-col gap-2 w-full">
          <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            {label}
          </div>
          <Input.TextArea
            rows={2}
            placeholder={`Enter ${label.toLowerCase()}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );
} 

export default TextAreaField;