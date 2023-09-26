import React from "react";
import { FileItem } from "@/components/FileItem";

import styles from "./styles.module.scss";

export const FileList = ({ files }: { files?: FileList }) => {
    return (
        <div className={styles.files}>
            {files &&
                Array.from(files).map((file, index) => (
                    <FileItem key={index} file={file} />
                ))}
        </div>
    );
};
