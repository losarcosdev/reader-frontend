"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/common";
import { ENDPOINTS } from "@/constants";
import { toast } from "@/hooks";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  accessToken: string | undefined;
  commentId: string;
  postId: string;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const DeleteEditCommentButtons = ({
  accessToken,
  commentId,
  postId,
  isEditing,
  setIsEditing,
}: Props) => {
  const router = useRouter();

  const { mutate: deleteComment, isLoading } = useMutation({
    mutationFn: async () => {
      if (accessToken) {
        const { data } = await axios.post<{ message: string }>(
          `${ENDPOINTS.COMMENTS_URL}/delete-comment/${commentId}`,
          { postId },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        return data.message;
      }
    },
    onError: (error: any) => {
      if (error.response?.status === 400) {
        return toast({
          title: "There was an error",
          description: `${error.response.data.message}`,
          variant: "destructive",
        });
      }
    },
    onSuccess: (successsMessagge) => {
      router.refresh();
      return toast({
        title: successsMessagge,
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal
          className={
            "text-zinc-400 hover:bg-zinc-200 h-7 w-7 rounded-full duration-100"
          }
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            setIsEditing(!isEditing);
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => deleteComment()}
          disabled={isLoading}
          className="cursor-pointer"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
