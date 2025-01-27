interface HamburgerMenuProps {
  isOpen: boolean;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen }) => {
  return (
    <div
      className={`${isOpen ? "-translate-x-50" : "translate-x-full"} bg-violet-500 fixed top-0 h-screen w-1/2 z-10 transition-transform duration-300 ease-in-out `}
    >
      Hidden
    </div>
  );
};
