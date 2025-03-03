"use client";

import { Button } from "../../../app/_components/button/button";

import { useCart } from "./hooks";
import { Table } from "./_components/table/table";
import { Input } from "../../_components/input/input";

export default function Cart() {
  const {
    cartData,
    cartTotal,
    updateCart,
    removeFromCart,
    isPromocodeValid,
    promocode,
    handlePromocodeChange,
    removePromocode,
    checkPromocode,
    checkout,
  } = useCart();
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold flex justify-center m-4">Cart</h2>

      <Table data={cartData} update={updateCart} remove={removeFromCart} />

      <div className="flex flex-col items-end gap-2">
        <Input
          value={promocode}
          onChange={handlePromocodeChange}
          label="Promocode"
        />

        {!isPromocodeValid && (
          <span className="text-red-600">promocode invalid</span>
        )}

        <div className="flex gap-2">
          <Button onClick={removePromocode}>Remove</Button>
          <Button onClick={checkPromocode}>Apply</Button>
        </div>
      </div>

      <div className="flex justify-end mt-4">Total: ${cartTotal}</div>

      <Button size="l" positon="right" onClick={checkout}>
        Proceed to checkout
      </Button>
    </div>
  );
}
