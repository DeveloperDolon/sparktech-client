import { baseApi } from "./baseApi";

const chatroomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createChatroom: builder.mutation({
      query: (payload: { userId: string }) => ({
        url: "/chatroom/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["chatroom"],
    }),
    chatroomList: builder.query({
      query: () => ({
        url: "/chatroom/list",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateChatroomMutation, useChatroomListQuery } = chatroomApi;
