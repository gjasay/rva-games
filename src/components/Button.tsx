interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ text, type = "button", onClick, className = ""}) => {
  return (
    <button type={type} className={`cursor-pointer font-bold bg-violet-400 text-black border-black border-4 p-2 m-2 rounded-2xl hover:bg-violet-900 hover:text-slate-100 transition ease-in-out duration-300 ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};
