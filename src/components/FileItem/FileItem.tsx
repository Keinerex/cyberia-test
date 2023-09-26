import React from "react";
import styles from "./styles.module.scss";
import { useFormContext } from "react-hook-form";
import { Inputs } from "@/components/Feedback";

function humanFileSize(bytes: number, dp = 1) {
    const thresh = 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + " B";
    }

    const units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (
        Math.round(Math.abs(bytes) * r) / r >= thresh &&
        u < units.length - 1
    );

    return "(" + bytes.toFixed(dp) + " " + units[u] + ")";
}

export const FileItem = ({ file }: { file: File }) => {
    const { setValue, getValues } = useFormContext<Inputs>();

    return (
        <div className={styles.file}>
            <span className={styles.name}>{file.name}</span>
            <span className={styles.size}>{humanFileSize(file.size)}</span>
            <span
                className={styles.close}
                onClick={() => {
                    const data = new DataTransfer();

                    Array.from(getValues("files") as FileList).forEach(item => {
                        if (item !== file) {
                            data.items.add(item);
                        }
                    });

                    setValue("files", data.files);
                }}
            ></span>
        </div>
    );
};
