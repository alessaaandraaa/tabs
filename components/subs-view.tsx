import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubsListMain from "@/components/sub-list";
import SubsSummary from "@/components/subs-summary";
import CalendarView from "./calendar-view";

export default function SubsView() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="summary">
        <TabsList>
          <TabsTrigger value="summary">Summary View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <SubsSummary />
        </TabsContent>
        <TabsContent value="list">
          <SubsListMain />
        </TabsContent>
        <TabsContent value="calendar">
          <CalendarView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
