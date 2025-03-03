import { TableRow } from "./_components/table-row/table-row";

export const Table = ({ data, update, remove }) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="border border-midnight-900 rounded-lg overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="h-14 border-b border-midnight-900">
                <th className="px-4">Name</th>
                <th className="px-4">Per month</th>
                <th className="px-4">Installation price</th>
                <th className="px-4">Quantity</th>
                <th className="px-4">Duration (months)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, id) => (
                <TableRow
                  key={id}
                  item={item}
                  update={update}
                  remove={remove}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <span className="text-center mt-10 text-xl font-semibold">
          Your cart is empty
        </span>
      )}
    </>
  );
};
