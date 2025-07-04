import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const CustomInput = ({
  label,
  type,
  id,
  name,
  required = false,
  className,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div>
      <label htmlFor={name} className="block font-bold text-sm text-gray-700">
        {label}
      </label>
      <div
        className={`flex items-center justify-between w-full px-2 py-2 rounded-lg bg-gray-100  focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      >
        <input
          type={inputType}
          id={id}
          name={name}
          required={required}
          className={` outline-0 ${
            isPassword ? "w-[90%]" : "w-full"
          } ${className}`}
          {...rest}
        />
        {isPassword && (
          <button type="button" className="" onClick={handleShowPassword}>
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomInput;