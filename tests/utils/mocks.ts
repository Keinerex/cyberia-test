import fetchMock from "jest-fetch-mock";
import { baseUrl } from "@/constants/baseUrl";
import { projectCategories, projects } from "./responses";

export const mockProjects = () =>
    fetchMock.mockOnceIf(baseUrl + "/projects", () =>
        Promise.resolve({
            status: 200,
            body: JSON.stringify(projects),
        })
    );

export const mockProjectsCategories = () =>
    fetchMock.mockOnceIf(baseUrl + "/project-categories", () =>
        Promise.resolve({
            status: 200,
            body: JSON.stringify(projectCategories),
        })
    );

export const mockSuccessFeedback = () =>
    fetchMock.mockOnceIf(baseUrl + "/feedbacks", () =>
        Promise.resolve({
            status: 200,
            body: JSON.stringify({ message: "Test message" }),
        })
    );

export const mockValidationErrorFeedback = () =>
    fetchMock.mockOnceIf(baseUrl + "/feedbacks", () =>
        Promise.resolve({
            status: 422,
            body: JSON.stringify({
                errors: {
                    email: ["Error email"],
                    phone: ["Error phone"],
                },
            }),
        })
    );

export const mockServerErrorFeedback = () =>
    fetchMock.mockOnceIf(baseUrl + "/feedbacks", () =>
        Promise.resolve({
            status: 500,
        })
    );
