"use client";

import { buttonVariants } from "@/components/common";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  chapterName: string;
}

export const CreatePostBtn = ({ chapterName }: Props) => {
  const pathName = usePathname();

  return (
    <>
      {pathName === `/c/${chapterName}/submit` ? (
        <></>
      ) : (
        <Link
          href={`c/${chapterName}/submit`}
          className={buttonVariants({
            className: "w-full mb-4",
            variant: "outline",
          })}
        >
          Create Post
        </Link>
      )}
    </>
  );
};
