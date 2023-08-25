import { ENDPOINTS } from "@/constants";
import axios from "axios";

interface Props {
  content: any;
  title: string;
  chapterId?: string;
  accessToken: string;
}

export const createPost = async ({
  accessToken,
  chapterId,
  content,
  title,
}: Props) => {
  const payload = {
    content,
    title,
  };

  if (chapterId) {
    const { data } = await axios.post<{ message: string }>(
      `${ENDPOINTS.POSTS_URL}/${chapterId}`,
      { ...payload },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return data.message;
  } else {
    const { data } = await axios.post<{ message: string }>(
      `${ENDPOINTS.POSTS_URL}`,
      { ...payload },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return data.message;
  }
};
