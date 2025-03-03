import { ROUTES, USER_ROUTES } from "../../constants";

const user = false;

export const DesktopNavigation = ({
  routes,
  currentPage,
  isLoggedIn,
  logout,
  cartCount,
}) => {
  return (
    <div className="flex flex-col gap-2 max-sm:hidden">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <img className="w-10 h-10" src="/icon.png" alt="logo" />
          <span className="font-semibold text-lg">NODERENT.PRO</span>
        </div>
        {isLoggedIn ? (
          <button onClick={logout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
          </button>
        ) : (
          <a href={USER_ROUTES.login.href} className="flex items-center py-2">
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
      <div>
        <nav className="bg-midnight-900 rounded-lg px-6 flex justify-evenly">
          {routes.map((item, index) => (
            <a
              className={`flex items-center pb-2.5 pt-3 ${currentPage && currentPage === item.href ? "active-link text-blue-400" : "text-white"} after:bg-blue-400`}
              href={item.href}
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
