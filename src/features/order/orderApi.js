import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL } from "../../services/constants"

export const orderApi = createApi({
  reducerPath: 'orderApi',
  tagTypes: ['Orders'],
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({
        search = '',
        searchParameter = 'name',
        page = 1,
        sortBy = 'date',
        sortType = 'asc',
      }) => {
        const requestParams = new URLSearchParams();
        search && requestParams.append("search", search);
        searchParameter && requestParams.append("searchParameter", searchParameter);
        page && requestParams.append("page", page);
        sortBy && requestParams.append("sortBy", sortBy);
        sortType && requestParams.append("sortType", sortType);
        const apiUrl = `Orders?${requestParams}`;
        return ({
          url: apiUrl,
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
          }
        })
      },
      providesTags: ['Orders'],
    }),
    getOrderByTelephone: builder.query({
      query: (telephone) => ({
        url: `Orders/phone?phoneNumber=${telephone}`,
        method: 'GET',
      }),
      providesTags: ['Orders']
    }),
    postOrder: builder.mutation({
      query: (order) => ({
        url: `Orders`,
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: order,
      }),
      invalidatesTags: ['Orders'],
    }),
    putOrder: builder.mutation({
      query: (order) => ({
        url: `Orders`,
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: order,
      }),
      invalidatesTags: ['Orders'],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `Orders/${id}`,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
        method: 'DELETE',
      }),
      invalidatesTags: ['Orders'],
    })
  }),
})

export const {
  useGetOrdersQuery,
  useGetOrderByTelephoneQuery,
  usePostOrderMutation,
  usePutOrderMutation,
  useDeleteOrderMutation
} = orderApi

