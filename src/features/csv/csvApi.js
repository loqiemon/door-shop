import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "../../services/constants";



export const csvApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    tagTypes: ['Csv'],
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
    })
})


export const {
  usePostCsvMutation,
} = csvApi