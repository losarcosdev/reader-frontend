import { Chapter } from "@/interfaces";
import { ChapterCard } from "./ChapterCard";

interface Props {
  communities: Chapter[];
}

export const ChaptersList = ({ communities }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      {communities.map((community) => (
        <ChapterCard community={community} key={community.id} />
      ))}
    </div>
  );
};
