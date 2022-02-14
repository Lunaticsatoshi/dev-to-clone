import { FC, ReactNode } from "react";

type ListingHeaderProps = {
  children: ReactNode;
};

const ListingHeader: FC<ListingHeaderProps> = ({ children }) => {
  return <div className="listing-sidebar__header">{children}</div>;
};

export default ListingHeader;
