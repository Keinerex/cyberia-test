import React from "react";
import { Category } from "@/store";
import styles from "./styles.module.scss";
import cn from "classnames";
import {
    useFilter,
    useFilterSwitcher,
} from "@/components/ProjectFilterProvider";

export const ProjectFilterItem = ({ category }: { category: Category }) => {
    const filter = useFilter();
    const setFilter = useFilterSwitcher();

    return (
        <div
            className={cn(
                styles.filter,
                filter === category.id ? styles.current : ""
            )}
            onClick={() => {
                setFilter(category.id);
            }}
        >
            {category.name}
        </div>
    );
};
