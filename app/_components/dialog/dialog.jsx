import * as DialogPrimitiv from "@radix-ui/react-dialog";
import { useCallback } from "react";

export const Dialog = ({ title, open, setOpen, children }) => {
  const closeDialog = useCallback(() => setOpen(false), []);
  return (
    <DialogPrimitiv.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitiv.Portal>
        <DialogPrimitiv.Overlay className="fixed inset bg-black/75 w-screen h-screen top-0" />
        <DialogPrimitiv.Content className="fixed w-3/4 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-midnight-900 border-2 border-blue-400 rounded-lg p-4 max-h-[90vh] overflow-scroll lg:w-1/2">
          <DialogPrimitiv.DialogTitle className="flex justify-center">
            {title}
          </DialogPrimitiv.DialogTitle>
          <button className="absolute right-4 top-4" onClick={closeDialog}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
          {children}
        </DialogPrimitiv.Content>
      </DialogPrimitiv.Portal>
    </DialogPrimitiv.Root>
  );
};
