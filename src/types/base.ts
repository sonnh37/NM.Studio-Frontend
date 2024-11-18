export interface BaseEntity {
    id?: string;
    createdBy?: string;
    createdDate?: Date;
    lastUpdatedBy?: string;
    lastUpdatedDate?: Date;
    isDeleted: boolean;
}

