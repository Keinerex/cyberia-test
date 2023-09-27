import fetchMock from "jest-fetch-mock";
import { renderHook, waitFor } from "@testing-library/react";
import { useGetProjectCategoriesQuery, useGetProjectsQuery } from "@/store";
import { StoreProvider } from "@/store/StoreProvider";
import { projectCategories, projects } from "./utils/responses";
import { mockProjects, mockProjectsCategories } from "./utils/mocks";

describe("RTK Query tests", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test("get project hook", async () => {
        mockProjects();

        const endpointName = "getProjects";

        const { result } = renderHook(() => useGetProjectsQuery(), {
            wrapper: StoreProvider,
        });

        expect(result.current).toMatchObject({
            status: "pending",
            endpointName,
            isLoading: true,
            isSuccess: false,
            isError: false,
            isFetching: true,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current).toMatchObject({
            status: "fulfilled",
            endpointName,
            data: projects,
            isLoading: false,
            isSuccess: true,
            isError: false,
            currentData: projects,
            isFetching: false,
        });
    });

    test("get project categories hook", async () => {
        mockProjectsCategories();

        const endpointName = "getProjectCategories";

        const { result } = renderHook(() => useGetProjectCategoriesQuery(), {
            wrapper: StoreProvider,
        });

        expect(result.current).toMatchObject({
            status: "pending",
            endpointName,
            isLoading: true,
            isSuccess: false,
            isError: false,
            isFetching: true,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current).toMatchObject({
            status: "fulfilled",
            endpointName,
            data: projectCategories,
            isLoading: false,
            isSuccess: true,
            isError: false,
            currentData: projectCategories,
            isFetching: false,
        });
    });
});
