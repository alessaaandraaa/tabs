import OneMonth from "./one-month";
import OneWeek from "./one-week";

export default function UpcomingPaymentsTab() {
  return (
    <div className="pl-0">
      <OneWeek />
      <OneMonth />
    </div>
  );
}
