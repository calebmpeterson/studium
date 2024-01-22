import { repeat } from "lodash";
import { FC, useEffect, useState } from "react";

export const Spinner: FC = () => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const handle = setInterval(() => {
      setCount((value) => value + 1);
    }, 1000);

    return () => {
      clearInterval(handle);
    };
  }, []);

  return <>{repeat(".", (count % 3) + 1)}</>;
};
