import { TableRow } from "./_components/table-row/table-row";

export const Table = ({ data, prolongate }) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="border border-midnight-900 rounded-lg overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="h-14 border-b border-midnight-900">
                <th className="px-4">ID</th>
                <th className="px-4">Status</th>
                <th className="px-4">Node name</th>
                <th className="px-4">Project Status</th>
                <th className="px-4">Created</th>
                <th className="px-4">Active until</th>
                <th className="px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, id) => (
                <TableRow key={id} item={item} prolongate={prolongate} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <span className="text-center mt-10 text-xl font-semibold">
          Nothing to show, after buying nodes you will see them here
        </span>
      )}
    </>
  );
};
