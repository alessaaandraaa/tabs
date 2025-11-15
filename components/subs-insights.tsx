import { getSubsQuery } from "@/queries/subscriptions.queries";

export default function SubInsights() {
  const { data: fetchedSubs = [], error, isLoading } = getSubsQuery();

  let weekly = 0;
  let monthly = 0;
  let yearly = 0;

  for (const sub of fetchedSubs) {
    console.log("Value:", sub.price, "Actual Runtime Type:", typeof sub.price);
    if (sub.frequency === "weekly") {
      weekly += +sub.price;
      monthly = monthly + +sub.price * 4;
      yearly += +sub.price * 52;
    } else if (sub.frequency === "monthly") {
      monthly = monthly + +sub.price;
      yearly += +sub.price * 12;
    } else if (sub.frequency === "yearly") {
      yearly += +sub.price;
    } else {
      monthly += +sub.price;
    }
  }
  return (
    <div>
      <h1>
        <b>Average Weekly Payments: </b> {weekly}
      </h1>
      <h1>
        <b>Average Monthly Payments: </b> {monthly}
      </h1>
      <h1>
        <b>Average Yearly Payments: </b>
        {yearly}
      </h1>
    </div>
  );
}
