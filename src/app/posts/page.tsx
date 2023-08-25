import { ENDPOINTS } from "@/constants";
import { PostPreview } from "@/interfaces";
import axios from "axios";
import { PostsList } from "../components";
import { getUser } from "@/services";
import { CreatePostBar } from "@/components/common/CreatePostBar";

const PostsPage = async () => {
  const { data: posts } = await axios.get<PostPreview[]>(
    `${ENDPOINTS.POSTS_URL}/get/all`
  );
  const user = await getUser();

  const userAvatar = {
    name: user?.name,
    email: user?.email,
    image: user?.image,
  };

  return (
    <section className="flex flex-col gap-4">
      {user && <CreatePostBar userAvatar={userAvatar} />}
      <PostsList initialPosts={posts} user={user} />
    </section>
  );
};

export default PostsPage;
