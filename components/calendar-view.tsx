"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { getOngoingSubsQuery } from "@/queries/subscriptions.queries";
export default function CalendarView() {
  const { data: fetchedSubs = [], error, isLoading } = getOngoingSubsQuery();

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={fetchedSubs.map((s) => {
        return { title: s.name, date: s.renewal_date };
      })}
      dayMaxEvents={true}
    />
  );
}
