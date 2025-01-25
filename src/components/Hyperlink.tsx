interface HyperlinkProps {
  href: string;
  text: string;
}

export const Hyperlink: React.FC<HyperlinkProps> = ({ href, text }) => {
  return (
    <a href={href} className="font-extrabold transition ease-in-out duration-300 hover:-translate-y-0.5">
      {text}
    </a>
  );
};
