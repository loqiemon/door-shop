import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../services/constants'



export const characteristicsTypeApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    tagTypes: ['CharacteristicsTypes'],
    endpoints: (build) => ({
        getCharacteristicsTypes: build.query({
            query: () => {
                return ({ url: `CharacteristicsTypes` })
            },
            providesTags: ['CharacteristicsTypes']
        }),
        getCharacteristicsType: build.query({
            query: (id) => {
                return ({ url: `CharacteristicsTypes/${id}` })
            },
            providesTags: ['CharacteristicsTypes']
        }),
        postCharacteristicsType: build.mutation({
            query(featureType) {
                return {
                    url: 'CharacteristicsTypes',
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: {
                        ...featureType
                    }
                }
            },
            invalidatesTags: ['CharacteristicsTypes']
        }),
        putCharacteristicsType: build.mutation({
            query(characteristicsType) {
                return {
                    url: `CharacteristicsTypes`,
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: {
                        ...characteristicsType
                    }
                }
            },
            invalidatesTags: ['CharacteristicsTypes']
        }),
        deleteCharacteristicsType: build.mutation({
            query(id) {
                return {
                    url: `CharacteristicsTypes/${id}`,
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            },
            invalidatesTags: ['CharacteristicsTypes']
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