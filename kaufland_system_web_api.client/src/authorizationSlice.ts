import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    username: string;
    email: string;
    role: number;
    token: string;
}

interface AuthorizationState {
    user: User | null;
    isAuthorized: boolean;
}

const initialState: AuthorizationState = {
    user: null,
    isAuthorized: false,
};

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthorized = true;

            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            state.isAuthorized = false;

            localStorage.removeItem('user');
        },
        setUserFromLocalStorage: (state) => {
            const user = localStorage.getItem('user');
            if (user) {
                state.user = JSON.parse(user);
                state.isAuthorized = true;
            }
        },
    },
});

export const { login, logout, setUserFromLocalStorage } = authorizationSlice.actions;

export default authorizationSlice.reducer;