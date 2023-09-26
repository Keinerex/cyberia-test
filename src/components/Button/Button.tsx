import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import styles from "./styles.module.scss";

export const Button = ({
    children,
    ...props
}: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>) => {
    return (
        <button className={styles.button} {...props}>
            {children}
        </button>
    );
};
