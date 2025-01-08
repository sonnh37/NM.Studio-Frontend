import { columns } from "./columns";

import { isDeleted_options } from "@/components/_common/filters";

import { DataTable } from "@/components/_common/data-table-generic/data-table";
import { FilterEnum } from "@/types/filter-enum";
import { albumService } from "@/services/album-service";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import DataTablePhotos from "@/components/dashboard/sites/albums/photos";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { FormFilterAdvanced } from "@/types/form-filter-advanced";

export default function DataTableAlbums() {
  const filterEnums: FilterEnum[] = [
    { columnId: "isDeleted", title: "Is deleted", options: isDeleted_options },
  ];
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q");
  const tabsRef = useRef<HTMLDivElement>(null);

  const { data: album, isLoading } = useQuery({
    queryKey: ["album", queryParam?.toLowerCase()], // Cache theo queryParam
    queryFn: async () => {
      const response = await albumService.fetchById(queryParam as string);
      return response.data;
    }, 
    refetchOnWindowFocus: false
  });


  return (
    <Tabs defaultValue="item-1">
      <TabsList>
        <TabsTrigger value="item-1">Albums</TabsTrigger>
        <TabsTrigger value="item-2">Photos</TabsTrigger>
      </TabsList>
      <TabsContent value="item-1">
        <DataTable
          deleteAll={albumService.delete}
          deletePermanent={albumService.deletePermanent}
          restore={albumService.restore}
          columns={columns}
          fetchData={albumService.fetchAll}
          columnSearch="name"
          filterEnums={filterEnums}
          formSchema={formFilterAdvancedSchema}
          formFilterAdvanceds={formFilterAdvanceds}
        />
      </TabsContent>
      <TabsContent value="item-2">
        {isLoading || !album ? (
          <></>
        ) : (
          <Tabs ref={tabsRef} defaultValue="selected" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="selected">Selected</TabsTrigger>
              <TabsTrigger value="available">Available</TabsTrigger>
            </TabsList>

            <TabsContent value="selected">
              <Card className="p-4">
                <DataTablePhotos
                  albumId={album.id}
                  albumXPhotos={album.albumXPhotos ?? []}
                  tab={0}
                />
              </Card>
            </TabsContent>
            <TabsContent value="available">
              <Card className="p-4">
                <DataTablePhotos
                  albumId={album.id}
                  albumXPhotos={album.albumXPhotos ?? []}
                  tab={1}
                />
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </TabsContent>
    </Tabs>
  );
}

const formFilterAdvancedSchema = z.object({
  id: z.string().nullable().optional(),
  date: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .refine((date) => !!date.to, { message: "End Date is required." })
    .optional(),
  isDeleted: z.boolean().nullable().optional(),
});

const formFilterAdvanceds: FormFilterAdvanced[] = [
  {
    name: "date",
    label: "Date",
    defaultValue: {
      from: undefined,
      to: undefined,
    },
    render: ({ field }: { field: any }) => (
      <FormItem className="flex flex-col">
        <FormLabel>Date</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !field.value?.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value?.from ? (
                field.value?.to ? (
                  <>
                    {format(field.value.from, "LLL dd, y")} -{" "}
                    {format(field.value.to, "LLL dd, y")}
                  </>
                ) : (
                  format(field.value.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={field.value?.from}
              selected={{
                from: field.value?.from!,
                to: field.value?.to,
              }}
              onSelect={field.onChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <FormDescription>
          The date you want to add a comment for.
        </FormDescription>
        <FormMessage />
      </FormItem>
    ),
  },
  {
    name: "name",
    label: "Name",
    defaultValue: "",
    render: ({ field }: { field: any }) => (
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input placeholder="Product name..." {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    ),
  },
];
