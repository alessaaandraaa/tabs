import { getOngoingSubsQuery } from "@/queries/subscriptions.queries";
import { formatToPHP } from "@/lib/helpers";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function oneWeek() {
  const week = 604800000;
  let price = 0;

  const { data: fetchedSubs = [], error, isLoading } = getOngoingSubsQuery();
  const now = new Date();

  const oneWeek = fetchedSubs.filter((s) => {
    // 1. Convert Date objects to milliseconds using .getTime()
    const renewalTime = new Date(s.renewal_date).getTime();
    const nowTime = now.getTime();

    // 2. Perform the subtraction to get the difference in milliseconds
    const difference = renewalTime - nowTime;

    // 3. Filter: Keep the subscription if the difference is greater than 'week'
    return difference < week && difference > 0;
  });

  console.log("ONE WEEK LEFT SUBSCRIPTIONS: ", oneWeek);

  return (
    <div className="pt-2 pb-2">
      <h1 className="font-bold text-red-900 text-xl">Within the Week</h1>
      <Card className="p-3">
        <CardContent>
          {oneWeek.map((s) => {
            const renewalTime = new Date(s.renewal_date).getTime();
            const nowTime = now.getTime();
            const difference = renewalTime - nowTime;
            price += Number(s.price);

            const daysLeft = Math.ceil(difference / 86400000);
            return (
              <div key={s.subscription_id}>
                <p>
                  <b>{s.name}</b>: {daysLeft} days left
                </p>
              </div>
            );
          })}
          <hr className="border" />
          <p>
            <b>Expected Payment</b>: {formatToPHP(price)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
