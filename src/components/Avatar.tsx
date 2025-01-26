interface AvatarProps {
  avatar_url: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ avatar_url, className = "" }) => {
  return (
    <div className="flex items-center gap-4">
      <img
        src={avatar_url}
        alt={`avatar`}
        className={`rounded-full h-12 w-12 ${className}`}
  />
      </div>
    );
};
