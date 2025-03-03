import { useTableRow } from "./hooks";

import { Input } from "../../../../../../_components/input/input";

export const TableRow = ({ item, update, remove }) => {
  const {
    handleRemoveFromCart,
    duration,
    quantity,
    onChangeQuantity,
    onChangeDuration,
  } = useTableRow({
    id: item.id,
    initialQuantity: item.quantity,
    initialDuration: item.duration,
    update,
    remove,
  });
  return (
    <tr className="h-14 border-b border-midnight-900">
      <td className="px-4">{item.name}</td>
      <td className="px-4">${item.monthly}</td>
      <td className="px-4">${item.installation_price}</td>
      <td className="px-4">
        <Input
          size="s"
          value={quantity}
          type="number"
          onChange={onChangeQuantity}
        />
      </td>
      <td className="px-4">
        <Input
          size="s"
          value={duration}
          type="number"
          onChange={onChangeDuration}
        />
      </td>
      <td className="px-4">
        <button
          className="border border-midnight-950 p-2 rounded-lg"
          onClick={handleRemoveFromCart}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </button>
      </td>
    </tr>
  );
};
