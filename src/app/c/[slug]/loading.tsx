import { Skeleton } from "@/components/common/Skeleton";

const loading = () => {
  return (
    <div className="flex flex-col gap-5">
      <Skeleton className="h-48 w-full rounded-sm" />
      <Skeleton className="h-48 w-full rounded-sm" />
      <Skeleton className="h-48 w-full rounded-sm" />
    </div>
  );
};

export default loading;
