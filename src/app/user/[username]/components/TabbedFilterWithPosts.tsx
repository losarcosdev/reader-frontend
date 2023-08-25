"use client";
import { ChaptersList, PostsList } from "@/app/components";
import { Button } from "@/components/common";
import { ENDPOINTS } from "@/constants";
import { useClientUser } from "@/hooks";
import { Chapter, PostPreview } from "@/interfaces";
import { useState } from "react";

interface Props {
  userPosts: PostPreview[];
  userCommunities: Chapter[];
  username: string;
}

export const TabbedFilterWithPosts = ({
  userPosts,
  userCommunities,
  username,
}: Props) => {
  const [showPosts, setShowPosts] = useState(true);
  const { userSession } = useClientUser();

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button
            className="rounded-sm text-base mt-3 w-36"
            variant={showPosts ? "default" : "ghost"}
            onClick={() => setShowPosts(true)}
          >
            Posts
          </Button>
          <Button
            className="rounded-sm text-base mt-3 w-36"
            variant={!showPosts ? "default" : "ghost"}
            onClick={() => setShowPosts(false)}
          >
            Communities
          </Button>
        </div>
      </div>
      {showPosts ? (
        <>
          {!userPosts.length ? (
            <p className="text-center text-xl text-zinc-700 my-5">
              {username !== userSession?.username
                ? `${username} have not created any post yet`
                : `You have not created any post yet`}
            </p>
          ) : (
            <PostsList
              user={userSession}
              initialPosts={userPosts}
              customUrl={`${ENDPOINTS.POSTS_URL}/user-posts/${username}`}
            />
          )}
        </>
      ) : (
        <>
          {!userCommunities.length ? (
            <p className="text-center text-xl text-zinc-700 my-5">
              {username !== userSession?.username
                ? `${username} have not created any community yet`
                : `You have not created any community yet`}
            </p>
          ) : (
            <ChaptersList communities={userCommunities} />
          )}
        </>
      )}
    </>
  );
};
