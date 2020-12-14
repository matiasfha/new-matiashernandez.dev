import React, { Fragment, ReactChildren } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { createGlobalStyle } from 'styled-components'
import { MDXGlobalComponents, MDXLayoutComponents } from '@/components/mdx'
import tw from 'twin.macro'

import NavBar from '@/components/NavBar'
import Seo, { SiteT, FrontMatterT } from '@/components/Seo'
import Footer from '@/components/Footer'
// Import Twitter from "@/components/Twitter";

import 'prismjs/themes/prism-okaidia.css'

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
background-image: linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 255, 255) 88%, rgb(244, 247, 250) 100%);
background: rgb(255,255,255);
background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(219,234,241,1) 53%, rgba(244,247,250,1) 100%);
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
`

const Container = tw.div`
  top-0 relative  w-full h-screen
`

type PropsT = {
  site: {
    siteMetadata: SiteT
  }
  frontmatter: FrontMatterT
  children: ReactChildren
}
const Layout: React.FC<PropsT> = ({ frontmatter = {}, children }: PropsT) => {
  return (
    <Fragment>
      <Seo frontmatter={frontmatter} />
      <GlobalStyle />

      <MDXProvider
        components={{
          ...MDXLayoutComponents,
          ...MDXGlobalComponents,
        }}
      >
        <Container>
          <NavBar />
          {children}
        </Container>
      </MDXProvider>
    </Fragment>
  )
}

export default Layout
