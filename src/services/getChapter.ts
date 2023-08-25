import axios from "axios";
import { Chapter } from "../interfaces/chapter.interface";
import { ENDPOINTS } from "@/constants";

export const getChapter = async (slug: string) => {
  let chapter = {} as Chapter;
  try {
    const { data } = await axios.get<Chapter>(
      `${ENDPOINTS.CHAPTERS_URL}/${slug}`
    );

    chapter = data;
  } catch (error) {
    console.log(error);
    return null;
  }

  return chapter;
};
