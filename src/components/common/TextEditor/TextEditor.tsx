"use client";
import { useCallback, useRef, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import TextareaAutoSize from "react-textarea-autosize";
import type EditorJS from "@editorjs/editorjs";
import { useMutation } from "@tanstack/react-query";
import { PostCreationRequest, PostValidator } from "@/lib/validators/post";
import { uploadFiles } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks";
import { Button } from "@/components/common";
import { createPost as createPostHelper } from "@/services";


interface Props {
  chapterId?: string;
  accessToken: string;
}

export const TextEditor = ({ chapterId, accessToken }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      chapterId,
      title: "",
      content: null,
    },
  });

  const editorRef = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const _titleRef = useRef<HTMLTextAreaElement>();
  const router = useRouter();
  const pathname = usePathname();

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          editorRef.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const [res] = await uploadFiles([file], "imageUploader");

                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  const { mutate: createPost, isLoading } = useMutation({
    mutationFn: async ({ chapterId, title, content }: PostCreationRequest) => {
      const createdMessage = await createPostHelper({
        accessToken,
        chapterId,
        content,
        title,
      });

      return createdMessage;
    },
    onSuccess: (successMessage) => {
      const newPathname = pathname.split("/").slice(0, -1).join("/");
      router.replace(newPathname);
      router.refresh();
      toast({
        title: "Post created!",
        description: successMessage,
      });
    },
    onError(error: any) {
      if (error.response.data.statusCode === 401) {
        return toast({
          title: "Something went wrong",
          description: error.response.data.message,
          variant: "destructive",
        });
      }

      return toast({
        title: "Something went wrong",
        description: "Creating a post was impossible, please try again later",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async ({ chapterId, title }: PostCreationRequest) => {
    const editorContent = await editorRef.current?.save();
    const payload: PostCreationRequest = {
      chapterId,
      title,
      content: editorContent,
    };
    createPost(payload);
  };

  // Mount the component when we are in the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  // Handle any potential error that may ocurr
  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [key, value] of Object.entries(errors)) {
        toast({
          title: "Something went wrong",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }
  }, [errors]);

  // Initialized editor when the component is mounted
  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();
      return () => {
        editorRef.current?.destroy();
        editorRef.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  const { ref: titleRef, ...rest } = register("title");

  return (
    <section className="py-5 w-full">
      <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
        <form
          id="subreddit-post-form"
          className="w-fit"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="prose prose-stone dark:prose-invert w-full">
            <TextareaAutoSize
              ref={(e) => {
                titleRef(e);
                // @ts-ignore
                _titleRef.current = e;
              }}
              {...rest}
              placeholder="Title"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            />
            <div id="editor" className="min-h-[500px] overflow-hidden pl-10" />
          </div>
        </form>
      </div>
      <div className="w-full flex justify-end mt-4">
        <Button
          type="submit"
          className="w-full"
          form="subreddit-post-form"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Post
        </Button>
      </div>
    </section>
  );
};
