// gatsby-browser.js || gatsby-ssr.js
import React from "react";
import { MDXEmbedProvider } from "mdx-embed";

export const wrapRootElement = ({ element }) => {
  return <MDXEmbedProvider>{element}</MDXEmbedProvider>;
};

const MagicScriptTag = () => {
  const runOnClient = `(function(){
    function getInitialTheme () {
        if (typeof window !== "undefined" && window.localStorage) {
            const storedPrefs = window.localStorage.getItem("color-theme");
            if (typeof storedPrefs === "string") {
                return storedPrefs;
            }

            const userMedia = window.matchMedia(
                "(prefers-color-scheme: dark)"
            );
            if (userMedia.matches) {
                return "dark";
            }
        }

        return "light";

    }
    const theme = getInitialTheme();
    const root = document.documentElement;
    root.className = theme;

  })`;
  return <script dangerouslySetInnerHTML={{ __html: runOnClient }} />;
};

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<MagicScriptTag />);
};
