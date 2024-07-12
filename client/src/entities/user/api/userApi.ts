import axios, { AxiosError } from 'axios';
import { SignUpDto, RegisterResponse } from './types';
import { handleApiError } from '../../../shared/api/handleAPIErrors';
import { ApiResponse } from '../../../shared/api/types';

const API_URL = import.meta.env.VITE_API_URL + '/auth';

export const userApi = {
  register: async (signUpDto: SignUpDto): Promise<ApiResponse<RegisterResponse>> => {
    try {
      const response = await axios.post<RegisterResponse>(`${API_URL}/register`, signUpDto);
      return { data: response.data, error: null };
    } catch (error) {
      if (error instanceof AxiosError) {
        return handleApiError<RegisterResponse>(error);
      }
      throw error;
    }
  },
};