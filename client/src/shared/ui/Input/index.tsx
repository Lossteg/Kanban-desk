import { FC, ChangeEvent, InputHTMLAttributes, useState } from "react";
import clsx from "clsx";
import "./index.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
  label,
  error,
  value,
  placeholder,
  onChange,
  ...props
}) => {
  const [inputData, setinputData] = useState<string>("");

  const onChangeinputData = (e: ChangeEvent<HTMLInputElement>) => {
    setinputData(e.target.value);
  };

  return (
    <div className="input-container">
      {label && <label className="input__label">{label}</label>}
      <input
        className={clsx("input", { "input-error": error })}
        value={value ?? inputData}
        placeholder={placeholder}
        onChange={onChange ?? onChangeinputData}
        {...props}
      />
      {error && <span className="input-error-msg">{error}</span>}
    </div>
  );
};

export default Input;
