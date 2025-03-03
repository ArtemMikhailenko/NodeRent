import { tv } from "tailwind-variants";

const button = tv({
  base: "font-medium text-center",
  variants: {
    color: {
      primary:
        "rounded-lg bg-blue-600 active:bg-white active:text-black disabled:bg-blue-900 disabled:text-gray-500",
      link: "text-blue-500 active:text-blue-300 hover:text-blue-400",
      google: "rounded-lg bg-white text-black",
    },
    size: {
      m: "px-4 py-1 w-40 max-w-full",
      l: "px-4 py-1 w-60",
      xl: "px-4 py-2 w-full",
    },
    positon: {
      center: "self-center",
      right: "self-end",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "m",
  },
});

export const Button = ({ children, variant, size, positon, ...rest }) => {
  return (
    <button className={button({ color: variant, size, positon })} {...rest}>
      {children}
    </button>
  );
};
