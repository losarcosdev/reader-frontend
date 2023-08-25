export interface Chapter {
  id:               string;
  name:             string;
  slug:             string;
  about:            string;
  coverImage:       string;
  createdAt:        string;
  updatedAt:        string;
  subscribersCount: number;
  creator:          Creator;
}

export interface CreateChapter {
  name       : string;
  coverImage?: string;
  about     ?: string;
}



interface Creator {
  id:           string;
  fullName:     string;
  profileImage: string;
  username:     string;
}
