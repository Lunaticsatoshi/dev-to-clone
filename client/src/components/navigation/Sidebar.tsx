import { FC, ReactNode } from "react";

type SidebarProps = {
  children: ReactNode | string | number;
  onClick?: () => void;
  className?: string;
};

const Sidebar: FC<SidebarProps> = ({ className, children }) => {
  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        <ul className={className}>
          {children}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
