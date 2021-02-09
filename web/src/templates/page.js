import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import tw, { styled } from "twin.macro";
import Seo from "@/components/Seo";
import Layout from "@/components/Layout";
import DefaultGrid from "@/components/Grid";

const Grid = styled(DefaultGrid)`
  ul {
    ${tw`font-muli text-lg text-gray-900 dark:text-gray-100`}
  }
  a {
    ${tw`no-underline transform transition duration-300 inline-block font-muli font-bold text-blue-700  hover:text-blue-800 dark:text-sepia-400 dark:hover:text-sepia-400`}
  }
  p {
    ${tw`text-gray-900 dark:text-gray-100 font-muli text-lg`}
  }
  h2 {
    ${tw`text-lg md:text-xl text-gray-900 dark:text-gray-100 font-chivo font-bold leading-8`}
  }
  h1 {
    ${tw`text-gray-900 dark:text-gray-100 text-4xl font-muli font-bold text-left self-center`}
    span {
      ${tw`no-underline text-red hover:underline cursor-pointer`}
    }
  }
`;

function Page({ children, pageContext }) {
  const frontmatter = pageContext.frontmatter
    ? pageContext.frontmatter
    : { ...pageContext };
  return (
    <>
      <Layout frontmatter={frontmatter} lang={pageContext.locale}>
        <Grid>
          <MDXRenderer>{pageContext.childMdx.body}</MDXRenderer>
        </Grid>
      </Layout>
    </>
  );
}

export default Page;
