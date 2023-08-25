import { ENDPOINTS } from "@/constants";
import { Comment } from "@/interfaces";
import axios from "axios";
import { CommentCard } from "./CommentCard";
import { AddComment } from "./AddComment";
import { getUser } from "@/services";

interface Props {
  postId: string;
}

export const Comments = async ({ postId }: Props) => {
  const { data: comments } = await axios.get<Comment[]>(
    `${ENDPOINTS.COMMENTS_URL}/post-comments/${postId}`
  );
  const user = await getUser();

  return (
    <div className="flex flex-col gap-y-4 pb-5">
      <hr className="w-full h-px" />

      <AddComment postId={postId} accessToken={user?.accessToken} />

      {/* Comments List  */}
      <div className="flex flex-col gap-y-6 mt-4">
        {comments.map((comment) => (
          <CommentCard
            comment={comment}
            key={comment.id}
            postId={postId}
            accessToken={user?.accessToken}
            userId={user?.id}
          />
        ))}
      </div>
    </div>
  );
};
