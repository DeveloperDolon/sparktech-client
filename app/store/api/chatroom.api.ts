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
  }),
});

export const { useCreateChatroomMutation } = chatroomApi;
