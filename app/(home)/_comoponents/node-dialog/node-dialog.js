import { Button } from "../../../_components/button/button";
import { Dialog } from "../../../_components/dialog/dialog";
import { Link } from "../../../_components/link/link";

export const NodeDialog = ({
  open,
  setOpen,
  activeNodeInfo,
  canAddToCartDialog,
  handleDialogAddToCartClick,
}) => {
  return (
    <Dialog title={activeNodeInfo?.name} open={open} setOpen={setOpen}>
      <div className="w-full">
        <div className="w-full flex flex-col justify-between mt-3 p-4 sm:flex-row sm:items-center sm:justify-evenly">
          <div className="flex flex-col gap-3">
            <img
              src={activeNodeInfo?.icon}
              className="w-36 object-fill mb-4 rounded-full"
              alt={activeNodeInfo?.name}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={
                canAddToCartDialog ? handleDialogAddToCartClick : undefined
              }
              disabled={!canAddToCartDialog}
            >
              {canAddToCartDialog ? "Add to cart" : "Sold out"}
            </Button>

            <div className="flex gap-3">
              <div className="flex flex-col">
                <span>Instalation price:</span>
                <span>Monthly:</span>
              </div>

              <div className="flex flex-col">
                <span>{`$${activeNodeInfo?.installation_price}`}</span>
                <span>{`$${activeNodeInfo?.monthly}`}</span>
              </div>
            </div>
          </div>
        </div>

        <span>
          Description:{" "}
          <div
            dangerouslySetInnerHTML={{ __html: activeNodeInfo?.description }}
          />
        </span>
        <div>
          website:{" "}
          <Link href={activeNodeInfo?.website} target="_blank">
            {activeNodeInfo?.website}
          </Link>
        </div>
        <div>
          github:{" "}
          <Link href={activeNodeInfo?.github} target="_blank">
            {activeNodeInfo?.github}
          </Link>
        </div>
        <div>
          twitter:{" "}
          <Link href={activeNodeInfo?.twitter} target="_blank">
            {activeNodeInfo?.twitter}
          </Link>
        </div>
        <div>
          discord:{" "}
          <Link href={activeNodeInfo?.discord} target="_blank">
            {activeNodeInfo?.discord}
          </Link>
        </div>
        <div>
          telegram:{" "}
          <Link href={activeNodeInfo?.telegram} target="_blank">
            {activeNodeInfo?.telegram}
          </Link>
        </div>
        <div>chain name: {activeNodeInfo?.chain_name}</div>
        <div>
          funds:{" "}
          <div
            dangerouslySetInnerHTML={{
              __html: activeNodeInfo?.description_of_funding,
            }}
          />
        </div>
      </div>
    </Dialog>
  );
};
