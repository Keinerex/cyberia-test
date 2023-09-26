import "@/styles/globals.scss";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { Header } from "@/components/Header";
import { StoreProvider } from "@/store/StoreProvider";
import { PropsWithChildren } from "react";
import { Footer } from "@/components/Footer";

const inter = Rubik({ subsets: ["latin"], weight: "300" });

export const metadata: Metadata = {
    title: "Cyberia",
};

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <StoreProvider>
                <body className={inter.className}>
                    <Header />
                    {children}
                    <Footer />
                </body>
            </StoreProvider>
        </html>
    );
}
