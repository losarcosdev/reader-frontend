import { Session, Vote } from "@/interfaces";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  const options: any = { year: "numeric", month: "long", day: "numeric" };
  return dateObj.toLocaleDateString("en-EN", options);
};

export const checkIfPostIsVoted = (votes: Vote[], user: Session | null) => {
  let isVoted = null;

  if (user) {
    isVoted = votes.some((vote) => vote.user.id === user.id);
  } else {
    isVoted = false;
  }

  return isVoted;
};
