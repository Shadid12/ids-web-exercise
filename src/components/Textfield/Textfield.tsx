import React, { useState, ChangeEvent } from 'react';
import './Textfield.css';

export type TextFieldProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  warning?: string;
  required?: boolean;
  width?: 'normal' | 'wide';
}

const TextField: React.FC<TextFieldProps> = ({ 
  label = "Label", 
  placeholder = "", 
  value = "", 
  onChange = () => {}, 
  type = "text",
  error = "",
  warning = "",
  required = false,
  width = "normal",
}) => {
  const [_isFocused, setIsFocused] = useState<boolean>(false);
  
  const getStateClass = (): string => {
    if (error) return "error";
    if (warning) return "warning";
    return "";
  };

  return (
    <div className={`text-field-container ${getStateClass()}`} style={{ maxWidth: width == "normal" ? `300px` : '500px' }}>
      <label className="text-field-label">
        {label} {required && <span className="required-mark">*</span>}
      </label>
      
      <input
        type={type}
        className="text-field-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      
      {error && <div className="message error-message">{error}</div>}
      {!error && warning && <div className="message warning-message">{warning}</div>}
    </div>
  );
};

export default TextField;