export interface Comment {
  id:        string;
  content:   string;
  createdAt: Date;
  updatedAt: Date;
  author:    Author;
  replies:   Comment[];
}

interface Author {
  id:           string;
  profileImage: string;
  username:     string;
}
