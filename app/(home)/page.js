"use client";

import { NodesSection } from "./_comoponents/nodes-section/nodes-section";
import { NodeDialog } from "./_comoponents/node-dialog/node-dialog";

import { useHome } from "./hooks";

export default function Home() {
  const {
    cartIds,
    open,
    setOpen,
    nodes,
    activeNodeInfo,
    canAddToCartDialog,
    handleDialogAddToCartClick,
    onMoreInfoClick,
    onAddToCartClick,
  } = useHome();
  return (
    <div>
      <NodesSection
        nodes={nodes}
        status="active"
        onMoreInfoClick={onMoreInfoClick}
        onAddToCartClick={onAddToCartClick}
        cartIds={cartIds}
      />

      <NodesSection
        nodes={nodes}
        status="awaiting"
        onMoreInfoClick={onMoreInfoClick}
        cartIds={cartIds}
        awaiting
      />

      <NodesSection
        nodes={nodes}
        status="ended"
        onMoreInfoClick={onMoreInfoClick}
        cartIds={cartIds}
        disabled
      />

      <NodeDialog
        open={open}
        setOpen={setOpen}
        activeNodeInfo={activeNodeInfo}
        canAddToCartDialog={canAddToCartDialog}
        handleDialogAddToCartClick={handleDialogAddToCartClick}
      />
    </div>
  );
}
