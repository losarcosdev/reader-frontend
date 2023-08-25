import { Session } from "@/interfaces";
import axios from "axios";
import { redirect as nextRedirect } from "next/navigation";

interface Props {
  redirect?: boolean;
  redirectPathname?: string;
  chapterId: string;
  user: Session | null;
}

export const checkSubscriptionAndRedirect  = async ({
  chapterId,
  redirect,
  redirectPathname,
  user,
}: Props): Promise<boolean> => {
  if (user) {
    const { data } = await axios.get<boolean>(
      `${process.env.NEXT_PUBLIC_API_URL}/chapters/check-user-subscription/${chapterId}`,
      { headers: { Authorization: `Bearer ${user.accessToken}` } }
    );

    if (!data && redirect) {
      return nextRedirect(`${redirectPathname}`);
    }

    return data;
  } else {
    return false;
  }
};
