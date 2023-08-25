import { getAuthSession } from "@/lib";

export const getUser = async () => {
  const session = await getAuthSession();

  if (session) {
    if (session.user) return session.user;
  }

  return null;
};
