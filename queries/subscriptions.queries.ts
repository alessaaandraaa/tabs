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
  free_trial: boolean;
  auto_renew: boolean;
};

const STALE_TIME = 1000 * 60 * 5;

export const getOngoingSubsQuery = () =>
  useQuery<Subs[]>({
    queryKey: ["ongoing_subs"],
    queryFn: async () => {
      const response = await axios.get("/api/subscriptions?status=ongoing");
      console.log("RESPONSE: ", response);
      return response.data.subs;
    },
    staleTime: STALE_TIME,
  });

export const getExpiredSubsQuery = () =>
  useQuery<Subs[]>({
    queryKey: ["expired_subs"],
    queryFn: async () => {
      const response = await axios.get("/api/subscriptions?status=expired");
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
      queryClient.invalidateQueries({ queryKey: ["ongoing_subs"] });
    },
    onMutate: async (s) => {
      await queryClient.cancelQueries({ queryKey: ["ongoing_subs"] });
      const prevSubs = queryClient.getQueryData<any[]>(["ongoing_subs"]);
      if (prevSubs) {
        queryClient.setQueryData(["ongoing_subs"], [...prevSubs, s]);
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
      queryClient.invalidateQueries({ queryKey: ["ongoing_subs"] });
      queryClient.invalidateQueries({ queryKey: ["expired_subs"] });
    },
    onError: (error) => {
      console.error("Error deleting subscription:", error);
    },
  });
};
