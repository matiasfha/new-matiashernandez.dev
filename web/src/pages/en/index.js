import React from "react";
import { graphql } from "gatsby";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import EggheadSection from "@/components/EggheadSection";
import ArticlesSection from "@/components/ArticlesSection";
import FCCSection from "@/components/FCCSection";

export default function Index({ data: { site } }) {
  const frontmatter = {
    ...site.siteMetadata,
    keywords: site.siteMetadata.keywords.join(", "),
  };
  return (
    <Layout frontmatter={frontmatter} lang="en">
      <Hero lang="en" />
      <EggheadSection lang="en" />
      <FCCSection lang="en" />
      <ArticlesSection lang="en" />
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
        keywords
        siteUrl
        image
      }
    }
  }
`;
