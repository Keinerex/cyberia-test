"use client";

import React from "react";
import { useGetProjectsQuery } from "@/store";
import { ProjectCard } from "@/components/ProjectCard";

import styles from "./styles.module.scss";
import { useFilter } from "@/components/ProjectFilterProvider";

export const ProjectList = () => {
    const { data, isLoading } = useGetProjectsQuery(); // запрос к бэкенду через RTK-query.

    const filter = useFilter();

    if (isLoading || !data) return null; // вместо null, может быть любой лоадер или другой компонент-заглушка

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

// в качестве интересного решения загрузки данных с бэка можно было использовать getServerSideProps в next.js, и делать запрос там
// ну или самым простым способом делать запрос в useEffect с пустым массивом зависимостей
