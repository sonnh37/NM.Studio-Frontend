import {columns} from "./columns";

import {isDeleted_options} from "@/components/common/filters";

import {DataTable} from "@/components/common/data-table-generic/data-table";
import {FilterEnum} from "@/types/filter-enum";
import {formFilterAdvanceds} from "./filter-advanced-form";
import {albumService} from "@/services/album-service";
import {z} from "zod";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card} from "@/components/ui/card";
import DataTablePhotos from "@/components/dashboard/sections/albums/photos";
import {photoService} from "@/services/photo-service";
import {PhotoGetAllQuery} from "@/types/queries/photo-query";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import {Album} from "@/types/album";

const formFilterAdvancedSchema = z.object({
    id: z.string().nullable().optional(),
    date: z
        .object({
            from: z.date().optional(),
            to: z.date().optional(),
        })
        .refine((date) => !!date.to, {message: "End Date is required."})
        .optional(),
    isDeleted: z.boolean().nullable().optional(),
});

const fetchAlbumPhotos = async (albumId_: string) => {
    const query: PhotoGetAllQuery = {
        albumId: albumId_,
        isPagination: true,
    };
    return photoService.fetchAll(query);
};

export default function DataTableAlbums() {
    const filterEnums: FilterEnum[] = [
        {columnId: "isDeleted", title: "Is deleted", options: isDeleted_options},
    ];
    const queryClient = useQueryClient();

    // Lấy dữ liệu từ queryClient cache
    const {data: album, isLoading} = useQuery({
        queryKey: ["album"],
        queryFn: async () => queryClient.getQueryData<Album>(["album"]), // Lấy dữ liệu từ cache
    });

    useEffect(() => {
        console.log("check_select", album);
    }, [album]);

    return (
        <Accordion
            defaultValue={["item-1", "item-2"]}
            type="multiple"
            className="w-full"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>List</AccordionTrigger>
                <AccordionContent>
                    <DataTable
                        deleteData={albumService.delete}
                        columns={columns}
                        fetchData={albumService.fetchAll}
                        columnSearch="name"
                        filterEnums={filterEnums}
                        formSchema={formFilterAdvancedSchema}
                        formFilterAdvanceds={formFilterAdvanceds}
                    />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                    {isLoading || !album ? (
                        <p>Loading...</p> // Hiển thị khi dữ liệu đang tải hoặc album không có sẵn
                    ) : (
                        <Tabs defaultValue="selected" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="selected">Selected</TabsTrigger>
                                <TabsTrigger value="available">Available</TabsTrigger>
                            </TabsList>
                            <TabsContent value="selected">
                                <Card>
                                    <DataTablePhotos
                                        albumId={album.id}
                                        albumXPhotos={album.albumXPhotos ?? []}
                                        tab={0}
                                    />
                                </Card>
                            </TabsContent>
                            <TabsContent value="available">
                                <Card>
                                    <DataTablePhotos
                                        albumId={album.id}
                                        albumXPhotos={album.albumXPhotos ?? []}
                                        tab={1}
                                    />
                                </Card>
                            </TabsContent>
                        </Tabs>
                    )}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
