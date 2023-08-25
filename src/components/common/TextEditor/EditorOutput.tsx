"use client";
import { FC } from "react";
import dynamic from "next/dynamic";
import { CustomImageRenderer } from "./CustomImageRenderer";
import { CustomCodeRenderer } from "./CustomCodeRenderer";
import { CustomHeadingRenderer } from "./CustomHeadingRenderer";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

interface EditorOutputProps {
  content: any;
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
  header: CustomHeadingRenderer,
};

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
};

export const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return (
    <Output
      style={style}
      className="text-sm"
      renderers={renderers}
      data={content}
    />
  );
};
