"use client";

import { Accordion } from "../../_components/accordion/accordion";
import { FAQ_DATA } from "./constants";

export default function Faq() {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold flex justify-center m-4">Faq</h2>

      <Accordion data={FAQ_DATA} />
    </div>
  );
}
