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

export const Feedback = () => {
    const methods = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
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
            .then(r => {
                setMessage({ status: r.ok });
                return r.json();
            })
            .then(r => {
                setMessage(prevState => ({
                    status: prevState.status,
                    text: r.message,
                }));
            })
            .catch(error => error);
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
                        <InputArea id="message" placeholder="Сообщение" />
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
