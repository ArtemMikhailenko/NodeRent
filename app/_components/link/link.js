export const Link = ({ children, ...rest }) => {
  return (
    <a
      className="text-blue-500 active:text-blue-300 hover:text-blue-400 cursor-pointer"
      {...rest}
    >
      {children}
    </a>
  );
};
