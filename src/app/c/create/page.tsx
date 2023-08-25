"use client";
import { Button, Input, TextArea } from "@/components/common";
import { useCreateChapter } from "./hooks";

const CreateChapterPage = () => {
  const {
    about,
    coverImage,
    errorName,
    fileInputRef,
    isLoading,
    name,
    router,
    uploadingFile,
    createChapter,
    handleFileChange,
    handleInputClick,
    handleNameChange,
    setAbout,
  } = useCreateChapter();

  return (
    <div className="container flex items-center h-full max-w-7xl mx-auto pb-12">
      <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Create Community</h1>
        </div>

        <hr className="bg-zinc-500 h-px" />

        <div className="pb-5">
          <p className="text-lg font-medium mb-1">Cover Image</p>
          {!coverImage && (
            <p className="text-xs pb-2 text-zinc-500">
              Add a cover image for your community. Choose an image that
              reflects the essence of your community.
            </p>
          )}
          {coverImage ? (
            <div>
              <img src={coverImage} alt="Cover" />
            </div>
          ) : (
            <div className="bg-zinc-50 h-[350px] mx-auto flex items-center justify-center border-dashed rounded-sm border-black border-[1px]">
              <Input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <Button
                variant="outline"
                onClick={handleInputClick}
                isLoading={uploadingFile}
              >
                Upload Image
              </Button>
            </div>
          )}
        </div>

        <div className="pb-5 relative">
          <p className="text-lg font-medium">Name *</p>
          <p className="text-xs pb-2 text-zinc-500">
            Communities names are unique. Communities names including
            capitalization cannot be changed.
          </p>
          <div className="relative">
            <p className="absolute text-sm left-2 w-8 inset-y-0 grid place-items-center text-zinc-400">
              community/
            </p>
            <Input
              value={name}
              onChange={handleNameChange}
              className="pl-[5.5rem]"
            />
          </div>
          {errorName && (
            <p className="text-xs pt-2 text-zinc-500 absolute">{errorName}</p>
          )}
        </div>

        <div className="pb-5">
          <p className="text-lg font-medium">About</p>
          <p className="text-xs pb-2 text-zinc-500">
            Add a description talking about your community. This description
            will help others understand the purpose and goals of your community.
            Be clear and concise, and provide enough information to attract
            potential members and engage their interest.
          </p>
          <TextArea
            value={about}
            onChange={({ target }) => setAbout(() => target.value)}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            onClick={() => createChapter()}
            isLoading={isLoading}
            disabled={uploadingFile || !!errorName}
          >
            Create Community
          </Button>
          <Button
            variant={"subtle"}
            onClick={() => router.back()}
            disabled={isLoading || uploadingFile}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateChapterPage;
