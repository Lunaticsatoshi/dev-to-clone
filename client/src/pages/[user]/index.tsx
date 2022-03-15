import type { NextPage } from "next";

import { UserProfile } from "src/modules";
import { Layout } from "src/components";

const UserProfilePage: NextPage = () => {
  return <Layout title="User profile">
    <div className="user-profile-container">
      <UserProfile user={{}}/>
    </div>
  </Layout>;
};

export default UserProfilePage;
