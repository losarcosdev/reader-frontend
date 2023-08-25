import { Session, PostPreview } from "@/interfaces";
import { checkIfPostIsVoted } from "@/lib";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare } from "lucide-react";
import { PostVotes } from "./PostVotes";

interface Props {
  post: PostPreview;
  userClient: Session | null;
}

export const PostCard = ({ post, userClient }: Props) => {
  const creationDate = new Date(post.previewContent.time);
  const timeAgoDescription = formatDistanceToNow(creationDate, {
    addSuffix: true,
  });

  const isVoted = checkIfPostIsVoted(post.votes, userClient);

  return (
    <div className="rounded-md bg-white shadow mb-5">
      <div className="px-6 py-4 flex justify-between">
        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500 flex items-center gap-1">
            {post.chapter ? (
              <a
                href={`/c/${post.chapter.slug}`}
                className="underline text-zinc-900 text-sm underline-offset-2"
              >
                c/{post.chapter.name}
              </a>
            ) : null}
            <p>
              Posted by
              <a
                href={`/user/${post.author.username}`}
                className="underline text-zinc-900 underline-offset-2 pl-1"
              >
                u/{post.author.username}
              </a>
            </p>
            <span className="hidden md:block">{timeAgoDescription}</span>
          </div>
          {post.chapter ? (
            <a href={`/c/${post.chapter.slug}/post/${post.id}`}>
              <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
                {post.title}
              </h1>
            </a>
          ) : (
            <a href={`/posts/${post.id}`}>
              <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
                {post.title}
              </h1>
            </a>
          )}
          <div className="relative text-sm max-h-40 w-full overflow-clip">
            {post.previewContent.type === "image" ? (
              <img
                src={post.previewContent.content}
                alt={`Image of: ${post.title}`}
              />
            ) : (
              <p>{post.previewContent.content}</p>
            )}
            <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent" />
          </div>
        </div>
      </div>
      <div className="bg-gray-50 z-20 text-sm p-4 sm:px-6">
        {post.chapter ? (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <a
                href={`/c/${post.chapter.slug}/post/${post.id}`}
                className="w-fit flex items-center gap-1"
              >
                <MessageSquare className="h-4 w-4" />
                {post.commentsAmount}
              </a>
              <PostVotes
                initialVotesAmt={post.votesAmount}
                isVoted={isVoted}
                postId={post.id}
                user={userClient}
              />
            </div>
            <span className="block md:hidden">{timeAgoDescription}</span>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <a
                href={`/posts/${post.id}`}
                className="w-fit flex items-center gap-1"
              >
                <MessageSquare className="h-4 w-4" />
                {post.commentsAmount}
              </a>
              <PostVotes
                initialVotesAmt={post.votesAmount}
                isVoted={isVoted}
                postId={post.id}
                user={userClient}
              />
            </div>
            <span className="block md:hidden">{timeAgoDescription}</span>
          </div>
        )}
      </div>
    </div>
  );
};
