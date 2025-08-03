import {BaseEntity} from "./base/base";
import {Category, SubCategory} from "./category";
import {ProductColor} from "./product-color";
import {ProductMedia} from "./product-media";
import {ProductSize} from "./product-size";

export interface Product extends BaseEntity{
    sku?: string;
    slug?: string;
    name?: string;
    subCategoryId?: string;
    subCategory?: SubCategory;
    price?: number;
    rentalPrice?: number;
    deposit?: number;
    isRentable: boolean;
    isSaleable: boolean;
    description?: string;
    material?: string;
    brand?: string;
    style?: string;
    care?: string;
    status: ProductStatus;
    productMedias: ProductMedia[];
    productColors: ProductColor[];
    productSizes: ProductSize[];
}


export interface ProductRepresentativeByCategory {
    category?: Category | null | undefined;
    product?: ProductRepresentative | null | undefined;
}

export interface ProductRepresentative {
    sku?: string | null | undefined;
    slug?: string | null | undefined;
    src?: string | null | undefined;
}

export enum ProductStatus {
    Unspecified,
    Available,
    Rented,
    InMaintenance,
    Discontinued,
}
