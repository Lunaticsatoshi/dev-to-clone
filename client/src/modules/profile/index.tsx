import { FC } from "react";
import { FaBirthdayCake, FaGithub } from "react-icons/fa";

import { Button } from "src/components";

type ProfileProps = {
  user: any;
};

const UserProfile: FC<ProfileProps> = ({}) => {
  return (
    <div className="user-profile-card flex justify-start flex-col">
      <div className="user-avatar-container flex justify-center items-center">
        <a
          href="/"
          className="user-avatar-container__image"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1646428826686-c800028a0619?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60)",
          }}
        >
          &nbsp;
        </a>
      </div>
      <div className="user-profile-actions flex justify-end items-center">
        <Button className="btn edit-profile-btn">Edit Profile</Button>
      </div>
      <div className="user-profile-body flex justify-center flex-col">
        <div className="user-profile-body__name">
          <h1>Lunaticsatoshi</h1>
        </div>
        <div className="user-profile-body__bio">
          <p>
            Software Engineer | Full Stack developer | React and Python Lover |
            ML/AI Enthusiast |
          </p>
        </div>
        <div className="user-profile-body__data flex justify-center">
          <div className="flex justify-center items-center date-joined">
            <FaBirthdayCake size={"1.3rem"} />
            <div>Joined on Jan 31, 2022</div>
          </div>
          <div className="data-github">
            <FaGithub size={"1.3rem"} />
          </div>
        </div>
      </div>

      <div className="user-profile-border"></div>

      <div className="user-profile-info flex justify-between">
        <div className="info flex justify-center flex-col">
          <h5>Education</h5>
          <div>University of Mumbai</div>
        </div>
        <div className="info flex justify-center flex-col">
          <h5>Work</h5>
          <div>Yodaplus</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
