"use client";

import BlogTable from "@/components/sites/dashboard/sites/blogs";
import MediaBaseTable from "@/components/sites/dashboard/sites/media-files";
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
import HomeSlideTable from "@/components/sites/dashboard/sites/media-files/home-slides";

export default function Page() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue={"item-1"} className="w-full">
        <TabsList>
          <TabsTrigger value="item-1">OverAll</TabsTrigger>
          <TabsTrigger value="item-2">Home Slides</TabsTrigger>
        </TabsList>
        <TabsContent value="item-1">
          <MediaBaseTable />
        </TabsContent>
        <TabsContent value="item-2">
          <HomeSlideTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
