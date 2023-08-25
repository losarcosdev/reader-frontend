"use client";

export const CustomImageRenderer = ({ data }: any) => {
  const src = data.file.url;

  return (
    <div className="flex items-center justify-center">
      <img
        alt="image"
        className="rounded-md md:object-contain w-full"
        src={src}
      />
    </div>
  );
};
