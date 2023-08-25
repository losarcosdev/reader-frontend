"use client";
import { Button } from "@/components/common";
import { ENDPOINTS } from "@/constants";
import { toast, useCustomToasts } from "@/hooks";
import { Session } from "@/interfaces";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ArrowBigUp } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface Props {
  initialVotesAmt: number;
  postId: string;
  user: Session | null;
  isVoted?: boolean;
}

export const PostVotes = ({
  initialVotesAmt,
  postId,
  user,
  isVoted,
}: Props) => {
  const pathname = usePathname();
  const { loginToast } = useCustomToasts();
  const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt);
  const [isAlreadyVoted, setIsAlreadyVoted] = useState(isVoted);

  useEffect(() => {
    setIsAlreadyVoted(isVoted);
  }, [isVoted]);

  const { mutate: upVote } = useMutation({
    mutationFn: async () => {
      await axios.post(
        `${ENDPOINTS.UP_VOTE_URL}/${postId}`,
        {},
        { headers: { Authorization: `Bearer ${user!.accessToken}` } }
      );
    },
  });

  const handleVote = () => {
    if (!user) {
      return loginToast();
    }

    if (isAlreadyVoted) {
      if (votesAmt - 1 < 0) {
        return;
      }
      setVotesAmt((prevAmt) => prevAmt - 1);
      toast({ title: "Vote removed!" });
      setIsAlreadyVoted(() => false);
      upVote();
    } else {
      setVotesAmt((prevAmt) => prevAmt + 1);
      setIsAlreadyVoted(() => true);
      upVote();
    }
  };

  if (pathname.split("/").includes("user")) return <></>;

  return (
    <Button
      size="sm"
      variant="ghost"
      aria-label="upvote"
      onClick={handleVote}
      className="flex flex-col"
    >
      <ArrowBigUp
        className={`h-10 w-10 ${
          isAlreadyVoted && "text-emerald-500 fill-emerald-500"
        }`}
      />
      <p className="text-center font-medium text-sm text-zinc-900">
        {votesAmt}
      </p>
    </Button>
  );
};
