import { Input } from "antd";

const InputField = ({ label, value, onChange }) => (
    <>
        <div className="mt-4 text-base font-semibold text-start leading-6 text-neutral-600 w-full">{label}</div>
        <Input
            placeholder={`Enter ${label.toLowerCase()}`}
            className="p-3"
            style={{ width: "100%", marginTop: "8px" }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </>
);

export default InputField;
