import { TextEditor } from "@/components/common/TextEditor/TextEditor";
import { redirect } from "next/navigation";
import { checkSubscriptionAndRedirect, getChapter, getUser } from "@/services";

interface Props {
  params: {
    slug: string;
  };
}

const CreatePostPage = async ({ params: { slug } }: Props) => {
  const user = await getUser();
  if (!user) {
    redirect(`/c/${slug}`);
  }

  const chapter = await getChapter(slug);
  if (!chapter) {
    return <>404 Not found!</>;
  }

  await checkSubscriptionAndRedirect({
    chapterId: chapter.id,
    user,
    redirect: true,
    redirectPathname: `/c/${slug}`,
  });

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="border-b border-gray-200 pb-5">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline gap-1">
          <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
            Create Post
          </h3>
          <p>in r/{slug}</p>
          <p className="ml-2 mt-1 truncate text-sm text-gray-500"></p>
        </div>
      </div>
      {/* form */}
      <TextEditor chapterId={chapter.id} accessToken={user.accessToken} />
    </div>
  );
};

export default CreatePostPage;
