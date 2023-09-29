"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Input } from "@/components/Input";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMaskedInput } from "@/utils/useMaskedInput";
import { lazyNumberMask, numberMask } from "@/utils/masks";
import { schema } from "@/components/Feedback/schema";
import { InputArea } from "@/components/InputArea";
import { Button } from "@/components/Button";
import MailBoxIcon from "@/icons/mailbox.svg";
import { baseUrl } from "@/constants/baseUrl";
import cn from "classnames";

export type Inputs = {
    email?: string;
    phone?: string;
    message?: string;
    files?: FileList;
};

// для обработки форм решил использовать react hook form, а для валидации полей и их описания использовал yup

export const Feedback = () => {
    const methods = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
        setError,
    } = methods;

    const [message, setMessage] = useState<{
        status: boolean;
        text?: string;
    }>({ status: true });

    const onSubmit: SubmitHandler<Inputs> = data => {
        const formData = new FormData();

        data.email && formData.append("email", data.email);
        data.phone && formData.append("phone", data.phone);
        data.message && formData.append("message", data.message);

        Array.from(data.files || []).forEach(file => {
            formData.append("attachment", file);
        });

        fetch(baseUrl + "/feedbacks", {
            method: "POST",
            body: formData,
        })
            .then(r => r.json().then(json => ({ status: r.status, ...json })))
            .then(r => {
                if (r.status === 200) {
                    setMessage({
                        status: true,
                        text: "Ваша заявка успешно отправлена",
                    });
                } else if (r.status === 422) {
                    Object.entries(
                        r.errors as {
                            [key: string]: string[];
                        }
                    ).forEach(([key, value]) => {
                        value.forEach(message =>
                            setError(key as keyof Inputs, {
                                type: "custom",
                                message: message,
                            })
                        );
                    });
                } else {
                    setMessage({
                        status: false,
                        text: "Не удалось отрпавить заявку, повторите отправку позднее",
                    });
                }
            })
            .catch(() =>
                setMessage({
                    status: false,
                    text: "Не удалось отрпавить заявку, повторите отправку позднее",
                })
            );
    };

    const { onBlur, onFocus, onChange } = useMaskedInput(
        numberMask,
        lazyNumberMask,
        4
    );

    return (
        <section className={styles.container}>
            <div className={styles.infoContainer}>
                <MailBoxIcon />
                <h1 className={styles.title}>
                    {"Расскажите \nо вашем проекте"}
                </h1>
                <span className={styles.text}>
                    Поделитесь с нами информацией, чем мы можем быть полезны:
                    реализовать идею или выделить разработчиков для ИТ-команды.
                    Чем больше вы нам расскажете — тем продуктивнее будет
                    дальнейшее обсуждение.
                </span>
            </div>
            <div className={styles.formContainer}>
                <FormProvider {...methods}>
                    <form
                        className={styles.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Input
                            id="email"
                            placeholder="Email"
                            errorMessage={errors.email?.message || ""}
                            aria-invalid={errors.email ? "true" : "false"}
                            {...register("email", {
                                onChange: () => trigger("phone"),
                            })}
                        />
                        <Input
                            id="phone"
                            errorMessage={errors.phone?.message || ""}
                            placeholder="Phone"
                            aria-invalid={errors.phone ? "true" : "false"}
                            onFocus={onFocus}
                            {...register("phone", {
                                onChange: event => {
                                    trigger("email");
                                    onChange(event);
                                },
                                onBlur: onBlur,
                            })}
                        />
                        <InputArea id="message" placeholder="Message" />
                        <div className={styles.submit}>
                            <Button type="submit">Отправить</Button>
                            <span className={styles.confidence}>
                                Нажимая “Отправить”, Вы даете согласие на
                                обработку персональных данных
                            </span>
                        </div>
                        <span
                            className={cn(
                                styles.info,
                                message.status ? styles.ok : styles.error
                            )}
                        >
                            {message.text}
                        </span>
                    </form>
                </FormProvider>
            </div>
        </section>
    );
};
