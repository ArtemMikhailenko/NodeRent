"use client";

import { useCallback } from "react";

import { addToLocalStorage, getCart } from "./helpers";
import { CART } from "./constants";

export const useCartMethods = () => {
  const addToCart = useCallback((id) => {
    let cart = getCart();
    const existingElement = cart.find((item) => item.id === id);

    if (existingElement) {
      cart = [
        ...cart.filter((item) => item.id !== id),
        {
          id,
          quantity: existingElement.quantity + 1,
          duration: 1,
        },
      ];
    } else {
      cart = [...cart, { id, quantity: 1, duration: 1 }];
    }

    addToLocalStorage(CART, cart);
  }, []);

  const updateCart = useCallback((id, quantity, duration) => {
    let cart = getCart();
    const existingElementIndex = cart.findIndex((item) => item.id === id);

    cart[existingElementIndex] = {
      ...cart[existingElementIndex],
      id: cart[existingElementIndex].id,
      quantity: quantity ? quantity : cart[existingElementIndex].quantity,
      duration: duration ? duration : cart[existingElementIndex].duration,
    };

    addToLocalStorage(CART, cart);

    return cart;
  }, []);

  const removeFromCart = useCallback((id) => {
    const cart = getCart();
    const newCart = cart.filter((item) => item.id !== id);

    addToLocalStorage(CART, newCart);

    return newCart;
  }, []);

  const verifyCart = useCallback((activeNodes) => {
    const cart = getCart();

    if (!cart.length || !activeNodes.length) {
      return;
    }

    const newCart = cart.filter(
      (item) => activeNodes.findIndex((node) => node.id === item.id) >= 0,
    );

    addToLocalStorage(CART, newCart);
  }, []);

  return { CART, addToCart, updateCart, removeFromCart, verifyCart };
};
