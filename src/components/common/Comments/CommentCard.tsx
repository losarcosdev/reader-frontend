"use client";
import { Button, UserAvatar } from "@/components/common";
import { Comment } from "@/interfaces";
import { formatDistanceToNow } from "date-fns";
import { Play } from "lucide-react";
import { AddReply } from "./AddReply";
import { useState } from "react";
import { DeleteEditCommentButtons } from "./DeleteEditCommentButtons";
import { EditComment } from "./EditComment";

interface Props {
  comment: Comment;
  postId: string;
  accessToken: string | undefined;
  userId: string | undefined;
}

export const CommentCard = ({
  comment,
  accessToken,
  postId,
  userId,
}: Props) => {
  const creationDate = new Date(comment.createdAt);
  const timeAgoDescription = formatDistanceToNow(creationDate, {
    addSuffix: true,
  });
  const user = {
    name: comment.author.username,
    email: comment.author.username,
    image: comment.author.profileImage,
  };

  const [isReplyInputHidden, setIsReplyInputHidden] = useState(true);
  const [showReplies, setShowReplies] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleReplyInputView = (boolean: boolean) => {
    setIsReplyInputHidden(boolean);
  };

  return (
    <div className="bg-white p-3 rounded-md">
      <div key={comment.id} className="flex gap-3 px-2">
        <UserAvatar displayName={false} user={user} />
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between">
            <div className="flex gap-1 items-center">
              <p className="font-semibold text-sm">{comment.author.username}</p>
              <span className="text-xs text-gray-500">
                {timeAgoDescription}
              </span>
            </div>
            {userId === comment.author.id && !isEditing && (
              <DeleteEditCommentButtons
                commentId={comment.id}
                accessToken={accessToken}
                postId={postId}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            )}
          </div>
          {isEditing ? (
            <EditComment
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              accessToken={accessToken}
              comment={comment}
              postId={postId}
            />
          ) : (
            <p>{comment.content}</p>
          )}
          {!isEditing && (
            <div className="flex items-center">
              {isReplyInputHidden && (
                <Button
                  variant="ghost"
                  onClick={() => handleReplyInputView(!isReplyInputHidden)}
                >
                  Reply
                </Button>
              )}
            </div>
          )}
          <AddReply
            isReplyInputHidden={isReplyInputHidden}
            handleReplyInputView={handleReplyInputView}
            commentId={comment.id}
            accessToken={accessToken}
            postId={postId}
          />
          {comment.replies.length && isReplyInputHidden ? (
            <Button
              variant="ghost"
              onClick={() => setShowReplies(!showReplies)}
              className="w-fit text-blue-700 hover:bg-blue-100 flex items-center gap-2"
            >
              <Play
                className={`h-4 w-4 ${
                  showReplies ? `-rotate-90` : "rotate-90"
                } transition-transform duration-100`}
              />
              {showReplies ? "Hide replies" : "Show replies"}
            </Button>
          ) : null}
        </div>
      </div>
      {showReplies && (
        <div className="flex flex-col mt-4 px-2">
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              accessToken={accessToken}
              postId={postId}
              userId={userId}
            />
          ))}
        </div>
      )}
    </div>
  );
};
