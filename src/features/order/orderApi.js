import { createSlice } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


import { API_URL } from "../../services/constants"

export const orderApi = createApi({
    reducerPath: 'orderApi',
    tagTypes: ['Orders'],
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
      getOrders: builder.query({
        query: () => `Orders`,
        providesTags: ['Orders'],
      }),
      postOrder: builder.mutation({
        query: (order) => ({
          url: `Orders`,
          method: 'POST',
          body: order,
        }),
        invalidatesTags: ['Orders'],
      }),
      putOrder: builder.mutation({
        query: (order) => ({
          url: `Orders`,
          method: 'PUT',
          body: order,
        }),
        invalidatesTags: ['Orders'],
      }),
      deleteOrder: builder.mutation({
        query: (id) => ({
          url: `Orders/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Orders'],
      })
    }),
})

export const { 
  useGetOrdersQuery,
  usePostOrderMutation,
  usePutOrderMutation,
  useDeleteOrderMutation
} = orderApi

