import { VoteType } from "./postPreview.interface";
import { UserResponse } from "./userResponse.interface";

export interface Post {
  id: string;
  title: string;
  content: any;
  createdAt: string;
  updatedAt: string;
  votesAmount: number;
  commentsAmount: number;
  votes: Vote[];
  author: Author;
  comments: any[];
}

interface Author {
  id: string;
  fullName: string;
  profileImage: string;
  email: string;
  username: string;
}

interface Vote {
  user: UserResponse;
  id: string;
  post: { title: string; id: string };
  type: VoteType;
}
