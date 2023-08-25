import { getUser } from "@/services";
import { FeedCards, ChaptersList, PostsList } from "./components";
import axios from "axios";
import { ENDPOINTS } from "@/constants";
import { Chapter, PostPreview } from "@/interfaces";

const HomePage = async () => {
  const user = await getUser();

  const { data: featuredPosts } = await axios.get<PostPreview[]>(
    `${ENDPOINTS.POSTS_URL}/get/all?page=1`
  );

  const { data: communities } = await axios.get<Chapter[]>(
    `${ENDPOINTS.CHAPTERS_URL}/get/all`
  );

  return (
    <section>
      <h1 className="font-bold text-3xl md:text-4xl mb-5">Your feed</h1>
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <FeedCards user={user} />
      </div>
      <h2 className="font-bold text-2xl md:text-3xl my-5">
        Featured Communities
      </h2>
      <ChaptersList communities={communities} />
      <h2 className="font-bold text-2xl md:text-3xl my-5">Featured Posts</h2>
      <PostsList user={user} initialPosts={featuredPosts} />
    </section>
  );
};

export default HomePage;
