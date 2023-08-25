import { TextEditor } from "@/components/common/TextEditor/TextEditor";
import { getUser } from "@/services";
import { redirect } from "next/navigation";
import React from "react";

const CreatePostPage = async () => {
  const user = await getUser();

  if (!user) {
    redirect(`/posts`);
  }

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="border-b border-gray-200 pb-5">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline gap-1">
          <h1 className="ml-2 mt-2 font-semibold leading-2 text-gray-900 text-4xl">
            Create Post
          </h1>
          <p className="ml-2 mt-1 truncate text-sm text-gray-500"></p>
        </div>
      </div>
      {/* form */}
      <TextEditor accessToken={user.accessToken} />
    </div>
  );
};

export default CreatePostPage;
