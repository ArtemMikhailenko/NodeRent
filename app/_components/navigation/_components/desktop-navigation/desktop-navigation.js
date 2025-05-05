import { Button } from "../../../button/button";
import { ROUTES, USER_ROUTES } from "../../constants";

export const DesktopNavigation = ({
  routes,
  currentPage,
  isLoggedIn,
  email,
  logout,
  cartCount,
}) => {
  return (
    <div className="flex flex-col gap-2 max-lg:hidden overflow-hidden">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <img className="w-10 h-10" src="/icon.png" alt="logo" />
          <span className="font-semibold text-lg">NODERENT.PRO</span>
        </div>
        {isLoggedIn ? (
          <div className="flex items-center gap-2">
            <span>{email}</span>
            <Button size="unset" variant="ghost" onClick={logout}>
              <div className="flex gap-1">
                Logout
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                </svg>
              </div>
            </Button>
          </div>
        ) : (
          <a
            href={USER_ROUTES.login.href}
            className="flex items-center py-2 max-h-10"
          >
            <Button size="unset" variant="ghost">
              <div className="flex gap-1">
                Login
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                >
                  <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
                </svg>
              </div>
            </Button>
          </a>
        )}
      </div>
      <div>
        <nav className="bg-midnight-900 rounded-lg px-6 flex justify-evenly">
          {routes.map((item, index) => (
            <a
              className={`link relative h-[100%] flex items-center pb-2.5 pt-3 ${currentPage && currentPage === item.href ? "active-link text-blue-400 hover:text-blue-300" : "text-white"} after:bg-blue-500 after:shadow-blue-500 after:shadow-[0px_0px_3px]`}
              href={isLoggedIn ? item.href : item.guarded ? USER_ROUTES.login.href : item.href}
              key={index}
            >
              <div className="inline-flex gap-1 items-center">
                {item.icon}
                {item.title}
                {item.title === ROUTES.cart.title && (
                  <span className="text-white bg-red-500 rounded-full px-1 py-0.5 text-sm w-6 h-6 text-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};
