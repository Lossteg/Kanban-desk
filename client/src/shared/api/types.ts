export interface ApiResponse<T> {
    error: string | null;
    data: T | null;
}

export interface ErrorResponse {
    message: string;
}