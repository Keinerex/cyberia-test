"use client";

import React from "react";
import { useGetProjectsQuery } from "@/store";
import { ProjectCard } from "@/components/ProjectCard";

import styles from "./styles.module.scss";
import { useFilter } from "@/components/ProjectFilterProvider";

export const ProjectList = () => {
    const { data, isLoading } = useGetProjectsQuery();

    const filter = useFilter();

    if (isLoading || !data) return null;

    return (
        <section className={styles.container}>
            {data.items.map(item => {
                if (
                    filter === null ||
                    item.categories.some(category => category.id === filter)
                ) {
                    return <ProjectCard key={item.id} {...item} />;
                }
            })}
        </section>
    );
};
