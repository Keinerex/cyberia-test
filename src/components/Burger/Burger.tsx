import React, { MouseEventHandler } from "react";
import styles from "./styles.module.scss";
import cn from "classnames";

type Props = {
    open: boolean;
    onClick: MouseEventHandler<HTMLLabelElement>;
};

export const Burger = ({ open, onClick }: Props) => {
    return (
        <label className={styles.container} onClick={onClick}>
            <div className={cn(styles.burger, open ? styles.open : "")} />
        </label>
    );
};
