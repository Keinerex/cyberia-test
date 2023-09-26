import React from "react";
import styles from "./styles.module.scss";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProjectList } from "@/components/ProjectList";
import { ProjectFilter } from "@/components/ProjectFilter";
import { ProjectFilterProvider } from "@/components/ProjectFilterProvider";
import { Feedback } from "@/components/Feedback";

const Page = () => {
    return (
        <main>
            <section className={styles.main}>
                <Breadcrumbs
                    links={[
                        {
                            title: "Главная",
                            href: "/",
                        },
                    ]}
                    title="Проекты"
                />
                <h1 className={styles.title}>Проекты</h1>
                <ProjectFilterProvider>
                    <ProjectFilter />
                    <ProjectList />
                </ProjectFilterProvider>
            </section>
            <Feedback />
        </main>
    );
};

export default Page;
