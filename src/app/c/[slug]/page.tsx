import axios from "axios";
import { getChapter, getUser } from "@/services";
import { PostPreview } from "@/interfaces/postPreview.interface";
import { ENDPOINTS } from "@/constants";
import { PostsList } from "@/app/components";

interface Props {
  params: {
    slug: string;
  };
}

const ChapterPage = async ({ params: { slug } }: Props) => {
  const user = await getUser();

  const chapter = await getChapter(slug);

  if (!chapter) return <>404 Not found!</>;

  const getPostsQuery = `${ENDPOINTS.GET_CHAPTER_POSTS_URL}/${chapter.id}?page=1`;
  const { data: posts } = await axios.get<PostPreview[]>(getPostsQuery);

  return (
    <>
      {!posts.length ? (
        <p className="text-center my-5">
          No posts, be the first to create a new one!
        </p>
      ) : (
        <>
          {/* Post rendering by scroll on the client*/}
          <PostsList chapterId={chapter.id} initialPosts={posts} user={user} />
        </>
      )}
    </>
  );
};

export default ChapterPage;
