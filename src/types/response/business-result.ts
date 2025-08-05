export interface BusinessResult<T> {
    status: number;
    isSuccess: boolean;
    message: string;
    errors?: string;
    data?: T;
}


