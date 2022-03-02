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
    <Sidebar>
      <SidebarItem>
        <div className="reaction">
          <Image
            src="/heart.svg"
            alt="heart image"
            width={40}
            height={40}
            className="heart-svg"
          />
        </div>
      </SidebarItem>
      <SidebarItem>
        <div className="reaction">
          <Image
            src="/unicorn.svg"
            alt="heart image"
            width={40}
            height={40}
            className="heart-svg"
          />
        </div>
      </SidebarItem>
      <SidebarItem>
        <div className="reaction">
          <Image
            src="/save.svg"
            alt="heart image"
            width={40}
            height={40}
            className="heart-svg"
          />
        </div>
      </SidebarItem>
    </Sidebar>
  );
};

export default reactions;
