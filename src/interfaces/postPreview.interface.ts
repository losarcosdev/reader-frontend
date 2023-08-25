import { UserResponse } from ".";

export interface PostPreview {
  id: string;
  title: string;
  previewContent: PreviewContent;
  createdAt: string;
  updatedAt: string;
  votes: Vote[];
  votesAmount: number;
  commentsAmount: number;
  author: Author;
  chapter: Chapter;
}

export enum VoteType {
  UP = "UP",
  DOWN = "DOWN",
}

export interface Vote {
  user: UserResponse;
  id: string;
  post: { title: string; id: string };
  type: VoteType;
}

interface Author {
  id: string;
  fullName: string;
  profileImage: string;
  username: string;
}

interface Chapter {
  id: string;
  slug: string;
  name?: string;
}

interface PreviewContent {
  type: string;
  content: string;
  time: number;
}
