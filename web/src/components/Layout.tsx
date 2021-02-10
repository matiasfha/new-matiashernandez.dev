import React, { Fragment, ReactChildren } from "react";
import { Global } from "@emotion/react";
import tw, { css } from "twin.macro";
import {
    EggheadLesson,
    Buzzsprout,
    Youtube,
    Tweet,
    CodeSandbox,
} from "mdx-embed";
import { MDXProvider } from "@mdx-js/react";
import { MDXGlobalComponents, MDXLayoutComponents } from "@/components/mdx";
import NavBar from "@/components/NavBar";
import Seo, { SiteT, FrontMatterT } from "@/components/Seo";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeToggle";
import "prismjs/themes/prism-okaidia.css";

const GlobalStyle = css`
  html,
  body {
    margin: 0;
    padding: 0;
    ${tw`bg-white bg-gradient-to-r from-white via-steel-200 to-steel-50 dark:from-steel-900 dark:via-steel-800 dark:to-steel-700`}
  }

  pre {
    background-color: #2f1e2e !important;
    border-radius: 4px;
    font-size: 14px;
  }

  .gatsby-highlight-code-line {
    background-color: #4f424c;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 1em;
  }
  .dark #githubLogo {
    filter: invert(1);
  }
`;

const Content = tw.div`
max-w-full max-h-full relative px-4 md:px-2
`;
type PropsT = {
    site: {
        siteMetadata: SiteT;
    };
    frontmatter: FrontMatterT;
    children: ReactChildren;
};
const Layout: React.FC<PropsT> = ({
    frontmatter = {},
    children,
    lang = "es",
}: PropsT) => {
    return (
        <ThemeProvider>
            <Seo frontmatter={frontmatter} />
            <Global styles={GlobalStyle} />

            <div>
                <NavBar lang={lang} />
                <Content>
                    <MDXProvider
                        components={{
                            ...MDXLayoutComponents,
                            ...MDXGlobalComponents,
                            EggheadLesson,
                            Buzzsprout,
                            Youtube,
                            Tweet,
                            CodeSandbox,
                        }}
                    >
                        {children}
                    </MDXProvider>
                    <Footer />
                </Content>
            </div>
        </ThemeProvider>
    );
};

export default Layout;
