import { FC } from "react";
import { classNames } from "src/utils";

import { Button } from "..";

type ProfileCardProps = {
  title?: string;
  className?: string;
};

const ProfileCard: FC<ProfileCardProps> = ({ className }) => {
  return (
    <div className={classNames("profile-card", className)}>
      <div className="profile-card__cover"></div>
      <div className="profile-info flex justify-center items-center flex-col">
        <div className="profile-info-top flex justify-start items-end">
          <div className="profile-info-top__avatar">
            <img
              src="https://images.unsplash.com/photo-1646428826686-c800028a0619?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              alt="profile"
            />
          </div>
          <div className="profile-info-top__name">
            <h1>Jason Taylor</h1>
          </div>
        </div>

        <Button className="btn follow-btn">Follow</Button>

        <div className="profile-info-bio">
          <p>
            Lead software engineer at Forem. Caught the live coding bug on
            Twitch at livecoding.ca
          </p>
        </div>

        <div className="profile-info-stats flex justify-center items-start flex-col">
          <div className="stats flex justify-center items-start flex-col">
            <div className="title">Location</div>
            <div className="content">Montréal, Québec, Canada</div>
            <div className="stats flex justify-center items-start flex-col">
              <div className="title">Education</div>
              <div className="content">University of New Brunswick</div>
            </div>
            <div className="stats flex justify-center items-start flex-col">
              <div className="title">Work</div>
              <div className="content">Lead Software Engineer at Forem</div>
            </div>
            <div className="stats flex justify-center items-start flex-col">
              <div className="title">Joined</div>
              <div className="content">Mar 12, 2017</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
