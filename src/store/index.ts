import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { projectApi } from "./projectApi";

export const store = configureStore({
    reducer: combineReducers({
        [projectApi.reducerPath]: projectApi.reducer,
    }),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(projectApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

export const { useGetProjectsQuery, useGetProjectCategoriesQuery } = projectApi;

export type { Category, Project } from "./projectApi";
