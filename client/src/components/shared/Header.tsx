import Link from "next/link";
import { FaDev } from "react-icons/fa";
import { RiNotificationLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";

import SearchBox from "../ui/SearchBox";
import Button from "../ui/Button";
import ThemeToggle from "../ui/ThemeToggle";

const Header = () => {
  return (
    <header className="flex header">
      <div className="flex justify-between items-center header-container">
        <div className="flex items-center header-container-left">
          <Link href="/" passHref>
            <div className="header-container-left__logo">
              <FaDev size="3.125rem" />
            </div>
          </Link>

          <div className="header-container-left__searchBox">
            <SearchBox className="flex search">
              <Button>
                <FiSearch />
              </Button>
            </SearchBox>
          </div>
        </div>

        <div className="flex items-center header-container-right">
          <Button className="btn">Write a post</Button>
          <i className="hidden-search">
            <FiSearch />
          </i>

          <i>
            <ThemeToggle />
          </i>

          <i>
            <RiNotificationLine />
          </i>

          <span>
            <img src="https://picsum.photos/200" alt="Profile Picture" />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
