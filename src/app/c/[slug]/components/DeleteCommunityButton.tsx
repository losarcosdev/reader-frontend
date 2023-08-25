"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/common";
import { ENDPOINTS } from "@/constants";
import { toast, useCustomToasts } from "@/hooks";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  accessToken: string;
  communityId: string;
  username: string;
}

export const DeleteCommunityButton = ({
  accessToken,
  communityId,
  username,
}: Props) => {
  const router = useRouter();
  const { loginToast } = useCustomToasts();

  const { mutate: deleteCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(
        `${ENDPOINTS.CHAPTERS_URL}/delete/${communityId}`,
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
        return loginToast();
      }

      if (error.response?.status === 404) {
        return toast({
          title: "There was an error",
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
        description: "Could not eliminate chapter",
        variant: "destructive",
      });
    },
    onSuccess: (successMessage) => {
      toast({
        title: successMessage,
      });
      router.push(`/user/${username}`);
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="absolute top-3 right-3">
        <MoreHorizontal
          className={
            "text-zinc-400 hover:bg-zinc-200 h-7 w-7 rounded-full duration-100"
          }
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => deleteCommunity()}
          disabled={isLoading}
          className="cursor-pointer"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
