"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { FormPayload } from "@/types/form.types";
import axios from "axios";

type Subs = {
  subscription_id: number;
  name: string;
  type: string;
  source: string;
  frequency: string;
  price: number;
  renewal_date: Date;
};

const STALE_TIME = 1000 * 60 * 5;

export const getSubsQuery = () =>
  useQuery<Subs[]>({
    queryKey: ["subs"],
    queryFn: async () => {
      const response = await axios.get("/api/subscriptions");
      console.log("RESPONSE: ", response);
      return response.data.subs;
    },
    staleTime: STALE_TIME,
  });

export const useAddSubsQuery = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FormPayload, { prevSubs?: any[] }>({
    mutationFn: async (data) => {
      const response = await axios.post(`/api/subscriptions`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subs"] });
    },
    onMutate: async (s) => {
      await queryClient.cancelQueries({ queryKey: ["subs"] });
      const prevSubs = queryClient.getQueryData<any[]>(["subs"]);
      if (prevSubs) {
        queryClient.setQueryData(["subs"], [...prevSubs, s]);
      }

      return { prevSubs };
    },
    onError: (err, s, context: any) => {
      if (context?.prevSubs) {
        queryClient.setQueryData(["subs"], context.prevSubs);
      }
    },
  });
};

export const useDeleteSubsQuery = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { sub_id: number }>({
    mutationFn: async ({ sub_id }) => {
      const { data } = await axios.delete(`/api/subscriptions`, {
        data: { sub_id },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subs"] });
    },
    onError: (error) => {
      console.error("Error deleting subscription:", error);
    },
  });
};
