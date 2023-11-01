import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../shared/const/constants'

export const productApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ['Products'],
  endpoints: (build) => ({
    getProducts: build.query({
      query: ({
        categoryId,
        pageNumber,
        PageSize = 10,
        minPrice,
        maxPrice,
        searchByName,
        searchByVendorCode,
        country,
        manufacturer,
        searchParameter,
        sortType,
        color
      }) => {
        const requestParams = new URLSearchParams()
        let pageNumberToSet = pageNumber || 1;
        // if (minPrice || maxPrice || searchByName || searchByVendorCode || country || manufacturer) {
        //   pageNumberToSet = 1;
        // }
        categoryId && requestParams.append("typeId", categoryId);
        color && requestParams.append("color", color);
        pageNumber && requestParams.append("PageNumber", pageNumberToSet);
        PageSize && requestParams.append("PageSize", PageSize);
        minPrice && requestParams.append("minRetailPrice", parseFloat(minPrice));
        maxPrice && requestParams.append("maxRetailPrice", parseFloat(maxPrice));
        searchByName && requestParams.append("searchByName", searchByName);
        searchByVendorCode && requestParams.append("searchByVendorCode", searchByVendorCode);
        country && requestParams.append("country", country);
        manufacturer && requestParams.append("manufacturer", manufacturer);
        searchParameter && requestParams.append("searchParameter", searchParameter);
        sortType && requestParams.append("sortType", sortType);
        const apiUrl = `Accessories?${requestParams}`;
        return ({ url: apiUrl })
      },
      providesTags: ['Products']
    }),
    getProduct: build.query({
      query: (id) => {
        const apiUrl = `Accessories/${id}`;
        return ({ url: apiUrl })
      },
      providesTags: ['Products']
    }),
    postProduct: build.mutation({
      query(product) {
        const { id, characteristics, ...body } = product;
        const characteristicsWithoutId = characteristics.map(({ id, ...characteristic }) => characteristic);
        return {
          url: `Accessories`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          },
          body: {
            ...body,
            image: body.image.join(' '),
            characteristics: characteristicsWithoutId
          },
        }
      },
      invalidatesTags: ['Products']
    }),
    putProduct: build.mutation({
      query(product) {
        const { characteristics, ...body } = product;
        const finalFeatures = characteristics.map(feature => {
          if (typeof (feature.id) === 'string') {
            const { id, ...featur } = feature
            return featur
          }
          return feature
        })
        return {
          url: `Accessories/${body.id}`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          },
          body: {
            ...body,
            image: body.image.join(' '),
            characteristics: finalFeatures
          },
        }
      },
      invalidatesTags: ['Products']
    }),
    deleteProduct: build.mutation({
      query(id) {
        return {
          url: `Accessories/${id}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      },
      invalidatesTags: ['Products']
    })
  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  usePostProductMutation,
  usePutProductMutation,
  useDeleteProductMutation
} = productApi