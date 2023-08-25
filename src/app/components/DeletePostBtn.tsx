"use client";
import { Button } from "@/components/common";
import { ENDPOINTS } from "@/constants";
import { toast } from "@/hooks";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  postId: string;
  accessToken?: string;
}

export const DeletePostBtn = ({ postId, accessToken }: Props) => {
  const router = useRouter();

  const { mutate: deletePost, isLoading } = useMutation({
    mutationFn: async () => {
      if (!accessToken) {
        return toast({
          title: "Unauthorized",
          description: "You must be logged in to delete a post",
          variant: "destructive",
        });
      }

      const { data } = await axios.delete(
        `${ENDPOINTS.POSTS_URL}/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return data.message;
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        return toast({
          title: "Unauthorized",
          description: `${error.response.data.message}`,
          variant: "destructive",
        });
      }

      if (error.response?.status === 400) {
        return toast({
          title: "There was an error",
          description: `${error.response.data.message}`,
          variant: "destructive",
        });
      }

      toast({
        title: "There was an error",
        description: "Could not eliminate post - try again later",
        variant: "destructive",
      });
    },
    onSuccess: (successMessage: string) => {
      toast({
        title: successMessage,
      });
      router.push("/posts");
    },
  });

  return (
    <Button
      className="w-fit"
      variant="subtle"
      onClick={() => deletePost()}
      isLoading={isLoading}
    >
      Delete
    </Button>
  );
};
