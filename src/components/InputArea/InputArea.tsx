"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { type Inputs } from "@/components/Feedback";
import { FileList } from "@/components/FileList";
import Paperclip from "@/icons/paperclip.svg";

import styles from "./styles.module.scss";

export const InputArea = ({
    placeholder,
    id,
}: {
    placeholder: string;
    id: string;
}) => {
    const { register, watch } = useFormContext<Inputs>();
    return (
        <div className={styles.container}>
            <textarea
                id={id}
                className={styles.textarea}
                placeholder={placeholder}
                {...register("message")}
            />
            <label className={styles.label} htmlFor={id}>
                {placeholder}
            </label>
            <label className={styles.paperclip} htmlFor="files">
                <Paperclip />
            </label>
            <input
                id="files"
                className={styles.input}
                {...register("files")}
                type="file"
                multiple
            />
            <FileList files={watch("files")} />
        </div>
    );
};
