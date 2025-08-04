export interface BaseEntity {
    id: string;
    createdBy?: string;
    createdDate?: string;
    lastUpdatedBy?: string;
    lastUpdatedDate?: string;
    isDeleted: boolean;
}

