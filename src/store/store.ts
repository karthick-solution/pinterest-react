
import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiService } from './apiService'
import { useDispatch } from 'react-redux';
import { AppDispatchType } from './types';


export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
})

export const useAppDispatch: () => AppDispatchType = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch)