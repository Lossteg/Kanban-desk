import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { userApi } from '../api/userApi';
import { SignUpDto, RegisterResponse } from '../api/types';

export const useRegister = (options?: UseMutationOptions<RegisterResponse, Error, SignUpDto>) => {
  return useMutation<RegisterResponse, Error, SignUpDto>({
    mutationFn: (signUpDto: SignUpDto) => userApi.register(signUpDto),
    ...options
  });
};