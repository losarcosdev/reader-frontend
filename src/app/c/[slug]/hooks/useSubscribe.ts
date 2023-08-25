import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast, useCustomToasts } from "@/hooks";
import { startTransition } from "react";
import { useRouter } from "next/navigation";

interface Props {
  chapterName: string;
  accessToken?: string;
}

export const useSubscribe = ({ chapterName, accessToken }: Props) => {
  const { loginToast } = useCustomToasts();
  const router = useRouter();

  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      if (accessToken) {
        const { data } = await axios.post<{ message: string }>(
          `${process.env.NEXT_PUBLIC_API_URL}/users/join-chapter/${chapterName}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        return data.message;
      }
    },
    onError: (error: any) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "There was a problem",
        description: "Something went wrong , please try again",
        variant: "destructive",
      });
    },
    onSuccess: (successMessage) => {
      startTransition(() => {
        router.refresh();
      });

      return toast({
        title: "Suscribed!",
        description: successMessage,
        variant: "default",
      });
    },
  });

  const { mutate: unSubscribe, isLoading: isUnSubLoading } = useMutation({
    mutationFn: async () => {
      if (accessToken) {
        const { data } = await axios.delete<{ message: string }>(
          `${process.env.NEXT_PUBLIC_API_URL}/users/leave-chapter/${chapterName}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        return data.message;
      }
    },
    onError: (error: any) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "There was a problem",
        description: "Something went wrong , please try again",
        variant: "destructive",
      });
    },
    onSuccess: (successMessage) => {
      startTransition(() => {
        router.refresh();
      });

      return toast({
        title: "Unsuscribed!",
        description: successMessage,
        variant: "default",
      });
    },
  });

  return {
    subscribe,
    unSubscribe,
    isSubLoading,
    isUnSubLoading,
  };
};
