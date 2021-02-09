import React from "react";

type Props = {
    initialTheme: string;
    children: React.ReactNode;
};

export enum Themes {
    DARK = "dark",
    LIGHT = "light",
}

export const getInitialTheme = () => {
    if (typeof window !== "undefined" && window.localStorage) {
        const storedPrefs = window.localStorage.getItem("color-theme");
        if (typeof storedPrefs === "string") {
            return storedPrefs;
        }

        const userMedia = window.matchMedia(
            `(prefers-color-scheme: ${Themes.DARK})`
        );
        if (userMedia.matches) {
            return Themes.DARK;
        }
    }

    return Themes.LIGHT;
};

export const ThemeContext = React.createContext<
    Partial<{
        isDark: boolean;
        toggleTheme: () => void;
    }>
>({ isDark: false });

const ThemeProvider = ({ children }: Props): JSX.Element => {
    const [theme, setTheme] = React.useState(getInitialTheme);

    const isDark = theme === Themes.DARK ? true : false;
    const toggleTheme = () => {
        setTheme((current) => {
            if (current === Themes.DARK) {
                return Themes.LIGHT;
            }
            return Themes.DARK;
        });
    };

    React.useEffect(() => {
        window.localStorage.setItem("color-theme", theme);
        const root = document.documentElement;
        root.className = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
