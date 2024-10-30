"use client";

import {Card} from "@/components/client/card";
import {toSlug} from "@/lib/slug-helper";
import {fetchCategories, fetchOutfits} from "@/services/outfit-service";
import {CategoryGetAllQuery, OutfitGetAllQuery} from "@/types/queries/outfit-query";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {Category, Outfit} from "../../../types/outfit";

const getMatchingCategory = (categories: Category[], slug: string): Category | undefined => {
    return categories.find(category => toSlug(category.name!) === slug);
};

export function OutfitByCategoryComponent() {
    const [outfits, setOutfits] = useState<Outfit[]>([]);
    const [outfitGetAllQuery, setOutfitGetAllQuery] = useState<OutfitGetAllQuery>();
    const param = useParams();
    const [categories, setCategories] = useState<Category[]>([]);

    const categoryGetAllQuery: CategoryGetAllQuery = {
        name: '',
        isPagination: false
    };

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const fetchedCategories = await fetchCategories({
                    name: '',
                    isPagination: false
                });
                setCategories(fetchedCategories);

                // Kiểm tra danh mục phù hợp với slug
                const matchingCategory = getMatchingCategory(fetchedCategories, param.slug.toString() || '');
                if (matchingCategory) {
                    const filteredCategories = await fetchCategories({
                        name: matchingCategory.name,
                        isPagination: true
                    });
                    setCategories(filteredCategories);

                } else {
                    console.log('No matching category found');
                }
            } catch (error) {
                console.error('Failed to load categories:', error);
            }
        };

        loadCategories();
    }, [param.slug]);  // Chỉ chạy khi param.slug thay đổi

    useEffect(() => {
        if (categories.length > 0 && param.slug) {
            const categoryByoutfitName = categories[0];
            const updatedQuery = {
                ...outfitGetAllQuery,
                categoryId: categoryByoutfitName.id,
                isPagination: outfitGetAllQuery?.isPagination ?? false,
            };
            setOutfitGetAllQuery(updatedQuery);
        }
    }, [categories, param.slug]);

    useEffect(() => {
        const fetchData = async () => {
            if (outfitGetAllQuery?.categoryId !== undefined) {
                try {
                    // Cập nhật outfitGetAllQuery một cách an toàn
                    const updatedQuery = {...outfitGetAllQuery, isPagination: true};

                    console.log('Input', updatedQuery);

                    // Gọi API với updatedQuery
                    const outfits = await fetchOutfits(updatedQuery);
                    console.log('Output', outfits);
                    setOutfits(outfits);
                } catch (error) {
                    console.error('Failed to fetch outfits:', error);
                }
            }
        };

        fetchData();
    }, [outfitGetAllQuery]);


    return (
        <div className="h-[40rem] w-full py-10">
            <div className="flex flex-row items-center justify-center relative w-full">
                <div className="max-w-7xl mx-auto w-full relative overflow-hidden px-4">
                    <div
                        className="div"
                        style={{
                            opacity: 1,
                            transform: "translateY(0px)",
                            transition: "opacity 1s, transform 1s"
                        }}
                    >
                        <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
                            Trang phục
                        </h2>
                        <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
                            Trang trọng - Lịch lãm - Quý phái
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-5 pt-10">
                {outfits.map((card, index) => (

                    <Card
                        key={index}
                        title={card.category?.name as string}
                        description={card.description as string}
                        imageUrl={card.outfitXPhotos && card.outfitXPhotos.length > 0 ? (card.outfitXPhotos[index]?.photo?.src as string) : ""}
                        hoverImageUrl={card.outfitXPhotos && card.outfitXPhotos.length > 1 ? (card.outfitXPhotos[index + 1]?.photo?.src as string) : ""}
                    />
                ))}
            </div>
        </div>
    );
}
