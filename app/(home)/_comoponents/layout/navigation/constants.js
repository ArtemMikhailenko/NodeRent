export const ROUTES = {
  home: {
    icon: (
      <span>
        <img
          src="/navigation/new-order.svg"
          className="basic-icon"
          alt="new order"
        />

        <img
          src="/navigation/new-order-active.svg"
          className="hover-icon"
          alt="new-order-active"
        />
      </span>
    ),
    title: "New order",
    href: "/",
  },
  cart: {
    icon: (
      <span>
        <img src="/navigation/cart.svg" className="basic-icon" alt="cart" />

        <img
          src="/navigation/cart-active.svg"
          className="hover-icon"
          alt="cart active"
        />
      </span>
    ),
    title: "Cart",
    href: "/cart",
    guarded: true,
  },
  orderHistory: {
    icon: (
      <span>
        <img
          src="/navigation/order-history.svg"
          className="basic-icon"
          alt="order history"
        />

        <img
          src="/navigation/order-history-active.svg"
          className="hover-icon"
          alt="order history active"
        />
      </span>
    ),
    title: "Order history",
    href: "/active-nodes",
    guarded: true,
  },
  dashboard: {
    icon: (
      <span>
        <img
          src="/navigation/dashboard.svg"
          className="basic-icon"
          alt="dashboard"
        />

        <img
          src="/navigation/dashboard-active.svg"
          className="hover-icon"
          alt="dashboard active"
        />
      </span>
    ),
    title: "Dashboard",
    href: "/dashboard",
    guarded: true,
  },
  serviceStatus: {
    icon: (
      <span>
        <img
          src="/navigation/service-status.svg"
          className="basic-icon"
          alt="service status"
        />

        <img
          src="/navigation/service-status-active.svg"
          className="hover-icon"
          alt="service status"
        />
      </span>
    ),
    title: "Service status",
    href: "/service-status",
  },
  faqSupport: {
    icon: (
      <span>
        <img
          src="/navigation/faq-support.svg"
          className="basic-icon"
          alt="faq and support"
        />

        <img
          src="/navigation/faq-support-active.svg"
          className="hover-icon"
          alt="faq and support"
        />
      </span>
    ),
    title: "FAQ / Support",
    href: "/faq",
  },
};

export const USER_ROUTES = {
  login: {
    icon: "",
    title: "Login",
    href: "/log-in",
  },
  logout: {
    icon: "",
    title: "Logout",
    href: "/log-out",
  },
};
