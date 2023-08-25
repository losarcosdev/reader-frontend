"use client";

export const CustomCodeRenderer = ({ data }: any) => {
  return (
    <pre className="bg-zinc-800 rounded-md p-4">
      <code className="text-gray-100 text-sm">{data.code}</code>
    </pre>
  );
};
