import { FC, ReactNode } from "react";

type SidebarResponsiveProps = {
  children: ReactNode | string | number;
  onClick?: () => void;
  className?: string;
};

const SidebarResponsive: FC<SidebarResponsiveProps> = ({
  children,
  className,
}) => {
  return (
    <div className="sidebar-responsive">
      <div className={className}>{children}</div>
      <div className="sidebar-responsive overlay"></div>
    </div>
  );
};

export default SidebarResponsive;
