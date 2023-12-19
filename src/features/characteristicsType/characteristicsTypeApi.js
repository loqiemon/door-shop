import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../services/constants'



export const characteristicsTypeApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    tagTypes: ['CharacteristicTypes'],
    endpoints: (build) => ({
        getCharacteristicTypes: build.query({
            query: () => {
                return ({ url: `CharacteristicTypes` })
            },
            providesTags: ['CharacteristicTypes']
        }),
        getCharacteristicsType: build.query({
            query: (id) => {
                return ({ url: `CharacteristicTypes/${id}` })
            },
            providesTags: ['CharacteristicTypes']
        }),
        postCharacteristicsType: build.mutation({
            query(featureType) {
                return {
                    url: 'CharacteristicTypes',
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: { name: featureType, isActivePrice: false }
                }
            },
            invalidatesTags: ['CharacteristicTypes']
        }),
        putCharacteristicsType: build.mutation({
            query(characteristicsType) {
                return {
                    url: `CharacteristicTypes`,
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: {
                        ...characteristicsType
                    }
                }
            },
            invalidatesTags: ['CharacteristicTypes']
        }),
        deleteCharacteristicsType: build.mutation({
            query(id) {
                return {
                    url: `CharacteristicTypes/${id}`,
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            },
            invalidatesTags: ['CharacteristicTypes']
        })
    })
})


export const {
    useGetCharacteristicsTypesQuery,
    useLazyGetCharacteristicsTypeQuery,
    usePostCharacteristicsTypeMutation,
    usePutCharacteristicsTypeMutation,
    useDeleteCharacteristicsTypeMutation
} = characteristicsTypeApi