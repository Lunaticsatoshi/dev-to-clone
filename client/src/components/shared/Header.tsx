import { useState } from "react";
import Link from "next/link";
import { FaDev } from "react-icons/fa";
import { RiNotificationLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";

import { SearchBox, Button, ThemeToggle, DropDown, DropDownItem } from "..";

const Header = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  return (
    <header className="flex header">
      <div className="flex justify-between items-center header-container">
        <div className="flex items-center header-container-left">
          <Link href="/" passHref>
            <div className="header-container-left__logo flex justify-center items-center">
              <FaDev size="2.6rem" />
            </div>
          </Link>

          <div className="header-container-left__searchBox">
            <SearchBox className="flex search">
              <Button className="search__button flex justify-center items-center">
                <FiSearch />
              </Button>
            </SearchBox>
          </div>
        </div>

        <div className="flex items-center header-container-right">
          <Button className="btn post-btn">Write a post</Button>
          <i className="hidden-search">
            <FiSearch />
          </i>

          <i>
            <ThemeToggle />
          </i>

          <i>
            <RiNotificationLine />
          </i>

          <span onClick={toggle}>
            <img src="https://picsum.photos/200" alt="Profile Picture" />

            <DropDown open={open} className="header-dropdown">
              <DropDownItem onClick={toggle}>
                <div>
                  <div className="u-name">Lunaticsatoshi</div>
                  <small className="u-name-id">@lunaticsatoshi</small>
                </div>
              </DropDownItem>
              <div className="dropdown-break"></div>
              <DropDownItem onClick={toggle}>
                <div>
                  Dashboard
                </div>
              </DropDownItem>
              <DropDownItem onClick={toggle}>
                <div>
                  Create Post
                </div>
              </DropDownItem>
              <DropDownItem onClick={toggle}>
                <div>
                  Reading List
                </div>
              </DropDownItem>
              <div className="dropdown-break"></div>
              <DropDownItem onClick={toggle}>
                <div>
                  Sign Out
                </div>
              </DropDownItem>
            </DropDown>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
