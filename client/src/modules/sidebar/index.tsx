import { FC } from "react";
import { useSidebarToggle } from "src/hooks";

import LeftSidebar from "./LeftSidebar";
import LeftSidebarResponsive from "./LeftSidebarResponsive";

type LeftSidebarProps = {
  className?: string;
};

const Index: FC<LeftSidebarProps> = () => {
  const [sidebarOpen, sidebarToggle] = useSidebarToggle();
  return (
    <>
      <LeftSidebar />
      {sidebarOpen && (
        <LeftSidebarResponsive closeSidebar={() => sidebarToggle()} />
      )}
    </>
  );
};

export default Index;
