import axios from 'axios';
import { SignUpDto, RegisterResponse } from './types';

const API_URL = '/auth';

export const userApi = {
  register: async (signUpDto: SignUpDto): Promise<RegisterResponse> => {
    const response = await axios.post<RegisterResponse>(`${API_URL}/register`, signUpDto);
    return response.data;
  },
};