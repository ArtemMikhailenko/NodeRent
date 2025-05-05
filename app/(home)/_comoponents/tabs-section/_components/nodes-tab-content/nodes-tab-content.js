import { randomUUID } from "crypto";
import { Card } from "../../../../../_components/card/card";
import { useNodesTabContent } from "./hooks";

export const NodesTabContent = ({
  header,
  nodes,
  status,
  cartIds,
  ...rest
}) => {
  const { data, complexData, nodesStatus } = useNodesTabContent({
    nodes,
    status,
  });
  return (
    <>
      {status ? (
        <div className="grid grid-cols-2 gap-3 mt-6 max-[340px]:grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
          {data.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              imgSrc={item.icon}
              name={item.name}
              instalationPrice={item.installation_price}
              price={item.monthly}
              isAddedToCart={cartIds.includes(item.id)}
              status={status || nodesStatus[item.id]}
              {...rest}
            />
          ))}
        </div>
      ) : (
        <div>
          {complexData.values.map((complexItem, index) => (
            <div key={index}>
              <h3 className="flex justify-center pt-6 font-semibold text-2xl">
                {`${complexData.headers[index].slice(0, 1).toUpperCase()}${complexData.headers[index].slice(1, complexData.headers[index].length)}`}
              </h3>
              <div className="grid grid-cols-2 gap-3 mt-6 max-[340px]:grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
                {complexItem.map((item) => (
                  <Card
                    key={item.id}
                    id={item.id}
                    imgSrc={item.icon}
                    name={item.name}
                    instalationPrice={item.installation_price}
                    price={item.monthly}
                    isAddedToCart={cartIds.includes(item.id)}
                    status={status || nodesStatus[item.id]}
                    {...rest}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
