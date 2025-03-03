import * as DialogPrimitiv from "@radix-ui/react-dialog";
import { ROUTES, USER_ROUTES } from "../../constants";
import { useState } from "react";
import { Button } from "../../../button/button";

export const MobileNavigation = ({
  routes,
  currentPage,
  isLoggedIn,
  logout,
  goToLogin,
  cartCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => setIsOpen((val) => !val);
  return (
    <div className="fixed w-screen bg-midnight-800 z-10 sm:hidden">
      <div className="flex justify-between px-4 py-3 border-b border-midnight-950">
        <button onClick={toggleNavbar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M9 3v18"></path>
          </svg>
        </button>
        {isLoggedIn ? (
          <a href={ROUTES.cart.href} className="py-2 px-2 flex">
            {ROUTES.cart.icon}{" "}
            <span className="ml-1 text-blue-600">{cartCount}</span>
          </a>
        ) : (
          <a href={USER_ROUTES.login.href} className="py-2 px-2 flex">
            <span className="mr-2">login</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
            </svg>
          </a>
        )}
      </div>

      <DialogPrimitiv.Root open={isOpen} onOpenChange={setIsOpen}>
        <DialogPrimitiv.Portal>
          <DialogPrimitiv.Overlay className="fixed inset bg-black/75 w-screen h-screen top-0" />
          <DialogPrimitiv.Content className="h-full w-2/3 fixed left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-midnight-900 p-4 rounded-r rounded-b z-20">
            <DialogPrimitiv.Title></DialogPrimitiv.Title>
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex gap-2 items-center">
                  <img className="w-10 h-10" src="/icon.png" alt="logo" />
                  <span className="font-semibold text-lg">NODERENT.PRO</span>
                </div>
                <div className="flex flex-col mt-2">
                  <nav className="flex flex-col">
                    {routes.map((item, index) => (
                      <a
                        className={`py-2 ${currentPage && currentPage === item.href ? "text-blue-400 bg-midnight-800 rounded" : "text-white"} px-2`}
                        href={item.href}
                        key={index}
                      >
                        <div className="inline-flex gap-1 items-center h-full">
                          {item.icon}
                          {item.title}
                          {item.title === ROUTES.cart.title && (
                            <span className="text-white bg-red-500 rounded-full px-1 py-0.5 text-sm w-6 h-6 text-center">
                              2
                            </span>
                          )}
                        </div>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>

              <Button onClick={isLoggedIn ? logout : goToLogin} size="xl">
                {isLoggedIn ? "Logout" : "Login"}
              </Button>
            </div>
          </DialogPrimitiv.Content>
        </DialogPrimitiv.Portal>
      </DialogPrimitiv.Root>
    </div>
  );
};
