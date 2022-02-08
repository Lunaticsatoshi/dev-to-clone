import { FC, ReactNode } from "react";

type SidebarItemsProps = {
  children: ReactNode | string | number;
  onClick?: () => void;
  className?: string;
};

const SidebarItems: FC<SidebarItemsProps> = ({
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

export default SidebarItems;
