import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { FaDev } from "react-icons/fa";
import { RiNotificationLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";

import { SearchBox, Button, ThemeToggle, DropDown, DropDownItem } from "..";

import { useSidebarToggle, useAuthState } from "src/hooks";
import { getCurrentUser } from "src/lib/api";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [_, sidebarToggle] = useSidebarToggle();
  const { state, logout } = useAuthState();
  const toggle = () => setOpen(!open);
  const { data } = useQuery(["currentUser"], getCurrentUser, {});

  console.log(data);
  const router = useRouter();
  return (
    <header className="flex header">
      <div className="flex justify-between items-center header-container">
        <div className="flex items-center header-container-left">
          <div
            className="header-container-left__hamburger"
            onClick={() => sidebarToggle()}
          >
            <div className="hamburger-menu"></div>
          </div>
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
          {data?.data?.username ? (
            <>
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
                <img
                  src={data?.data?.profile?.profile_pic}
                  alt="Profile Picture"
                />

                <DropDown open={open} className="header-dropdown">
                  <DropDownItem onClick={toggle}>
                    <div>
                      <div className="u-name">Lunaticsatoshi</div>
                      <small className="u-name-id">@lunaticsatoshi</small>
                    </div>
                  </DropDownItem>
                  <div className="dropdown-break"></div>
                  <DropDownItem onClick={toggle}>
                    <div>Dashboard</div>
                  </DropDownItem>
                  <DropDownItem onClick={toggle}>
                    <div>Create Post</div>
                  </DropDownItem>
                  <DropDownItem onClick={toggle}>
                    <div>Reading List</div>
                  </DropDownItem>
                  <div className="dropdown-break"></div>
                  <DropDownItem onClick={toggle}>
                    <div onClick={() => logout()}>Sign Out</div>
                  </DropDownItem>
                </DropDown>
              </span>
            </>
          ) : (
            <>
              <i className="hidden-search">
                <FiSearch />
              </i>
              <div className="login-btn" onClick={() => router.push("/login")}>
                Login
              </div>
              <Button
                className="btn post-btn"
                onClick={() => router.push("/register")}
              >
                Create Account
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
