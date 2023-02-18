import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const feedbackApi = createApi({
  reducerPath: 'feedback/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.flamingo-house.top/api/feedback/',
  }),
  endpoints: (build) => ({
    list: build.query<FeedbackResult[], void>({
      query: () => 'list',
    }),
  }),
});

export const { useListQuery } = feedbackApi;

export interface FeedbackResult {
  createdAt: string;
  delete: boolean;
  id: number;
  msg: FeedbackMessage;
  updatedAt: string;
}

export interface FeedbackMessage {
  chat: {
    id: number;
    first_name: string;
    username: string;
    type: string;
  };
  date: number;
  from: {
    first_name: string;
    id: number;
    is_bot: boolean;
    language_code: string;
    username: string;
  };
  message_id: number;
  text: string;
}
