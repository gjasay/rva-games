interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ text, type = "button", className = ""}) => {
  return (
    <button type={type} className={`cursor-pointer bg-violet-400 text-zinc-800 border-violet-400 border-2 p-2 rounded-2xl hover:bg-violet-300 hover:border-violet-300 transition ease-in-out duration-300 ${className}`}>
      {text}
    </button>
  );
};
