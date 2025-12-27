export type Subscriptions = {
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
