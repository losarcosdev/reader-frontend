"use client";
import { Button, TextArea } from "@/components/common";
import { useComment } from "@/hooks";

interface Props {
  postId: string;
  accessToken: string | undefined;
}

export const AddComment = ({ postId, accessToken }: Props) => {
  const {
    characters,
    content,
    isLoading,
    comment,
    handleSubmit,
    onCreateComment,
  } = useComment({ accessToken, postId });

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(onCreateComment)}
    >
      <TextArea
        placeholder="Add a comment..."
        {...comment("content")}
        disabled={isLoading}
        className="resize-none"
      />
      <div className="flex justify-between items-center">
        <p className="text-sm font-normal">Characters left: {characters}</p>
        <Button
          type="submit"
          variant="subtle"
          className="w-fit"
          disabled={!content.length || content.length > 2499}
          isLoading={isLoading}
        >
          Comment
        </Button>
      </div>
    </form>
  );
};
