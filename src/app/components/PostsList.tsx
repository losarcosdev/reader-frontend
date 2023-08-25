"use client";
import { useClientUser } from "@/hooks";
import { PostPreview, Session } from "@/interfaces";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef } from "react";
import { ENDPOINTS } from "@/constants";
import { PostCard } from "./PostCard";
import { Loader2 } from "lucide-react";

interface Props {
  initialPosts: PostPreview[];
  chapterId?: string;
  user: Session | null;
  customUrl?: string;
}

export const PostsList = ({ initialPosts, chapterId, customUrl }: Props) => {
  const lastPostRef = useRef<HTMLElement>(null);
  const { userSession: userClient } = useClientUser();

  const { ref: intersectionRef, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(
      ["infinite-query"],
      async ({ pageParam = 1 }) => {
        let query = ``;

        if (customUrl) {
          query = `${customUrl}?page=${pageParam}`;
          const { data } = await axios.get<PostPreview[]>(query);
          return data;
        }

        if (chapterId) {
          query = `${ENDPOINTS.GET_CHAPTER_POSTS_URL}/${chapterId}?page=${pageParam}`;
        } else {
          query = `${ENDPOINTS.POSTS_URL}/get/all?page=${pageParam}`;
        }

        const { data } = await axios.get<PostPreview[]>(query);
        return data;
      },
      {
        getNextPageParam: (_, pages) => {
          return pages.length + 1;
        },
        initialData: { pages: [initialPosts], pageParams: [1] },
      }
    );

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  return (
    <ul className="flex flex-col col-span-2 space-y-3">
      {posts.map((post, index) => (
        <li
          key={post.id}
          ref={index === posts.length - 1 ? intersectionRef : null}
        >
          <PostCard post={post} userClient={userClient} />
        </li>
      ))}
      <div className="flex items-center justify-center my-3">
        {isFetchingNextPage && <Loader2 />}
        {!hasNextPage && !isFetchingNextPage && (
          <p>Ups! Seems that you get to the end.</p>
        )}
      </div>
    </ul>
  );
};
