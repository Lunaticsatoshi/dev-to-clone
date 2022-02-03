import Link from "next/link";
import { FaDev } from "react-icons/fa";
import { BiMessageRoundedCheck } from "react-icons/bi";
import { RiNotificationLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-container-left">
          <Link href="/" passHref>
            <div className="header-container-left__logo">
              <FaDev size="3.125rem" />
            </div>
          </Link>

          <div className="header-container-left__searchBox">
            <form>
              <input type="text" placeholder="Search..." aria-label="search" />
            </form>
          </div>
        </div>

        <div className="header-container-right">
          <button className="post-button">Write a post</button>
          <i className="hidden-search">
            <FiSearch />
          </i>
          <i>
            <BiMessageRoundedCheck />
          </i>
          <i>
            <RiNotificationLine />
          </i>
        </div>
      </div>
    </header>
  );
};

export default Header;
