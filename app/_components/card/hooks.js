import { useCallback } from "react";

export const useCard = ({ id, onAddToCartClick, onMoreInfoClick }) => {
  const handleAddToCart = useCallback(
    () => onAddToCartClick(id),
    [id, onAddToCartClick],
  );

  const handleMoreInfoClick = useCallback(
    () => onMoreInfoClick(id),
    [id, onMoreInfoClick],
  );

  return { handleAddToCart, handleMoreInfoClick };
};
