import { AppWindowIcon, CodeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubsList from "@/components/sub-list";
import SubsSummary from "@/components/subs-summary";

export default function SubsView() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="summary">
        <TabsList>
          <TabsTrigger value="summary">Summary View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <SubsSummary />
        </TabsContent>
        <TabsContent value="list">
          <SubsList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
