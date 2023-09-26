import React, { Fragment } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";

type Link = {
    title: string;
    href: string;
};

type Props = {
    links: Array<Link>;
    title: string;
};
export const Breadcrumbs = ({ links, title }: Props) => {
    return (
        <div className={styles.container}>
            {links.map((item, index) => (
                <Fragment key={index}>
                    <Link className={styles.link} href={item.href}>
                        {item.title}
                    </Link>
                    <span className={styles.delimiter}>/</span>
                </Fragment>
            ))}
            <span className={styles.crumb}>{title}</span>
        </div>
    );
};
