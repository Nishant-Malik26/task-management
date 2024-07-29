import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthState, RegisterParams, AuthActionTypes, RegisterSuccessPayload, LoadUserPayload } from '@/store/authTypes';
import { redirect } from 'next/navigation';

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  loading: true,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerSuccess: (state, action: PayloadAction<RegisterSuccessPayload>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginSuccess: (state, action: PayloadAction<RegisterSuccessPayload>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    registerFail: (state) => {
      // Cookies.remove('token');
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    loginFail: (state) => {
      // Cookies.remove('token');
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    userLoaded: (state, action: PayloadAction<LoadUserPayload>) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
    },
    authError: (state) => {
      // Cookies.remove('token');
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export default authSlice.reducer;

export const {
  registerSuccess,
  registerFail,
  userLoaded,
  authError,
  loginSuccess,
  loginFail,
} = authSlice.actions;

export const register =
  ({ name, email, password }: RegisterParams) =>
  async (dispatch: Dispatch<AuthActionTypes>) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });
    try {
      const res = await axios.post(
        'http://localhost:5001/api/users',
        body,
        config
      );
      dispatch<any>(registerSuccess({ token: res.data.token }));
      // dispatch<any>(loadUser());
    } catch (error: any) {
      const errors = error?.response?.data?.errors;
      if (errors) {
        // Handle errors
      }

      dispatch<any>(registerFail());
    }
  };

// export const loadUser = () => async (dispatch: Dispatch<AuthActionTypes>) => {
 
//   try {
//     const res = await axios.get('http://localhost:5001/api/auth');
//     dispatch<any>(userLoaded({ user: res.data }));
//   } catch (error) {
//     dispatch<any>(authError());
//   }
// };

export const login =
  ({ email, password }: { email: string; password: string }) =>
  async (dispatch: Dispatch<AuthActionTypes>) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,

    };

    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post(
        'http://localhost:5001/api/auth',
        body,
        config
      );
      dispatch<any>(loginSuccess({ token: res.data.token }));
      // dispatch<any>(loadUser());
      console.log('is it ')
      redirect('/')

    } catch (error: any) {
      const errors = error?.response?.data?.errors;
      if (errors) {
        // Handle errors
      }

      dispatch<any>(loginFail());
    }
  };

export const logout = () => (dispatch: Dispatch<AuthActionTypes>) => {
  Cookies.remove('token');
  // Cookies.remove()
  dispatch<any>(loginFail());
  // dispatch(clearProfile()); // Assuming this action exists
};
