import { useCallback, useEffect, useState } from "react";
import { useCartMethods } from "../hooks/use-cart-methods";
import { getCart, updateCartWithNodesData } from "../hooks/helpers";
import { useDebounce } from "../hooks/use-debounce";

export const useCart = () => {
  const [cartData, setCartData] = useState([]);
  const [activeNodes, setActiveNodes] = useState([]);
  const [isPromocodeValid, setIsPromocodeValid] = useState(true);
  const [promocode, setPromocode] = useState("");
  const [validPromocode, setValidPromocode] = useState("");
  const [cartTotal, setCartTotal] = useState(0);

  const cartToCalculate = useDebounce(cartData);

  const { updateCart, removeFromCart, verifyCart } = useCartMethods();

  const handlePromocodeChange = useCallback(
    (event) => setPromocode(event.target.value),
    [],
  );

  const getCheckoutLink = useCallback(async (cart, promocode) => {
    const response = await (
      await fetch("https://api.noderent.pro/cart/checkout", {
        method: "POST",
        body: JSON.stringify({
          items: cart.map((item) => ({
            id: item.id,
            qt: item.quantity,
            duration_month: item.duration,
          })),
          promocode,
        }),
        credentials: "include",
      })
    ).json();

    if (response.status === "success") {
      window.location.href = response.payment_link;
    } else {
      alert("Something went wrong, try again later");
    }
  }, []);

  const checkout = useCallback(() => {
    if (cartToCalculate) {
      getCheckoutLink(cartToCalculate, validPromocode);
    }
  }, [cartToCalculate, validPromocode]);

  const getNodes = useCallback(async () => {
    const response = await (
      await fetch("https://api.noderent.pro/nodes", {
        method: "GET",
        credentials: "include",
      })
    ).json();

    if (response.status === "success") {
      setActiveNodes(Object.values(response.active));
    }
  }, []);

  const getCartTotal = useCallback(async (cart, promocode) => {
    const response = await (
      await fetch("https://api.noderent.pro/cart/calculateTotal", {
        method: "POST",
        body: JSON.stringify({
          items: cart.map((item) => ({
            id: item.id,
            qt: item.quantity,
            duration_month: item.duration,
          })),
          promocode,
        }),
        credentials: "include",
      })
    ).json();

    if (response.status === "success") {
      setCartTotal(response.cart_total);
    }
  }, []);

  const removePromocode = useCallback(() => {
    setPromocode("");
    setValidPromocode("");
  }, []);

  const checkPromocode = useCallback(async () => {
    const response = await (
      await fetch("https://api.noderent.pro/promocode", {
        method: "POST",
        body: JSON.stringify({
          promocode,
        }),
        credentials: "include",
      })
    ).json();

    if (response.status === "success") {
      setIsPromocodeValid(true);
      setValidPromocode(promocode);
    } else {
      setIsPromocodeValid(false);
    }
  }, [promocode, cartData]);

  const handleRemoveFromCart = useCallback(
    (args) => {
      let newCart = removeFromCart(args);

      newCart = updateCartWithNodesData(newCart, activeNodes);

      setCartData(newCart);
    },
    [removeFromCart, activeNodes],
  );

  const handleUpdateCart = useCallback(
    (...args) => {
      let newCart = updateCart(...args);

      newCart = updateCartWithNodesData(newCart, activeNodes);

      setCartData(newCart);
    },
    [updateCart, activeNodes],
  );

  useEffect(() => {
    getNodes();
    setCartData(getCart());
  }, []);

  useEffect(() => {
    if (cartToCalculate) {
      getCartTotal(cartToCalculate, validPromocode);
    }
  }, [cartToCalculate, validPromocode]);

  useEffect(() => {
    if (cartToCalculate && cartToCalculate.length) {
      let newCart = cartToCalculate;

      newCart = updateCartWithNodesData(newCart, activeNodes);

      setCartData(newCart);
    }
  }, [cartToCalculate]);

  useEffect(() => {
    if (!activeNodes.length) {
      return;
    }

    verifyCart(activeNodes);

    let newCart = getCart();
    newCart = updateCartWithNodesData(newCart, activeNodes);

    setCartData(newCart);
  }, [activeNodes, verifyCart]);

  return {
    cartData,
    cartTotal,
    removeFromCart: handleRemoveFromCart,
    updateCart: handleUpdateCart,
    isPromocodeValid,
    promocode,
    handlePromocodeChange,
    removePromocode,
    checkPromocode,
    checkout,
  };
};
