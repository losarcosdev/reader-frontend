import { TextArea, Button } from "@/components/common";
import { CommentType, useComment } from "@/hooks";

interface Props {
  accessToken: string | undefined;
  commentId: string;
  isReplyInputHidden: boolean;
  postId: string;
  handleReplyInputView: (boolean: boolean) => void;
}

export const AddReply = ({
  accessToken,
  commentId,
  isReplyInputHidden,
  postId,
  handleReplyInputView,
}: Props) => {
  const {
    characters,
    content,
    isLoading,
    comment,
    handleSubmit,
    onCreateComment,
  } = useComment({
    accessToken,
    postId,
    commentId,
    type: CommentType.REPLY,
  });

  if (isReplyInputHidden) {
    return <></>;
  }

  const onReply = () => {
    onCreateComment({ content, postId });
    handleReplyInputView(!isReplyInputHidden);
  };

  return (
    <form
      className="flex flex-col gap-2 w-full"
      onSubmit={handleSubmit(onReply)}
    >
      <TextArea
        placeholder="Add a reply..."
        className="resize-none"
        {...comment("content")}
        disabled={isLoading}
      />
      <div className="flex justify-between items-center">
        <p className="text-sm font-normal">Characters left: {characters}</p>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            className="w-fit"
            onClick={() => handleReplyInputView(!isReplyInputHidden)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="subtle"
            className="w-fit"
            disabled={!content.length || content.length > 2499}
            isLoading={isLoading}
          >
            Reply
          </Button>
        </div>
      </div>
    </form>
  );
};
