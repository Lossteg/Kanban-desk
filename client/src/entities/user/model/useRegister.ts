import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { userApi } from '../api/userApi';
import { SignUpDto, RegisterResponse } from '../api/types';
import { ApiResponse } from '../../../shared/api/types';

export const useRegister = (options?: UseMutationOptions<ApiResponse<RegisterResponse>, Error, SignUpDto>) => {
  return useMutation<ApiResponse<RegisterResponse>, Error, SignUpDto>({
    mutationFn: (signUpDto: SignUpDto) => userApi.register(signUpDto),
    ...options
  });
};