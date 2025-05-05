import { Button } from "../button/button";
import { useCard } from "./hooks";

export const Card = (props) => {
  const {
    id,
    name,
    imgSrc,
    instalationPrice,
    price,
    onMoreInfoClick,
    onAddToCartClick,
    isAddedToCart = false,
    status,
  } = props;

  const { handleAddToCart, handleMoreInfoClick } = useCard({
    id,
    onAddToCartClick,
    onMoreInfoClick,
  });

  return (
    <div className="flex flex-col p-2 items-center gap-2 border-4 border-transparent rounded-lg bg-midnight-900 hover:border-blue-400 hover:rotate-1 hover:-translate-y-1 hover:shadow-blue-400 hover:shadow-[0px_0px_20px]">
      <span className="font-semibold text-lg my-3">{name}</span>
      <img
        src={imgSrc}
        alt={name}
        className="w-36 object-fill mb-4 rounded-full"
      />
      <span className="text-sm">
        <span className="text-gray-300">Installation price: </span>
        {`$${instalationPrice}`}
      </span>
      <span className="text-sm">
        <span className="text-gray-300">Monthly: </span>
        {`$${price}`}
      </span>
      {status === "awaiting" ? (
        <Button variant="highlightedGhost" height="l" disabled>
          Awaiting
        </Button>
      ) : (
        <>
          {status === "ended" ? (
            <Button variant="highlightedGhost" height="l" disabled>
              Sold out
            </Button>
          ) : (
            <Button
              variant="highlightedGhost"
              height="l"
              onClick={isAddedToCart ? undefined : handleAddToCart}
              disabled={isAddedToCart}
            >
              {isAddedToCart ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                  className="m-auto"
                >
                  <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                </svg>
              ) : (
                <img
                  className="m-auto"
                  src="/navigation/cart.svg"
                  alt="Add to cart"
                />
              )}
            </Button>
          )}
          <Button variant="link" onClick={handleMoreInfoClick}>
            more info
          </Button>
        </>
      )}
    </div>
  );
};
