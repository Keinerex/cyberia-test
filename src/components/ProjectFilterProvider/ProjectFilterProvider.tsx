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

// два контекста позволяют избежать лишних ре-рендеров компонентов
export const FilterContext = createContext<null | number>(null);

// хуки для доступа к фильтрам
export const useFilter = () => {
    return useContext(FilterContext);
};

export const useFilterSwitcher = () => {
    return useContext(SetFilterContext);
};

// провайдер позволяет избежать ререндеров компонентов внутри него при изменении состояния контекста
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

// для доступа к фильтрам использовал context api, но можно было использовать App router next.js и хранить значение фильтра в адресной строке (?filter=backend)
