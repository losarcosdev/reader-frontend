import { Chapter } from "@/interfaces";
import { formatDate } from "@/lib";
import { Users } from "lucide-react";

interface Props {
  community: Chapter;
}

export const ChapterCard = ({ community }: Props) => {
  return (
    <div className="rounded-md bg-white shadow" key={community.id}>
      <div className="px-6 py-4 flex justify-between">
        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500 flex items-center gap-1">
            <p>
              Created by
              <a
                href={`/user/${community.creator.username}`}
                className="underline text-zinc-900 underline-offset-2 pl-1"
              >
                u/{community.creator.username}
              </a>
            </p>
            <time>{formatDate(community.createdAt)}</time>
          </div>
          <a href={`/c/${community.slug}`}>
            <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
              {community.name}
            </h1>
          </a>
          <div className="relative text-sm max-h-40 w-full overflow-clip">
            <p className="text-zinc-500">{community.about}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 z-20 text-sm p-4 sm:px-6 flex items-center gap-2">
        <Users className="h-4 w-4" />
        <p>{community.subscribersCount}</p>
      </div>
    </div>
  );
};
