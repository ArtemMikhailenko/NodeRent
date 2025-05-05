import { tv } from "tailwind-variants";

const button = tv({
  base: "font-medium text-center",
  variants: {
    color: {
      primary:
        "rounded-lg bg-blue-600 active:bg-white active:text-black enabled:hover:bg-blue-500 disabled:bg-blue-900 disabled:text-gray-500",
      link: "text-blue-500 active:text-blue-300 hover:text-blue-400",
      google: "rounded-lg bg-white text-black",
      ghost: "rounded-lg border border-midnight-950 hover:border-blue-400",
      highlightedGhost:
        "rounded-3xl border border-gray-400 enabled:hover:border-blue-400 disabled:text-gray-400 disabled:border-gray-600",
    },
    size: {
      unset: "px-4",
      m: "px-4 w-40 max-w-full",
      l: "px-4 w-60",
      xl: "px-4 w-full",
    },
    height: {
      m: "py-1",
      l: "py-2.5",
    },
    positon: {
      center: "self-center",
      right: "self-end",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "m",
    height: "m",
  },
});

export const Button = ({
  children,
  variant,
  size,
  height,
  positon,
  ...rest
}) => {
  return (
    <button
      className={button({ color: variant, size, height, positon })}
      {...rest}
    >
      {children}
    </button>
  );
};
