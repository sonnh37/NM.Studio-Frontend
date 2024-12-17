export interface CreateCommand {
    file?: File | null;
}

export interface UpdateCommand {
    id?: string;
    isDeleted?: boolean;
    file?: File | null;
}
