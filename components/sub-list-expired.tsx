"use client";
import { getExpiredSubsQuery } from "@/queries/subscriptions.queries";
import { columns } from "@/components/subs-table/sub-list-cols";
import { Subscriptions } from "@/types/subs.types";
import { SubsList } from "./subs-table/sub-list-table";

export default function SubListExpired() {
  const { data: fetchedSubs = [], error, isLoading } = getExpiredSubsQuery();

  return <SubsList columns={columns} data={fetchedSubs} />;
}
