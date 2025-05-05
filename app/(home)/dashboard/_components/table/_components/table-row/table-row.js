import { Button } from "../../../../../../_components/button/button";

export const TableRow = ({ item, prolongate }) => {
  return (
    <tr className="h-14 border-b border-midnight-900">
      <td className="px-4">{item.id}</td>
      <td className={`px-4 ${item.status ? "text-green-400" : "text-red-400"}`}>
        {item.status ? "Active" : "Ended"}
      </td>
      <td className="px-4">{item.node_name}</td>
      <td
        className={`px-4 ${item["Project Status"] === "Active" ? "text-green-400" : "text-red-400"}`}
      >
        {item["Project Status"]}
      </td>
      <td className="px-4">{item["Created"]}</td>
      <td className="px-4">{item["Active Until"]}</td>
      <td className="px-4">
        <Button size="xl">Prolongate</Button>
      </td>
    </tr>
  );
};
