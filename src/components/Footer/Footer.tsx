import React from "react";
import styles from "./styles.module.scss";
import Logo from "@/icons/cyberia.svg";
import { links } from "@/constants/links";
import Link from "next/link";

export const Footer = () => {
    const footerLinks = [{ title: "Главная", href: "/" }, ...links];

    const contacts = [
        {
            title: "+7 499 679 45 79",
            href: "tel:+74996794579",
        },
        {
            title: "hello@cyberia.ru",
            href: "mailto:hello@cyberia.ru",
        },
        {
            title: "г.Барнаул, ул.Аносова, д.3б, оф.8",
            href: "https://yandex.ru/maps/-/CCUFNLT73A",
        },
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.company}>
                    <Logo className={styles.logo} />
                    <span className={styles.description}>
                        Web and machine learning developing company
                    </span>
                </div>
                <div className={styles.about}>
                    <ul className={styles.contacts}>
                        {contacts.map((item, index) => (
                            <li key={index} className={styles.listItem}>
                                <a href={item.href} className={styles.link}>
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <ul className={styles.linkList}>
                        {footerLinks.map((link, index) => (
                            <li key={index} className={styles.listItem}>
                                <Link className={styles.link} href={link.href}>
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.copyright}>
                    <span>&copy; 2023, Cyberia</span>
                    <span>
                        <a className={styles.link} href="/politic">
                            Политика конфиденциальности
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
};
