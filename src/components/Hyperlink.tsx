import { useNavigate } from "react-router-dom";

interface HyperlinkProps {
  href: string;
  text: string;
}

export const Hyperlink: React.FC<HyperlinkProps> = ({ href, text }) => {
  const navigate = useNavigate();

  return (
    <a
      href={href}
      className="text-green-400 font-extrabold decoration-violet-400 decoration-2 underline-offset-8 transition ease-in-out duration-300 hover:-translate-y-0.5 hover:underline"
      onClick={(e) => {
        e.preventDefault();
        navigate(href);
      }}
    >
      {text}
    </a>
  );
};
