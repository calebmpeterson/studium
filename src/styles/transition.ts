export const transitionDuration = "200ms";
export const transitionTimingFunction = "ease-in-out";

export const transition = (...attrs: string[]) =>
  attrs
    .map((attr) => `${attr} ${transitionDuration} ${transitionTimingFunction}`)
    .join(", ");
