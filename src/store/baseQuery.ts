import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { baseUrl } from "@/constants/baseUrl";


// baseQuery позволяет делать какие-то универсальные настройки для запросов (например заголовки запросов)
export const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
});
