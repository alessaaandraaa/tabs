const { prisma } = await import("@/lib/db");
import { EditPayload } from "@/types/form.types";

type Subs = {
  subscription_id: number;
  name: string;
  type: string;
  frequency: string;
  price: number;
  renewal_date: Date;
  auto_renew: boolean;
  free_trial: boolean;
};

const today = new Date();

class SubscriptionsService {
  async getOngoingSubscriptions() {
    try {
      const subs = await prisma.subscriptions.findMany({
        where: {
          user_id: 1,
          renewal_date: {
            gt: today,
          },
        },
      });
      console.log("SUBSCRIPTIONS: ", subs);
      return subs;
    } catch (error) {
      console.error("Error fetching ongoing subscriptions: ", error);
      throw new Error("Could not fetch ongoing subscriptions.");
    }
  }

  async getExpiredSubscriptions() {
    try {
      const subs = await prisma.subscriptions.findMany({
        where: {
          user_id: 1,
          renewal_date: {
            lt: today,
          },
        },
      });
      console.log("SUBSCRIPTIONS: ", subs);
      return subs;
    } catch (error) {
      console.error("Error fetching expired subscriptions: ", error);
      throw new Error("Could not fetch expired subscriptions.");
    }
  }

  async addSubscription({
    name,
    type,
    frequency,
    price,
    renewal_date,
    free_trial,
    auto_renew,
  }: Subs) {
    try {
      const newSub = await prisma.subscriptions.create({
        data: {
          name,
          type,
          frequency,
          price,
          renewal_date: new Date(renewal_date),
          user_id: 1,
          auto_renew,
          free_trial,
        },
      });
      return newSub;
    } catch (error) {
      console.error("Error adding subscription:", error);
      throw new Error(
        "An unexpected error occurred while adding subscription."
      );
    }
  }

  async deleteSubscription(id: number) {
    try {
      const deletedSub = await prisma.subscriptions.delete({
        where: { subscription_id: id },
      });
      return deletedSub;
    } catch (error) {
      console.error("Error deleting subscription.", error);
      throw new Error(
        "An unexpected error occurred while deleting subscription."
      );
    }
  }

  async editSubscription({
    id,
    name,
    type,
    frequency,
    price,
    renewal_date,
    auto_renew,
    free_trial,
  }: EditPayload) {
    try {
      const updatedSub = await prisma.subscriptions.update({
        where: { subscription_id: id },
        data: {
          name,
          type,
          frequency,
          price,
          renewal_date: new Date(renewal_date),
          auto_renew,
          free_trial,
        },
      });
    } catch (error) {
      console.error("Error updating subscription.", error);
      throw new Error(
        "An unexpected error occurred while updating subscription."
      );
    }
  }
}

export default SubscriptionsService;
