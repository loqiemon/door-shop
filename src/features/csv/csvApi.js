import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "../../services/constants";



export const csvApi = createApi({
  reducerPath: 'csvApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
  }),
  tagTypes: ['Csv', 'Products'],
  endpoints: (build) => ({
    postCsv: build.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append('file', data.file);
        formData.append('accessoryTypeId', data.accessoryTypeId);

        return {
          url: `CsvUpload`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            // 'Content-Type': 'multipart/form-data',
          },
          body: formData,
        }
      },
      invalidatesTags: ['Products']
    }),
    // postCsv: build.mutation({
    //   query: (data) => {
    //     return {
    //       url: ``,
    //       method: 'POST',
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    //         // 'Content-Type': 'multipart/form-data',
    //       },
    //       body: formData,
    //     }
    //   },
    //   invalidatesTags: ['Products']
    // }),
  })
})


export const {
  usePostCsvMutation,
} = csvApi