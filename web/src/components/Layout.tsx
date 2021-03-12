import React, { Fragment, ReactChildren } from "react";
import { Global } from "@emotion/react";
import tw, { css } from "twin.macro";
import {
    EggheadLesson,
    Buzzsprout,
    YouTube,
    Tweet,
    CodeSandbox,
    Snack,
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
    ${tw`bg-blue-50 dark:bg-bg bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 dark:from-black dark:via-bg dark:to-black w-screen`}
  }

  pre {
    ${tw`bg-steel-900`}
    border-radius: 4px;
    font-size: 14px;
  }

  .gatsby-highlight-code-line {
    ${tw`bg-steel-900`}
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 1em;
  }
  code,
  code[class*="language-"],
  pre[class*="language-"] {
    ${tw`bg-steel-900`}
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
    isBlogPost: boolean;
    lang: "es" | "en";
};
const Layout: React.FC<PropsT> = ({
    frontmatter = {},
    children,
    isBlogPost = false,
    lang = "es",
}: PropsT) => {
    return (
        <ThemeProvider>
            <Seo frontmatter={frontmatter} isBlogPost={isBlogPost} lang={lang} />
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
                            YouTube,
                            Tweet,
                            CodeSandbox,
                            Snack,
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
