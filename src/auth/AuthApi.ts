
import { apiService as api } from '../store/apiService';

const AuthApi = api
  .enhanceEndpoints({
    // addTagTypes
  })
  .injectEndpoints({
    endpoints: (build) => ({
      
      signIn: build.mutation<any,{ email: string; password: string }>({
        query: (data) => ({
          url: `/users/login`,
          method: 'POST',
          data: data,
        }),
      }),

      signUp: build.mutation<any,{ email: string; password: string; }>({
        query: (data) => ({
          url: `/users/register`,
          method: 'POST',
          data: data,
        }),
      }),
      
      getProfile: build.query<any,any>({
        query: () => ({
          url: `/users/get-profile`,
        }),
      }),

      userList: build.query<any,any>({
        query: () => ({
          url: `/users/get-users`,
        }),
      }),

      follow: build.mutation<any,{ userId: any; followUserId: string; }>({
        query: ({userId,followUserId}) => ({
          url: `/users/${userId}/follow/${followUserId}`,
          method: 'POST',
        }),
      }),

      unFollow: build.mutation<any,{ userId: any; unFollowUserId: string; }>({
        query: ({userId,unFollowUserId}) => ({
          url: `/users/${userId}/unfollow/${unFollowUserId}`,
          method: 'POST',
        }),
      }),
    }),
    overrideExisting: false,
  });


  export type  Token = {
    access_token: string;
    refresh_token: string;
  }
  
  export type  UserData = {
    tokens: Token;
  }
  

export const {
  useSignInMutation,
  useSignUpMutation,
  useFollowMutation,
  useUnFollowMutation,
  useGetProfileQuery,
  useUserListQuery
} = AuthApi;
