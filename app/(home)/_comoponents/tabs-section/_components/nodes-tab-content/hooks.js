import { useMemo } from "react";

export const useNodesTabContent = ({ nodes, status }) => {
  const data = useMemo(() => (status ? nodes[status] : nodes), [nodes, status]);

  const complexData = useMemo(
    () => ({ headers: Object.keys(nodes), values: Object.values(nodes) }),
    [nodes],
  );

  const nodesStatus = useMemo(
    () =>
      status === undefined
        ? Object.entries(nodes)
            .map((item) => item[1].map((el) => ({ [el.id]: item[0] })))
            .reduce(
              (acc, curr) => [
                ...acc,
                curr.reduce(
                  (acc1, curr1) => ({
                    ...acc1,
                    [Object.keys(curr1)[0]]: Object.values(curr1)[0],
                  }),
                  {},
                ),
              ],
              [],
            )
            .reduce((acc, curr) => ({ ...acc, ...curr }), {})
        : undefined,
    [nodes, status],
  );

  return { data, complexData, nodesStatus };
};
