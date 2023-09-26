"use client";

import React from "react";
import { useGetProjectCategoriesQuery } from "@/store";
import styles from "./styles.module.scss";
import { ProjectFilterItem } from "@/components/ProjectFilterItem";

export const ProjectFilter = () => {
    const { data, isLoading } = useGetProjectCategoriesQuery();

    if (isLoading || !data) return null;

    return (
        <section className={styles.container}>
            {data.items.map((category, index) => (
                <ProjectFilterItem key={index} category={category} />
            ))}
        </section>
    );
};
