import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/store/baseQuery";

export interface Category {
    id: number;
    name: string;
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    image: string;
    image_dark: string;
    description: string;
    geo: {
        lat: number;
        lng: number;
    };
    categories: Category[];
}

interface getProjectsResponse {
    items: Project[];
}

interface getProjectCategoriesResponse {
    items: Category[];
}

export const projectApi = createApi({
    reducerPath: "project",
    baseQuery: baseQuery,
    endpoints: builder => ({
        getProjects: builder.query<getProjectsResponse, void>({
            query: () => "projects",
        }),
        getProjectCategories: builder.query<getProjectCategoriesResponse, void>(
            {
                query: () => "project-categories",
            }
        ),
    }),
});
