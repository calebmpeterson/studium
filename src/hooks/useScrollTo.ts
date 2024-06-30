import { useEffect, useRef } from "react";

interface Props {
  behavior?: ScrollBehavior;
}

export const useScrollTo = <E extends HTMLElement>(
  isActive: boolean,
  { behavior = "smooth" }: Props = {}
) => {
  const ref = useRef<E>(null);

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ behavior, block: "center" });
    }
  }, [behavior, isActive]);

  return ref;
};
