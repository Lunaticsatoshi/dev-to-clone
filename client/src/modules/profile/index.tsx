import { FC } from "react";

type ProfileProps = {
  user: any;
};

const UserProfile: FC<ProfileProps> = ({}) => {
  return (
    <div className="user-profile-card flex justify-center items-center">
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
    </div>
  );
};

export default UserProfile;
