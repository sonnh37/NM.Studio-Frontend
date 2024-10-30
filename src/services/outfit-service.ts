import { Outfit, Category } from "@/types/outfit";
import { OutfitGetAllQuery } from "@/types/queries/outfit-query";
import { BaseService } from "./base-service";

class OutfitService extends BaseService<Outfit> {
    constructor() {
        super(`${process.env.NEXT_PUBLIC_API_BASE}/outfits`);
    }

    
}

export const outfitService = new OutfitService();


// export const fetchCategories = async (query: CategoryGetAllQuery): Promise<Category[]> => {
//     const params = new URLSearchParams(query as any).toString();
//     try {
//         const response = await axios.get(`https://localhost:7192/categories?${params}`);
//         return response.data.results as Category[];
//     } catch (error) {
//         console.error('Failed to fetch categories:', error);
//         throw error;
//     }
// };