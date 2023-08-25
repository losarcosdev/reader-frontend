"use client";
import { Button } from "@/components/common";
import { useSubscribe } from "../hooks";

interface Props {
  isSubscribed: boolean;
  chapterName: string;
  accessToken: string;
}

export const SuscribeLeaveToggle = ({
  isSubscribed,
  chapterName,
  accessToken,
}: Props) => {
  const { isSubLoading, subscribe, isUnSubLoading, unSubscribe } = useSubscribe(
    {
      chapterName,
      accessToken,
    }
  );

  return isSubscribed ? (
    <Button
      className="mt-3 mb-4"
      onClick={() => unSubscribe()}
      isLoading={isUnSubLoading}
      disabled={isUnSubLoading}
    >
      Leave Community
    </Button>
  ) : (
    <Button
      className="mt-3 mb-4"
      onClick={() => subscribe()}
      isLoading={isSubLoading}
      disabled={isSubLoading}
    >
      Join to post
    </Button>
  );
};
