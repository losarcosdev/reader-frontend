import { TextArea, Button } from "@/components/common";
import { CommentType, useComment } from "@/hooks";
import { Comment } from "@/interfaces";

interface Props {
  accessToken: string | undefined;
  comment: Comment;
  isEditing: boolean;
  postId: string;
  setIsEditing: (isEditing: boolean) => void;
}

export const EditComment = ({
  accessToken,
  comment,
  isEditing,
  postId,
  setIsEditing,
}: Props) => {
  const {
    characters,
    content,
    isLoading,
    comment: commentState,
    handleSubmit,
    onCreateComment,
  } = useComment({
    accessToken,
    postId,
    commentId: comment.id,
    type: CommentType.EDIT,
    prevContent: comment.content,
  });

  const handleEditComment = () => {
    onCreateComment({ content, postId });
    setIsEditing(!isEditing);
  };

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(onCreateComment)}
    >
      <TextArea
        placeholder="Edit comment..."
        {...commentState("content")}
        disabled={isLoading}
        className="resize-none"
      />
      <div className="flex justify-between items-center">
        <p className="text-sm font-normal">Characters left: {characters}</p>
        <div className="flex items-center gap-1">
          <Button
            onClick={() => setIsEditing(false)}
            className="w-[100px]"
            variant="ghost"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleEditComment}
            className="w-[100px]"
            variant="subtle"
            disabled={!content.length || content.length > 2499}
            isLoading={isLoading}
          >
            Edit
          </Button>
        </div>
      </div>
    </form>
  );
};
