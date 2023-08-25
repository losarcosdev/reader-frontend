import { SessionProvider, ReactQueryProvider } from "@/providers";
import { Navbar, Toaster } from "@/components/common";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reader",
  description: "A social interaction platform built with Next.js, TypeScript and Nest.js",
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        inter.className
      )}
    >
      <SessionProvider>
        <ReactQueryProvider>
          <body className="min-h-screen pt-12 bg-slate-50 antialiased">
            <Navbar />
            {authModal}
            <div className="container max-w-[92rem] mx-auto h-full pt-12">
              {children}
            </div>
            <Toaster />
          </body>
        </ReactQueryProvider>
      </SessionProvider>
    </html>
  );
}
