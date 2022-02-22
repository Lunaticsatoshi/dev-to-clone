import { useState } from "react";
import Link from "next/link";
import { FaDev } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

import { SearchBox, Button } from "..";

const EditorHeader = () => {
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
          <div className="login-btn">Login</div>
          <Button className="btn post-btn">Create Account</Button>
        </div>
      </div>
    </header>
  );
};

export default EditorHeader;
