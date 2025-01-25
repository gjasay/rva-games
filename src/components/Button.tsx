interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ text, type = "button", className = ""}) => {
  return (
    <button type={type} className={`cursor-pointer font-bold bg-violet-400 text-zinc-800 border-zinc-900 border-4 p-2 rounded-2xl hover:bg-violet-600 hover:text-slate-100 transition ease-in-out duration-300 ${className}`}>
      {text}
    </button>
  );
};
