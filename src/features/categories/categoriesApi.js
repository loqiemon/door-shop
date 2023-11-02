import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


import { API_URL } from "../../shared/const/constants";


export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
  }),
  tagTypes: ['Categories'],
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => `/AccessoryTypes`,
      providesTags: ['Categories'],
    }),
    addCategory: build.mutation({
      query: (category) => ({
        url: `/AccessoryTypes`,
        method: 'POST',
        body: category,
      }),
      invalidatesTags: ['Categories'],
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/AccessoryTypes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'],
    }),
    editCategory: build.mutation({
      query: (category) => ({
        url: `/AccessoryTypes/${category.id}`,
        method: 'PUT',
        body: category,
      }),
      invalidatesTags: ['Categories'],
    })
  })
})


export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation
} = categoriesApi
