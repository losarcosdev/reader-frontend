import { Chapter } from "./chapter.interface";
import { PostPreview } from "./postPreview.interface";

export interface UserProfile {
  id:           string;
  fullName:     string;
  profileImage: string;
  email:        string;
  username:     string;
  chapters:     Chapter[];
  postsPreview: PostPreview[];
  postVotes:    PostVote[];
}

interface PostVote {
  id:   string;
  type: string;
}
