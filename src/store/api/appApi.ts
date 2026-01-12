// src/store/api/appApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASE_URL = "http://10.10.20.43:3000";
// export const BASE_URL = "http://localhost:3000";
// export const BASE_URL = "https://api.srzfilms.com";

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    postContact: builder.mutation<
      void,
      {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        message: string;
      }
    >({
      query: (body) => ({
        url: "/api/contacts/post-contact",
        method: "POST",
        body,
      }),
    }),
    getAbout: builder.query<
      {
        success: boolean;
        message: string;
        data: {
          _id: string;
          __v: number;
          content: string;
          createdAt: string;
          imageUrl: string;
          updatedAt: string;
        };
      },
      void
    >({
      query: () => "/api/about/get-about",
    }),
    getHeroSection: builder.query<
      {
        success: boolean;
        message: string;
        data: {
          _id: string;
          items: {
            topTitle: string;
            bottomTitle: string;
            videoUrl: string;
            _id: string;
            duration: number;
          }[];
          createdAt: string;
          updatedAt: string;
          __v: number;
        };
      },
      void
    >({
      query: () => "/api/hero/get-title-video",
    }),

    getFooter: builder.query<FooterData, void>({
      query: () => "/api/footer/get-footer",
    }),
  }),
});

interface FooterData {
  success: boolean;
  message: string;
  data: {
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    address: {
      fullAddress: string;
    };
    email: string;
    phone: string;
    socialLinks: {
      facebook: string;
      instagram: string;
      youtube: string;
    };
  };
}

export const {
  usePostContactMutation,
  useGetAboutQuery,
  useGetHeroSectionQuery,
  useGetFooterQuery,
} = appApi;
