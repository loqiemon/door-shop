import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../services/constants'

export const productApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (build) => ({
    getProduct: build.query({
      query: ({
        categoryId,
        pageNumber,
        PageSize,
        minPrice,
        maxPrice,
        searchByName,
        searchByVendorCode,
        country,
        manufacturer
      }) => {
        const requestParams = new URLSearchParams()
        let pageNumberToSet = pageNumber; 
        if (minPrice || maxPrice || searchByName || searchByVendorCode || country || manufacturer) {
            pageNumberToSet = 1;
        }
        categoryId && requestParams.append("typeId", categoryId);
        pageNumber && requestParams.append("PageNumber", pageNumberToSet);
        PageSize && requestParams.append("PageSize", PageSize);
        minPrice && requestParams.append("minRetailPrice", parseFloat(minPrice)); 
        maxPrice && requestParams.append("maxRetailPrice", parseFloat(maxPrice)); 
        searchByName && requestParams.append("searchByName", searchByName); 
        searchByVendorCode && requestParams.append("searchByVendorCode", searchByVendorCode); 
        country && requestParams.append("country", country);
        manufacturer && requestParams.append("manufacturer", manufacturer); 
        const apiUrl = `Accessories?${requestParams}`;
        return ({ url: apiUrl })
      },
    }),
  }),
})

export const { useGetProductQuery, useLazyGetProductQuery } = productApi