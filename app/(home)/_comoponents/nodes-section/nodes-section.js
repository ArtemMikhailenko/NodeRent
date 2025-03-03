import { Card } from "../../../_components/card/card";

export const NodesSection = ({ nodes, status, cartIds, ...rest }) => {
  return (
    <>
      <h3 className="flex justify-center mt-6 font-semibold text-2xl">
        {`${status.slice(0, 1).toUpperCase()}${status.slice(1, status.length)}`}
      </h3>
      <div className="grid grid-cols-2 gap-3 mt-6 md:grid-cols-3 xl:grid-cols-4">
        {nodes[status]
          ? nodes[status].map((item) => (
              <Card
                key={item.id}
                id={item.id}
                imgSrc={item.icon}
                name={item.name}
                instalationPrice={item.installation_price}
                price={item.monthly}
                isAddedToCart={cartIds.includes(item.id)}
                {...rest}
              />
            ))
          : null}
      </div>
    </>
  );
};
