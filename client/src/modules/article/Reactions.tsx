import { FC } from "react";
import Image from "next/image";

import { Sidebar, SidebarItem } from "src/components";

type ReactionProps = {
  heartCount: number;
  unicornCount: number;
  saveCount: number;
};

const reactions: FC<ReactionProps> = ({}) => {
  return (
    <div className="reactions">
      <Sidebar className="reactions-left">
        <SidebarItem className="reaction">
          <div className="reaction__group flex justify-center items-center flex-col">
            <Image
              src="/heart.svg"
              alt="heart image"
              width={30}
              height={30}
              className="heart-svg"
            />
            <span>12</span>
          </div>
        </SidebarItem>
        <SidebarItem className="reaction">
          <div className="reaction__group flex justify-center items-center flex-col">
            <Image
              src="/unicorn.svg"
              alt="heart image"
              width={30}
              height={30}
              className="unicorn-svg"
            />
            <span>12</span>
          </div>
        </SidebarItem>
        <SidebarItem className="reaction">
          <div className="reaction__group flex justify-center items-center flex-col">
            <Image
              src="/save.svg"
              alt="heart image"
              width={30}
              height={30}
              className="save-svg"
            />
            <span>12</span>
          </div>
        </SidebarItem>
      </Sidebar>
    </div>
  );
};

export default reactions;
