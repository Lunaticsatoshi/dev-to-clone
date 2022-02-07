import { FC, ReactNode } from "react";


type SidebarResponsiveProps = {
    children: ReactNode | string | number;
    onClick?: () => void;
    className?: string;
  };


const SidebarResponsive: FC<SidebarResponsiveProps> = ({}) => {
  return <div></div>;
};

export default SidebarResponsive;
