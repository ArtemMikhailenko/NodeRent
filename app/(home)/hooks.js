import { useCallback, use, useEffect, useState, useMemo } from "react";

import { useCartMethods } from "./hooks/use-cart-methods";

import { AuthContext } from "../_context/auth/auth-provider";
import { getCart } from "./hooks/helpers";

export const useHome = () => {
  const [cartIds, setCartIds] = useState([]);
  const [open, setOpen] = useState(false);
  const [nodes, setNodes] = useState({});
  const [activeNodeId, setActiveNodeId] = useState("");
  const [nodesInfo, setNodesInfo] = useState({});

  const { isLoggedIn } = use(AuthContext);

  const { addToCart, verifyCart } = useCartMethods();

  const activeNodeInfo = useMemo(
    () => nodesInfo[activeNodeId],
    [nodesInfo, activeNodeId],
  );

  const canAddToCartDialog = useMemo(
    () => nodes?.active?.find((item) => item.id === activeNodeId),
    [nodes, activeNodeId],
  );

  // TODO move to api folder
  const getNodes = useCallback(async () => {
    const response = await (
      await fetch("https://api.noderent.pro/nodes", {
        method: "GET",
      })
    ).json();

    if (response.status === "success") {
      const activeNodes = Object.values(response.active);

      setNodes({
        active: activeNodes,
        awaiting: Object.values(response.awaiting),
        ended: Object.values(response.ended),
      });
      verifyCart(activeNodes);
    }
  }, [verifyCart]);

  // TODO move to api folder
  const getNodeInfo = useCallback(async (uuid, callback) => {
    const response = await (
      await fetch(`https://api.noderent.pro/node/${uuid}`, {
        method: "GET",
      })
    ).json();

    if (response.status === "success") {
      setNodesInfo((val) => ({
        ...val,
        [uuid]: response.data,
      }));
      callback();
    }
  }, []);

  const onMoreInfoClick = useCallback(
    (uuid) => {
      if (nodesInfo[uuid]) {
        setOpen(true);
        setActiveNodeId(uuid);
      } else {
        getNodeInfo(uuid, () => {
          setOpen(true);
          setActiveNodeId(uuid);
        });
      }
    },
    [nodesInfo, getNodeInfo],
  );

  const onAddToCartClick = useCallback(
    (id) => {
      if (isLoggedIn) {
        addToCart(id);
      } else {
        window.location.href = "/log-in";
      }
    },
    [addToCart, isLoggedIn],
  );

  const handleDialogAddToCartClick = useCallback(
    () => onAddToCartClick(activeNodeId),
    [onAddToCartClick, activeNodeId],
  );

  useEffect(() => {
    const callback = () => setCartIds(getCart().map((item) => item.id));

    window.addEventListener("storage", callback);

    return () => window.removeEventListener("storage", callback);
  }, []);

  useEffect(() => {
    getNodes();
  }, [getNodes]);

  return {
    cartIds,
    open,
    setOpen,
    nodes,
    activeNodeInfo,
    canAddToCartDialog,
    handleDialogAddToCartClick,
    nodesInfo,
    onMoreInfoClick,
    onAddToCartClick,
  };
};
