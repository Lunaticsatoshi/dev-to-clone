import { FC } from "react";
import Link from "next/link";
import {
  FcHome,
  FcReading,
  FcTodoList,
  FcVideoCall,
  FcAbout,
  FcIdea,
  FcShop,
  FcLike,
  FcBriefcase,
  FcDisclaimer,
  FcBusinessContact,
} from "react-icons/fc";
import { AiFillAudio } from "react-icons/ai";
import { FaDev } from "react-icons/fa";
import { IoLogoTwitter, IoLogoFacebook, IoLogoGithub } from "react-icons/io";
import { RiInstagramFill, RiTwitchLine } from "react-icons/ri";
import { CgShapeHexagon } from "react-icons/cg";

import { Sidebar, SidebarItem } from "src/components";

type LeftSidebarProps = {
  className?: string;
};

const tags = [
  "react",
  "graphql",
  "nodejs",
  "sass",
  "javascript",
  "html",
  "css",
  "webdev",
  "opensource",
  "beginners",
  "python",
  "git",
  "vscode",
  "npm",
  "sql",
  "ubuntu",
  "aws",
];

const LeftSidebar: FC<LeftSidebarProps> = () => {
  return (
    <div>
      <Sidebar className="sidebar-left">
        <SidebarItem className="sidebar-left__items">
          <Link href="/home" passHref>
            <a>
              <i>
                <FcHome />
              </i>
              Home
            </a>
          </Link>
        </SidebarItem>
        <SidebarItem className="sidebar-left__items">
          <Link href="/communities" passHref>
            <a>
              <i>
                <FcReading />
              </i>
              Reading List
            </a>
          </Link>
        </SidebarItem>
        <SidebarItem className="sidebar-left__items">
          <Link href="/list" passHref>
            <a>
              <i>
                <FcTodoList />
              </i>
              list
            </a>
          </Link>
        </SidebarItem>
        <SidebarItem className="sidebar-left__items">
          <Link href="/podcast" passHref>
            <a>
              <i>
                <AiFillAudio />
              </i>
              Podcasts
            </a>
          </Link>
        </SidebarItem>
        <SidebarItem className="sidebar-left__items">
          <Link href="/podcast" passHref>
            <a>
              <i>
                <FcVideoCall />
              </i>
              Videos
            </a>
          </Link>
        </SidebarItem>
        <SidebarItem className="sidebar-left__items">
          <Link href="/FAQ" passHref>
            <a>
              <i>
                <FcIdea />
              </i>
              FAQ
            </a>
          </Link>
        </SidebarItem>
        <SidebarItem className="sidebar-left__items">
          <Link href="/DEV" passHref>
            <a>
              <i>
                <FcShop />
              </i>
              DEV Shop
            </a>
          </Link>
        </SidebarItem>
        <SidebarItem className="sidebar-left__items">
          <Link href="/sponsers" passHref>
            <a>
              <i>
                <FcLike />
              </i>
              Sponsers
            </a>
          </Link>
        </SidebarItem>
        <SidebarItem className="sidebar-left__items">
          <Link href="/about" passHref>
            <a>
              <i>
                <FaDev />
              </i>
              About
            </a>
          </Link>
        </SidebarItem>
        <div className="heading">
          <h3>Others</h3>
        </div>
        <SidebarItem className="sidebar-left__items">
          <Link href="/code" passHref>
            <a>
              <i>
                <FcAbout />
              </i>
              Code of Conduct
            </a>
          </Link>
        </SidebarItem>
        <SidebarItem className="sidebar-left__items">
          <Link href="/privacy" passHref>
            <a>
              <i>
                <FcBriefcase />
              </i>
              Privacy Policy
            </a>
          </Link>
        </SidebarItem>

        <SidebarItem className="sidebar-left__items">
          <Link href="/terms" passHref>
            <a>
              <i>
                <FcDisclaimer />
              </i>
              Terms of use
            </a>
          </Link>
        </SidebarItem>
        <SidebarItem className="sidebar-left__items">
          <Link href="/contact" passHref>
            <a>
              <i>
                <FcBusinessContact />
              </i>
              Contact
            </a>
          </Link>
        </SidebarItem>
        <div className="sidebar-left__socials flex justify-start">
          <Link href="/twitter" passHref>
            <a>
              <IoLogoTwitter />
            </a>
          </Link>
          <Link href="/facebook" passHref>
            <a>
              <IoLogoFacebook />
            </a>
          </Link>
          <Link href="/github" passHref>
            <a>
              <IoLogoGithub />
            </a>
          </Link>
          <Link href="/instagram" passHref>
            <a>
              <RiInstagramFill />
            </a>
          </Link>
          <Link href="/twitch" passHref>
            <a>
              <RiTwitchLine />
            </a>
          </Link>
        </div>
        <div className="heading">
          <h3>My Tags</h3>
          <i>
            <CgShapeHexagon />
          </i>
        </div>
        <ul className="sidebar-left__taglist">
          {tags.map((tag, id) => {
            return (
              <SidebarItem key={id} className="tag-item">
                <Link href="/#" passHref>
                  <a># {tag}</a>
                </Link>
              </SidebarItem>
            );
          })}
        </ul>
      </Sidebar>
    </div>
  );
};

export default LeftSidebar;
