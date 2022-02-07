import { FC } from "react";

import LeftSidebar from "./LeftSidebar";
import LeftSidebarResponsive from "./LeftSidebarResponsive";

type LeftSidebarProps = {
    className?: string;
    sidebarOpen: boolean;
    closeSidebar: () => void;
  };

const index: FC<LeftSidebarProps> = ({ sidebarOpen, closeSidebar }) => {
  return <div>
      {
          sidebarOpen ? <LeftSidebarResponsive closeSidebar={closeSidebar} /> : <LeftSidebar />
      }
  </div>;
};

export default index;
