import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { checkIfPostIsVoted, redis } from "@/lib";
import axios from "axios";
import { ENDPOINTS } from "@/constants";
import { Post } from "@/interfaces";
import { getUser } from "@/services";
import { Comments } from "@/components/common/Comments/Comments";
import { EditorOutput } from "@/components/common/TextEditor/EditorOutput";
import { DeletePostBtn, PostVotes } from "@/app/components";

interface Props {
  params: {
    id: string;
  };
}

interface CachedPost {
  title: string;
  authorUsername: string;
  content: any;
  createdAt: string;
  id: string;
}

const ChapterPostPage = async ({ params: { id } }: Props) => {
  const user = await getUser();

  const cachedPost = (await redis.hgetall(
    `post:${id}`
  )) as unknown as CachedPost;

  const { data: post } = await axios.get<Post>(
    `${ENDPOINTS.POSTS_URL}/${cachedPost ? cachedPost.id : id}`
  );

  const isVoted = checkIfPostIsVoted(post.votes, user);
  const creationDate = new Date(
    cachedPost ? cachedPost.content.time : post.content.time
  );

  const timeAgoDescription = formatDistanceToNow(creationDate, {
    addSuffix: true,
  });

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-5">
        {/* Post content */}
        <div className="bg-white w-full p-3 rounded-sm">
          <div className="flex justify-between">
            <p className="max-h-40 mt-1 truncate text-xs text-gray-500">
              Posted by u/
              {cachedPost ? cachedPost.authorUsername : post.author.username}
              <span className="pl-1">{timeAgoDescription}</span>
            </p>
            <div className="flex gap-2">
              <PostVotes
                initialVotesAmt={post.votesAmount}
                postId={post.id}
                isVoted={isVoted}
                user={user}
              />
              {post.author.id === user?.id && (
                <DeletePostBtn
                  postId={post.id}
                  accessToken={user?.accessToken}
                />
              )}
            </div>
          </div>
          <h1 className="text-xl md:text-3xl font-semibold leading-6 text-gray-900 my-3">
            {cachedPost ? cachedPost.title : post.title}
          </h1>
          <EditorOutput
            content={cachedPost ? cachedPost.content : post.content}
          />
        </div>
      </div>
      <Suspense
        fallback={<Loader2 className="h-5 w-5 animate-spin text-zinc-500" />}
      >
        <Comments postId={cachedPost ? cachedPost.id : post.id} />
      </Suspense>
    </div>
  );
};

export default ChapterPostPage;
