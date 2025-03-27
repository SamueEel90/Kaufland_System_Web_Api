import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoleState {
    role: number;
}

const initialState: RoleState = {
    role: 1,
};

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        setRole: (state, action: PayloadAction<number>) => {
            state.role = action.payload;
        },
    },
});

export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;