// import axios from "axios";

// export const apiInstance = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL,
// });

// apiInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token")?.replaceAll('"', "");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const testimonialsApi = createApi({
  reducerPath: 'testimonialsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
  }),
  tagTypes: ['Testimonial'],
  endpoints: builder => ({
    getTestimonials: builder.query({
      query: () => '/testimonials',
      providesTags: ['Testimonial'],
    }),
  }),
});

export const { useGetTestimonialsQuery } = testimonialsApi;
