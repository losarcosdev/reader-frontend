export interface UserServerSession {
  user?: Session;
}

export interface Session {
  accessToken : string;
  email       : string;
  id          : string;
  image       : string;
  name        : string;
  username    : string;
}
