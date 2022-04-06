import { FC, ReactNode } from "react";

type DropDownItemProps = {
  children: ReactNode | string | number;
  onClick?: () => void;
  className?: string;
};

const DropDownItem: FC<DropDownItemProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <li className={className} onClick={onClick}>
      {children}
    </li>
  );
};

export default DropDownItem;
