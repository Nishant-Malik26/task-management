import { REGISTER_SUCCESS, REGISTER_FAIL, LOAD_USER, AUTH_ERROR } from './actionTypes';

export interface AuthState {
  user: null | object;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

export interface RegisterSuccessPayload {
  token: string;
}

export interface RegisterFailPayload {}

export interface LoadUserPayload {
  user: any;
}

export interface AuthErrorPayload {}

export type AuthActionTypes =
   { type: typeof REGISTER_SUCCESS; payload: RegisterSuccessPayload }
  | { type: typeof REGISTER_FAIL; payload: RegisterFailPayload }
  | { type: typeof LOAD_USER; payload: LoadUserPayload }
  | { type: typeof AUTH_ERROR; payload: AuthErrorPayload };
