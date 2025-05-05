"use client";

import { TabsSection } from "./_comoponents/tabs-section/tabs-section";
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
      <TabsSection
        nodes={nodes}
        onMoreInfoClick={onMoreInfoClick}
        onAddToCartClick={onAddToCartClick}
        cartIds={cartIds}
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
