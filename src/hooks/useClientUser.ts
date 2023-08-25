"use client";
import { Session } from "@/interfaces";
import { useSession } from "next-auth/react";

export const useClientUser = () => {
  const { data: session } = useSession();

  let userSession = {} as Session | null;

  if (session) {
    userSession = session?.user as Session;
  } else {
    userSession = null;
  }

  return { userSession };
};
