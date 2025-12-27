import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubListActive from "./sub-list-active";
import SubListExpired from "./sub-list-expired";
export default function SubsList() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <SubListActive />
        </TabsContent>
        <TabsContent value="expired">
          <SubListExpired />
        </TabsContent>
      </Tabs>
    </div>
  );
}
