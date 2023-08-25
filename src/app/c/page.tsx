import { ENDPOINTS } from "@/constants";
import { Chapter } from "@/interfaces";
import axios from "axios";
import { ChaptersList } from "../components";

const CommunitiesPage = async () => {
  const { data: communities } = await axios.get<Chapter[]>(
    `${ENDPOINTS.CHAPTERS_URL}/get/all`
  );

  return <ChaptersList communities={communities} />;
};

export default CommunitiesPage;
