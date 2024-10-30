import {useEffect, useState} from "react";
import {ProductGetAllQuery} from "@/types/queries/product-query";
import {Product} from "@/types/product";
import {fetchProducts} from "@/services/product-service";

export const useFetchProducts = (query: ProductGetAllQuery) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const data = await fetchProducts(query);
                setProducts(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, [query]);

    return {products, loading, error};
};
