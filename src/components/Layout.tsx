import React, { Fragment, ReactChildren } from "react";
import { Global, css } from "@emotion/react";
import tw from "twin.macro";
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

import "prismjs/themes/prism-okaidia.css";

const GlobalStyle = css`
  html,
  body {
    margin: 0;
    padding: 0;
    background: rgb(255, 255, 255);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(219, 234, 241, 1) 53%,
      rgba(244, 247, 250, 1) 100%
    );
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
`;

const Container = tw.div`
  top-0 relative  w-full h-screen
`;

const Content = tw.div`
  max-w-full relative px-8 mb-16
`;
type PropsT = {
  site: {
    siteMetadata: SiteT;
  };
  frontmatter: FrontMatterT;
  children: ReactChildren;
};
const Layout: React.FC<PropsT> = ({ frontmatter = {}, children }: PropsT) => {
  return (
    <Fragment>
      <Seo frontmatter={frontmatter} />
      <Global styles={GlobalStyle} />

      <Container>
        <NavBar />
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
        </Content>
        <Footer />
      </Container>
    </Fragment>
  );
};

export default Layout;
