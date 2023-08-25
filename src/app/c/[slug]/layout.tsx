import { formatDate } from "@/lib";
import { DeleteCommunityButton, SuscribeLeaveToggle } from "./components";
import { buttonVariants } from "@/components/common";
import Link from "next/link";
import { checkSubscriptionAndRedirect, getChapter, getUser } from "@/services";
import { CreatePostBar } from "@/components/common/CreatePostBar";

interface Props {
  children: React.ReactNode;
  params: { slug: string };
}

const Layout = async ({ children, params: { slug } }: Props) => {
  const user = await getUser();
  const chapter = await getChapter(slug);

  if (!chapter) {
    return <>404 Not found!</>;
  }

  const isCreator = chapter.creator.id === user?.id;
  const isSubscribed = await checkSubscriptionAndRedirect({
    chapterId: chapter.id,
    user,
  });

  const userAvatar = {
    name: user?.name,
    email: user?.email,
    image: user?.image,
  };

  return (
    <section className="flex flex-col gap-5">
      <header className="flex flex-col gap-2 items-center justify-center w-full md:h-[60vh] bg-white shadow-sm p-5 rounded-md relative">
        {isCreator && (
          <DeleteCommunityButton
            accessToken={user?.accessToken}
            communityId={chapter.id}
            username={chapter.creator.username}
          />
        )}
        {chapter.coverImage && (
          <img
            src={chapter.coverImage}
            className="rounded-full w-32 h-32 object-cover"
          />
        )}
        <h1 className="font-bold text-4xl text-zinc-800">{chapter.name}</h1>
        {/* User bio */}
        <p className="text-zinc-500 text-sm text-center w-full lg:w-[850px]">
          {chapter.about}
        </p>
        <div className="flex flex-col text-center  gap-1 text-sm text-zinc-800">
          {isCreator ? (
            <p>You are the creator of this community</p>
          ) : (
            <p>Creator: {chapter.creator.username}</p>
          )}
          <p>Members: {chapter.subscribersCount}</p>
          <p>Created: {formatDate(chapter.createdAt)}</p>
        </div>
        {!isCreator &&
          (user ? (
            <SuscribeLeaveToggle
              chapterName={chapter.name}
              isSubscribed={isSubscribed}
              accessToken={user?.accessToken}
            />
          ) : (
            <Link
              href="/sign-in"
              className={buttonVariants({
                className: "mt-3 mb-4",
              })}
            >
              Join to post
            </Link>
          ))}
      </header>
      {isSubscribed && <CreatePostBar userAvatar={userAvatar} />}
      {children}
    </section>
  );
};

export default Layout;
