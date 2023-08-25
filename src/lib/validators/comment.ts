import { z } from "zod";

export const CommentValidator = z.object({
  content: z
    .string()
    .min(1, {
      message: "Comment must be between 1 and 2500 characters",
    })
    .max(2500, {
      message: "Comment must be between 1 and 2500 characters",
    }),
  postId: z.string().optional(),
});

export type CommentCreationRequest = z.infer<typeof CommentValidator>;
