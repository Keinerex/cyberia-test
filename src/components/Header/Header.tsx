"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

import Logo from "@/icons/cyberia_small.svg";
import { links } from "@/constants/links";
import { Burger } from "@/components/Burger";
import cn from "classnames";

export const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className={cn(styles.header, open ? styles.open : "")}>
            <div className={styles.adaptive}>
                <Link href="/">
                    <Logo className={styles.logo} />
                </Link>
                <Burger
                    open={open}
                    onClick={() => {
                        setOpen(prevState => !prevState);
                        console.log(open);
                    }}
                />
            </div>
            <ul className={styles.links}>
                {links.map((item, index) => (
                    <li key={index} className={styles.listItem}>
                        <Link href={item.href} className={styles.headerLink}>
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </header>
    );
};
