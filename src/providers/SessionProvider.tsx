"use client";
import { SessionProvider as NextSessionProvider } from "next-auth/react";

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <NextSessionProvider>{children}</NextSessionProvider>;
};
