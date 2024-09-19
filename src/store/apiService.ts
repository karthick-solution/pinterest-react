import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
const BASE_URL =  "http://localhost:5000";

const axiosBaseQuery =
	(): BaseQueryFn<AxiosRequestConfig<unknown>, unknown, AxiosError> =>
	async ({ url, method, data, params }) => {
		try {
			Axios.defaults.baseURL = '/api';
			const fullUrl = `${BASE_URL}${url}`;
			const token = localStorage.getItem('accessToken');
			const result = await Axios({
				url:fullUrl,
				method,
				data,
				params,
				headers: {
					// Add the token to the Authorization header
					Authorization: token ? `Bearer ${token}` : undefined,
				  },
			});
			return { data: result.data };
		} catch (axiosError) {
			const error = axiosError as AxiosError;
			return {
				error
			};
		}
	};

export const apiService = createApi({
	baseQuery: axiosBaseQuery(),
	endpoints: () => ({}),
	reducerPath: 'apiService'
});

export default apiService;
