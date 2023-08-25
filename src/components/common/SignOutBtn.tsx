"use client";
import React from "react";
import { DropdownMenuItem } from "./Dropdown-menu";
import { signOut } from "next-auth/react";

export const SignOutBtn = () => {
  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
    >
      Sign Out
    </DropdownMenuItem>
  );
};
