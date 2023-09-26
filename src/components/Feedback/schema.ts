import * as yup from "yup";
import { numberMask } from "@/utils/masks";

export const schema = yup.object({
    email: yup
        .string()
        .email("Неверный формат")
        .test(
            "setOne",
            "Поле обязательно для заполнения, когда phone не указан",
            function (value) {
                const { phone } = this.parent;
                if (!phone) return !!value;
                return true;
            }
        ),
    phone: yup
        .string()
        .transform(numberMask.unmask)
        .test(
            "setOne",
            "Поле обязательно для заполнения, когда email не указан",
            function (value) {
                const { email } = this.parent;
                if (!email) return !!value;
                return true;
            }
        )
        .test("length", "Неверный формат", function (value) {
            return !value || value.length === 10;
        }),
    message: yup.string(),
    files: yup.mixed<FileList>(),
});
