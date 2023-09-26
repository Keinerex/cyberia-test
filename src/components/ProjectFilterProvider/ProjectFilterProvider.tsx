"use client";

import React, {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useState,
} from "react";

type SetFilterState = (newFilter: number) => void;
// значение по умолчанию в дальнейшем не используется, используем заглушку чтобы TS не ругался
export const SetFilterContext = createContext<SetFilterState>(() => {});

export const FilterContext = createContext<null | number>(null);

export const useFilter = () => {
    return useContext(FilterContext);
};

export const useFilterSwitcher = () => {
    return useContext(SetFilterContext);
};

export const ProjectFilterProvider = ({ children }: PropsWithChildren) => {
    const [filter, setFilter] = useState<null | number>(null);

    const switchFilter = useCallback((newFilter: number) => {
        setFilter(prevState => (prevState === newFilter ? null : newFilter));
    }, []);

    return (
        <FilterContext.Provider value={filter}>
            <SetFilterContext.Provider value={switchFilter}>
                {children}
            </SetFilterContext.Provider>
        </FilterContext.Provider>
    );
};
