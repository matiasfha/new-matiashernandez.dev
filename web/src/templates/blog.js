import React from "react";
import tw from "twin.macro";
import Seo from "@/components/Seo";
import Layout from "@/components/Layout";
import Grid from "@/components/Grid";
import { ArticlesList } from "@/components/ArticlesSection";

const Heading = tw.p`
  pt-16 max-w-screen-md  text-gray-900 dark:text-gray-200 text-sm md:text-lg
`;

export default function BlogTemplate({ children, pageContext }) {
  const frontmatter = {
    ...pageContext.frontmatter,
    title: `${pageContext.frontmatter.title} | Listado de Artículos`,
  };
  return (
    <Layout frontmatter={frontmatter}>
      <Grid>
        <Heading>
          Aquí encontrarás el listado completo de artículos de este jardín
          digital
        </Heading>
        <ArticlesList articles={pageContext.nodes} />
      </Grid>
    </Layout>
  );
}
