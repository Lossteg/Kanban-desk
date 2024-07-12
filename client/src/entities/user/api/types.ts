export interface SignUpDto {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  plainUser: User;
  tokens: Tokens;
}
