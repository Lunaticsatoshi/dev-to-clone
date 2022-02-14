import { FC, ReactNode } from "react";

type ListingBarProps = {
  children: ReactNode;
};

const ListingBar: FC<ListingBarProps> = ({ children }) => {
  return <aside className="listing-sidebar">{children}</aside>;
};

export default ListingBar;
