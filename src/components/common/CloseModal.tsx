"use client";
import { Button } from "@/components/common";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export const CloseModal = () => {
  const router = useRouter();
  return (
    <Button
      variant="subtle"
      className="h-6 w-6 p-0 rounded-md"
      aria-label="close modal"
      onClick={() => router.back()}
    >
      <X className="w-4 h-4" />
    </Button>
  );
};
