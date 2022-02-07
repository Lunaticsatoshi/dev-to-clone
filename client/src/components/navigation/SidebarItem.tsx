import { FC, ReactNode } from "react";

type SidebarItemsProps = {
  children: ReactNode | string | number;
  onClick?: () => void;
  className?: string;
  key?: string | number;
};

const SidebarItems: FC<SidebarItemsProps> = ({
  children,
  onClick,
  className,
  key,
}) => {
  return (
    <li className={className} key={key} onClick={onClick}>
      {children}
    </li>
  );
};

export default SidebarItems;
