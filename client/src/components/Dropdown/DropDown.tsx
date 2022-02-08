import { FC, ReactNode } from "react";

type DropDownProps = {
  children: ReactNode | string | number;
  open: boolean;
  onClick?: () => void;
  className?: string;
};

const DropDown: FC<DropDownProps> = ({
  children,
  open,
  onClick,
  className,
}) => {
  return (
    <div
      className={open ? `dropdown-menu ${className}` : "dropdown-menu-close"}
      onClick={onClick}
    >
      <ul>{children}</ul>
    </div>
  );
};

export default DropDown;
