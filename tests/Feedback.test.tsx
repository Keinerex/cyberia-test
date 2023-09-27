import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Feedback } from "@/components/Feedback";
import fetchMock from "jest-fetch-mock";
import {
    mockServerErrorFeedback,
    mockSuccessFeedback,
    mockValidationErrorFeedback,
} from "./utils/mocks";

describe("Feedback form tests", () => {
    const setup = () => {
        const feedback = render(<Feedback />);

        const emailInput = feedback.getByPlaceholderText("Email");
        const phoneInput = feedback.getByPlaceholderText("Phone");
        const messageInput = feedback.getByPlaceholderText("Message");
        const fileInput = feedback.getByPlaceholderText("files");
        const submitButton = feedback.getByRole("button");

        const user = userEvent.setup();

        return {
            feedback,
            emailInput,
            phoneInput,
            messageInput,
            fileInput,
            submitButton,
            user,
        };
    };

    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test("required phone or email message", async () => {
        const { feedback, user, submitButton, emailInput, phoneInput } =
            setup();

        await user.click(submitButton);

        expect(
            feedback.queryByText(
                "Поле обязательно для заполнения, когда email не указан"
            )
        ).not.toBeNull();
        expect(
            feedback.queryByText(
                "Поле обязательно для заполнения, когда phone не указан"
            )
        ).not.toBeNull();

        expect(emailInput.getAttribute("aria-invalid")).toBe("true");
        expect(phoneInput.getAttribute("aria-invalid")).toBe("true");

        await user.type(emailInput, "test@mail.ru");

        expect(
            feedback.queryByText(
                "Поле обязательно для заполнения, когда email не указан"
            )
        ).toBeNull();
        expect(
            feedback.queryByText(
                "Поле обязательно для заполнения, когда phone не указан"
            )
        ).toBeNull();

        expect(emailInput.getAttribute("aria-invalid")).toBe("false");
        expect(phoneInput.getAttribute("aria-invalid")).toBe("false");

        await user.clear(emailInput);
    });

    test("good message", async () => {
        const { feedback, user, submitButton, emailInput } = setup();

        mockSuccessFeedback();

        expect(
            feedback.queryByText("Ваша заявка успешно отправлена")
        ).toBeNull();

        await user.type(emailInput, "test@mail.ru");
        await user.click(submitButton);

        expect(
            feedback.queryByText("Ваша заявка успешно отправлена")
        ).not.toBeNull();
    });

    test("backend validation messages", async () => {
        const { feedback, user, submitButton, emailInput } = setup();

        mockValidationErrorFeedback();

        expect(feedback.queryByText("Error email")).toBeNull();
        expect(feedback.queryByText("Error phone")).toBeNull();

        await user.type(emailInput, "test@mail.ru");
        await user.click(submitButton);

        const emailError = feedback.queryByText("Error email");
        expect(emailError).not.toBeNull();
        expect(
            (emailError as HTMLElement).classList.contains("error")
        ).toBeTruthy();

        const phoneError = feedback.queryByText("Error phone");
        expect(phoneError).not.toBeNull();
        expect(
            (phoneError as HTMLElement).classList.contains("error")
        ).toBeTruthy();
    });

    test("bad message response", async () => {
        const { feedback, user, submitButton, emailInput } = setup();

        mockServerErrorFeedback();

        expect(
            feedback.queryByText(
                "Не удалось отрпавить заявку, повторите отправку позднее"
            )
        ).toBeNull();

        await user.type(emailInput, "test@mail.ru");
        await user.click(submitButton);

        expect(
            feedback.queryByText(
                "Не удалось отрпавить заявку, повторите отправку позднее"
            )
        ).not.toBeNull();
    });
});
