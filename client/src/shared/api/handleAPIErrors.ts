import { AxiosError } from "axios";
import { ApiResponse, ErrorResponse } from "./types";

export const handleApiError = async<T>(error: AxiosError) : Promise<ApiResponse<T>> => {
    try {
      let errorMessage: string = "An unexpected error occurred";

      if (error.response && error.response.data) {
        const errorData = error.response.data as Partial<ErrorResponse>;
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      }

      const data: T | null = null;
      return { error: errorMessage, data };
    } catch (error) {
      throw new Error("An unexpected error occured");
    }
};