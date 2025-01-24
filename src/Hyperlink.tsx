interface HyperlinkProps {
  href: string;
  text: string;
}

export const Hyperlink: React.FC<HyperlinkProps> = ({ href, text }) => {
  return (
    <a href={href} className="font-extrabold transition">
      {text}
    </a>
  );
};
