import { CreatePostBar } from "@/components/common/CreatePostBar";
import { ENDPOINTS } from "@/constants";
import { Chapter, PostPreview, UserProfile } from "@/interfaces";
import { getUser } from "@/services";
import axios from "axios";
import { TabbedFilterWithPosts } from "./components";
import { UserHeader } from "@/components/common";

interface Props {
  params: {
    username: string;
  };
}

const UserPage = async ({ params: { username } }: Props) => {
  const loggedUser = await getUser();
  const { data: user } = await axios.get<UserProfile>(
    `${ENDPOINTS.USERS_URL}/${username}`
  );

  const userAvatar = {
    name: user?.fullName,
    email: user?.email,
    image: user?.profileImage,
  };

  const { data: userPosts } = await axios.get<PostPreview[]>(
    `${ENDPOINTS.POSTS_URL}/user-posts/${username}`
  );

  const { data: userCommunities } = await axios.get<Chapter[]>(
    `${ENDPOINTS.CHAPTERS_URL}/get/all/by-creator/${username}`
  );

  return (
    <section className="flex flex-col gap-5">
      <UserHeader
        fullName={user.fullName}
        profileImage={user.profileImage}
        username={user.username}
      />
      {loggedUser?.id === user.id && (
        <CreatePostBar userAvatar={userAvatar} url="/posts/create" />
      )}
      <TabbedFilterWithPosts
        userPosts={userPosts}
        userCommunities={userCommunities}
        username={user.username}
      />
    </section>
  );
};

export default UserPage;
