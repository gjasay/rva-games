interface AvatarProps {
  avatarUrl: string | (() => string) | File;
  className?: string;
}

const imageUrlMaker = (img: string | (() => string) | File): string => {
  if (typeof img === "function") return `${img()}?ts=${Date.now()}`;
  if (typeof img === "object") return URL.createObjectURL(img);
  return `${img}?ts=${Date.now()}`;
}

export const Avatar: React.FC<AvatarProps> = ({ avatarUrl, className = "" }) => {
  return (
    <div className="flex items-center gap-4">
      <img
        src={`${imageUrlMaker(avatarUrl)}`}
        alt={`avatar`}
        className={`rounded-full h-12 w-12 ${className}`}
  />
      </div>
    );
};
