import { CART } from "./constants";

export const addToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("storage"));
};

export const getCart = () => JSON.parse(localStorage.getItem(CART) || "[]");

export const updateCartWithNodesData = (newCart, activeNodes) => {
  for (let i = 0; i < newCart.length; i++) {
    const completeNodeData = activeNodes.find(
      (item) => item.id === newCart[i].id,
    );

    newCart[i] = {
      ...newCart[i],
      id: completeNodeData?.id,
      name: completeNodeData?.name,
      monthly: completeNodeData?.monthly,
      installation_price: completeNodeData?.installation_price,
    };
  }

  return newCart;
};
