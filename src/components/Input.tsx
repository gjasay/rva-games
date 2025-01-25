interface InputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  type,
  placeholder,
  value,
  required = false,
  onChange,
  className = "",
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={label} className="p-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border-violet-300 border-2 p-2 rounded-2xl focus:outline-none focus:border-violet-400 ${className}`}
        required={required}
      />
    </div>
  );
};
