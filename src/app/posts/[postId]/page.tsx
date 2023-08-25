import { ENDPOINTS } from "@/constants";
import { checkIfPostIsVoted, redis } from "@/lib";
import { getUser } from "@/services";
import axios from "axios";
import { Post } from "@/interfaces";
import { formatDistanceToNow } from "date-fns";
import { DeletePostBtn, PostVotes } from "@/app/components";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { EditorOutput } from "@/components/common/TextEditor";
import { Comments } from "@/components/common/Comments";
import { Button, UserHeader } from "@/components/common";

interface Props {
  params: {
    postId: string;
  };
}

interface CachedPost {
  title: string;
  authorUsername: string;
  content: any;
  createdAt: string;
  id: string;
}

const PostPage = async ({ params: { postId } }: Props) => {
  const user = await getUser();

  const cachedPost = (await redis.hgetall(
    `post:${postId}`
  )) as unknown as CachedPost;

  const { data: post } = await axios.get<Post>(
    `${ENDPOINTS.POSTS_URL}/${cachedPost ? cachedPost.id : postId}`
  );

  const isVoted = checkIfPostIsVoted(post.votes, user);
  const creationDate = new Date(
    cachedPost ? cachedPost.content.time : post.content.time
  );

  const timeAgoDescription = formatDistanceToNow(creationDate, {
    addSuffix: true,
  });

  return (
    <section className="flex flex-col gap-5">
      <UserHeader
        fullName={post.author.fullName}
        username={post.author.username}
        profileImage={post.author.profileImage}
      />
      {/* Post content/comments/votes */}
      <div className="flex flex-col gap-10 w-full">
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
        <Suspense
          fallback={<Loader2 className="h-5 w-5 animate-spin text-zinc-500" />}
        >
          <Comments postId={cachedPost ? cachedPost.id : post.id} />
        </Suspense>
      </div>
    </section>
  );
};

export default PostPage;
