interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className = ""}) => {
  return (
    <div className={`flex flex-col justify-between bg-zinc-900 border-violet-500 border-4 px-6 rounded-2xl ${className}`}>
      <h1 className="text-xl font-extrabold py-6 border-b-4 border-violet-500 text-green-400 text-center">
        {title}
      </h1>
      <div className="py-4">
      {children}
      </div>
    </div>
  );
};
