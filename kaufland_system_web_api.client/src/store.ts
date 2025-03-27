import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authorizationReducer from './authorizationSlice';
import roleReducer from './roleSlice';
import orderCategorySlice from './orderCategorySlice'

const rootReducer = combineReducers({
    authorization: authorizationReducer,
    role: roleReducer,
    orderCategory: orderCategorySlice
});

export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;