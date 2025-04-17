import { Input } from "@heroui/react";

const MyInput = ({ label, type = "text", placeholder, icon }) => {
  return (
    <Input
      type={type}
      startContent={icon}
      label={label}
      placeholder={placeholder}
      labelPlacement="outside"
      key="outside"
      classNames={{
        label: "font-medium",
        inputWrapper: "border-[1.5px] border-[#CECECE]",
      }}
    />
  );
};

export default MyInput;
