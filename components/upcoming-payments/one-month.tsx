import { getOngoingSubsQuery } from "@/queries/subscriptions.queries";

export default function oneWeek() {
  const month = 2628000000;
  const week = 604800000;

  const { data: fetchedSubs = [], error, isLoading } = getOngoingSubsQuery();
  const now = new Date();

  const oneWeek = fetchedSubs.filter((s) => {
    // 1. Convert Date objects to milliseconds using .getTime()
    const renewalTime = new Date(s.renewal_date).getTime();
    const nowTime = now.getTime();

    // 2. Perform the subtraction to get the difference in milliseconds
    const difference = renewalTime - nowTime;

    // 3. Filter: Keep the subscription if the difference is greater than 'week'
    return difference < month && difference > 0 && difference > week;
  });

  return (
    <div>
      <h1 className="text-xl font-bold text-red-900">Within the Month</h1>
      {oneWeek.map((s) => {
        const renewalTime = new Date(s.renewal_date).getTime();
        const nowTime = now.getTime();
        const difference = renewalTime - nowTime;

        const daysLeft = Math.ceil(difference / 86400000);
        return (
          <div key={s.subscription_id}>
            <p>
              <b>{s.name}</b>: {daysLeft} days left
            </p>
          </div>
        );
      })}
    </div>
  );
}
