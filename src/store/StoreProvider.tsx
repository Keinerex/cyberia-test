"use client";

import React, {ReactNode} from "react";
import {store} from ".";
import {Provider} from "react-redux";


// Провайдер для получения доступа к redux-toolkit

export const StoreProvider = ({children}: { children: ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
};
