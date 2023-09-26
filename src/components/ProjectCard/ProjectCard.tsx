import React from "react";
import { Project } from "@/store";

import styles from "./styles.module.scss";

export const ProjectCard = ({ title, image_dark, description }: Project) => {
    return (
        <div className={styles.card}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
            <img
                src={image_dark}
                alt={title + " title"}
                className={styles.image}
            />
        </div>
    );
};
