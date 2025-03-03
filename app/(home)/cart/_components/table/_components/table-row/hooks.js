import { useCallback, useState } from "react";

export const useTableRow = ({
  id,
  initialQuantity,
  initialDuration,
  update,
  remove,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [duration, setDuration] = useState(initialDuration);

  const handleRemoveFromCart = useCallback(() => remove(id), [remove, id]);
  const onChangeQuantity = useCallback(
    (event) => {
      setQuantity(event.target.value);
      update(id, +event.target.value);
    },
    [update, id],
  );
  const onChangeDuration = useCallback(
    (event) => {
      setDuration(event.target.value);
      update(id, undefined, +event.target.value);
    },
    [update, id],
  );
  return {
    handleRemoveFromCart,
    quantity,
    duration,
    onChangeQuantity,
    onChangeDuration,
  };
};
