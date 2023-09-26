import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { baseUrl } from "@/constants/baseUrl";

export const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
});
