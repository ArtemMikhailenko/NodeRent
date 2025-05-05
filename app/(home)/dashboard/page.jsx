"use client";

import { useDashboardPage } from "./hooks";
import { Table } from "./_components/table/table";

export default function Dashboard() {
  const { data } = useDashboardPage();
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold flex justify-center m-4">Dashboard</h2>
      <Table data={data} />
    </div>
  );
}
