"use client";
import { ENDPOINTS } from "@/constants";
import { toast } from "@/hooks";
import { CommentCreationRequest, CommentValidator } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const MAX_CHARACTERS_LENGTH = 2500;

export enum CommentType {
  COMMENT = "COMMENT",
  REPLY = "REPLY",
  EDIT = "EDIT",
}

interface Props {
  postId: string;
  commentId?: string;
  accessToken: string | undefined;
  type?: CommentType;
  prevContent?: string;
}

export const useComment = ({
  postId,
  commentId,
  accessToken,
  type = CommentType.COMMENT,
  prevContent,
}: Props) => {
  const [characters, setCharacters] = useState(MAX_CHARACTERS_LENGTH);
  const {
    register: comment,
    handleSubmit,
    watch,
    setValue,
  } = useForm<CommentCreationRequest>({
    resolver: zodResolver(CommentValidator),
    defaultValues: {
      content: type === CommentType.EDIT ? prevContent : "",
      postId,
    },
  });
  const router = useRouter();

  const { mutate: createComment, isLoading } = useMutation({
    mutationFn: async ({ content, postId }: CommentCreationRequest) => {
      // Check if the user is authenticated
      if (accessToken) {
        // On edit
        if (type === CommentType.EDIT) {
          const { data } = await axios.patch<{ messagge: string }>(
            `${ENDPOINTS.COMMENTS_URL}/update-comment/${commentId}`,
            { content },
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          return data.messagge;
        }

        // On reply
        if (type === CommentType.REPLY) {
          const { data } = await axios.post<{ messagge: string }>(
            `${ENDPOINTS.COMMENTS_URL}/reply/${commentId}`,
            { content, postId },
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          return data.messagge;
        }

        // On create
        const { data } = await axios.post<{ messagge: string }>(
          `${ENDPOINTS.COMMENTS_URL}/add/${postId}`,
          { content },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        return data.messagge;
      }
    },
    onSuccess: (successMessagge) => {
      toast({
        title: successMessagge,
      });
      router.refresh();
    },
    onError(error: any) {
      if (error.response.data.statusCode === 401) {
        return toast({
          title: "Something went wrong",
          description: error.response.data.message,
          variant: "destructive",
        });
      }

      return toast({
        title: "Something went wrong",
        description: "Adding a comment was impossible, please try again later",
        variant: "destructive",
      });
    },
  });

  const onCreateComment = async (data: CommentCreationRequest) => {
    createComment(data);
    setValue("content", "");
  };

  const content = watch("content");

  useEffect(() => {
    setCharacters(2500 - content.length);
  }, [content.length]);

  return {
    characters,
    content,
    isLoading,
    comment,
    createComment,
    handleSubmit,
    onCreateComment,
  };
};
