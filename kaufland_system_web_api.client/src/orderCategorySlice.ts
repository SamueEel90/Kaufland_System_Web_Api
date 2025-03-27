import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderCategoryState {
    orderCategory: string | undefined;
}

const initialState: OrderCategoryState = {
    orderCategory: undefined,
};

const orderCategorySlice = createSlice({
    name: 'orderCategory',
    initialState,
    reducers: {
        setOrderCategory: (state, action: PayloadAction<string>) => {
            state.orderCategory = action.payload;
        },
    },
});

export const { setOrderCategory } = orderCategorySlice.actions;
export default orderCategorySlice.reducer;