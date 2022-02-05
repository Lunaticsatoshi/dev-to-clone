import { FC, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode | string | number;
  className?: string;
};

const SearchBox: FC<ButtonProps> = ({ children, className }) => {
  return (
    <form className={className}>
      <input type="text" placeholder="Search..." aria-label="search" />
      {children}
    </form>
  );
};

export default SearchBox;
