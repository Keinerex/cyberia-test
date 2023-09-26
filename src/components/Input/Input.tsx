import React, {
    DetailedHTMLProps,
    forwardRef,
    InputHTMLAttributes,
} from "react";

import styles from "./styles.module.scss";
import cn from "classnames";

interface Props
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    errorMessage: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
    ({ errorMessage, ...props }, ref) => {
        return (
            <div className={styles.group}>
                <input
                    className={cn(styles.input, styles.removeAutoFill)}
                    {...props}
                    ref={ref}
                />
                <label htmlFor={props.id} className={styles.label}>
                    {props.placeholder}
                </label>
                <label className={styles.error}>{errorMessage}</label>
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
