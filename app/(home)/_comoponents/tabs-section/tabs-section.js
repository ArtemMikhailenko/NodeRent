import { useMemo } from "react";
import { Tabs } from "../../../_components/tabs/tabs";
import { NodesTabContent } from "./_components/nodes-tab-content/nodes-tab-content";

export const TabsSection = ({
  nodes,
  onMoreInfoClick,
  onAddToCartClick,
  cartIds,
}) => {
  const data = useMemo(
    () => [
      {
        header: "All",
        content: (
          <NodesTabContent
            nodes={nodes}
            onMoreInfoClick={onMoreInfoClick}
            onAddToCartClick={onAddToCartClick}
            cartIds={cartIds}
          />
        ),
      },
      {
        header: "Deploy a node",
        content: (
          <NodesTabContent
            nodes={nodes}
            status="active"
            onMoreInfoClick={onMoreInfoClick}
            onAddToCartClick={onAddToCartClick}
            cartIds={cartIds}
          />
        ),
      },
      {
        header: "Awaiting nodes",
        content: (
          <NodesTabContent
            nodes={nodes}
            status="awaiting"
            onMoreInfoClick={onMoreInfoClick}
            cartIds={cartIds}
          />
        ),
      },
      {
        header: "Ended nodes",
        content: (
          <NodesTabContent
            nodes={nodes}
            status="ended"
            onMoreInfoClick={onMoreInfoClick}
            cartIds={cartIds}
          />
        ),
      },
    ],
    [nodes, onMoreInfoClick, onAddToCartClick, cartIds],
  );

  return <Tabs data={data} />;
};
