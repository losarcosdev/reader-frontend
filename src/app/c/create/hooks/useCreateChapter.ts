import { CreateChapter } from "@/interfaces";
import { uploadFiles } from "@/lib/uploadthing";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useToast, useCustomToasts, useClientUser } from "@/hooks";
import axios, { AxiosError } from "axios";

export const useCreateChapter = () => {
  const { userSession } = useClientUser();
  const fileInputRef = useRef<any>();
  const { toast } = useToast();
  const router = useRouter();
  const { loginToast } = useCustomToasts();
  const [name, setName] = useState<string>("");
  const [errorName, setErrorName] = useState("");
  const [about, setAbout] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>();
  const [uploadingFile, setUploadingFile] = useState(false);

  const handleFileChange = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const file = target.files[0];
      try {
        setUploadingFile(true);
        const [res] = await uploadFiles([file], "imageUploader");
        setCoverImage(res.fileUrl);
      } catch (error) {
        console.log(error);
      } finally {
        setUploadingFile(false);
      }
    }
  };

  const handleInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleNameChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setName(() => value);
  };

  useEffect(() => {
    if (name.length < 3 || name.length > 40) {
      setErrorName("Name must have between 3 and 40 characters.");
    } else {
      setErrorName("");
    }
  }, [name]);

  const { mutate: createChapter, isLoading } = useMutation({
    mutationFn: async () => {
      const chapter: CreateChapter = {
        name,
        about,
        coverImage,
      };

      if (userSession) {
        const token = userSession.accessToken;

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/chapters/create`,
          { ...chapter },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return data as string;
      }
    },
    onError: (error: any) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          return toast({
            title: "Chapter name already exists",
            description: "Please choose a different chapter name",
            variant: "destructive",
          });
        }
        if (error.response?.status === 401) {
          return loginToast();
        }
      }

      if (error.response?.status === 400) {
        return toast({
          title: "There was an error",
          description: `${error.response.data.message}`,
          variant: "destructive",
        });
      }

      toast({
        title: "There was an error",
        description: "Could not create chapter",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      router.push(`/c/${data}`);
    },
  });

  return {
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
  };
};
