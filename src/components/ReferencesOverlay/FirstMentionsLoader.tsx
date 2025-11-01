import { FC } from "react";
import Skeleton from "react-loading-skeleton";

export const FirstMentionsLoader: FC = () => (
  <>
    <Skeleton containerClassName="flex-1" height={14} width="100px" />
    <div>
      <Skeleton containerClassName="flex-1" height={20} />
      <Skeleton containerClassName="flex-1" height={20} />
      <Skeleton containerClassName="flex-1" height={14} width="100px" />
    </div>

    <Skeleton containerClassName="flex-1" height={14} width="100px" />
    <div>
      <Skeleton containerClassName="flex-1" height={20} />
      <Skeleton containerClassName="flex-1" height={20} />
      <Skeleton containerClassName="flex-1" height={14} width="100px" />
    </div>

    <Skeleton containerClassName="flex-1" height={14} width="100px" />
    <div>
      <Skeleton containerClassName="flex-1" height={20} />
      <Skeleton containerClassName="flex-1" height={20} />
      <Skeleton containerClassName="flex-1" height={14} width="100px" />
    </div>
  </>
);
