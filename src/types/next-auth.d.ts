import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    username?: string | null;
    id: UserId;
  }
}

declare module "next-auth" {
  interface Session {
    id: UserId;
    username?: string | null;
  }
}
