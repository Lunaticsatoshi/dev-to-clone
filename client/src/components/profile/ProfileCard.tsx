import { FC } from "react";

type ProfileCardProps = {
  title?: string;
  className?: string;
};

const ProfileCard: FC<ProfileCardProps> = ({}) => {
  return <div className="profile-card">ProfileCard</div>;
};

export default ProfileCard;
