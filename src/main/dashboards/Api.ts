
import { apiService as api } from '../../store/apiService';

const Api = api
  .enhanceEndpoints({
    // addTagTypes
  })
  .injectEndpoints({
    endpoints: (build) => ({
      
      createPost: build.mutation({
        query: (data) => ({
          url: `/pictures/add`,
          method: 'POST',
          data: data,
        }),
      }),

      postLists: build.query<any,any>({
        query: () => ({
          url: `/pictures`,
        }),
      }),

      like: build.mutation({
        query: ({pictureId,userId}) => ({
          url: `/pictures/${pictureId}/like/${userId}`,
          method: 'POST',
        }),
      }),

      unLike: build.mutation({
        query: ({pictureId,userId}) => ({
          url: `/pictures/${pictureId}/unlike/${userId}`,
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
  useCreatePostMutation,
  usePostListsQuery,
  useLikeMutation,
  useUnLikeMutation
} = Api;
