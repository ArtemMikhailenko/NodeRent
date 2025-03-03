import { tv } from "tailwind-variants";

const input = tv({
  base: "rounded-lg bg-midnight-800 border-midnight-950 border focus:border-blue-500 focus:outline-0 invalid:text-red-500 invalid:border-red-500",
  variants: {
    size: {
      s: "min-h-8 max-w-12 px-2",
      m: "min-h-12 px-4",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "m",
  },
});

export const Input = ({ label, size, ...rest }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-medium text-left" htmlFor={label}>
          {label}
        </label>
      )}
      <input className={input({ size })} {...rest} id={label} name={label} />
    </div>
  );
};
