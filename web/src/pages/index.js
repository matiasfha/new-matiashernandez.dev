import React from "react";
import { graphql } from "gatsby";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import EggheadSection from "@/components/EggheadSection";
import PodcastSection from "@/components/PodcastSection";
import ArticlesSection from "@/components/ArticlesSection";
import TalksSection from "@/components/TalksSection";
import FCCSection from "@/components/FCCSection";

export default function Index({ data: { site } }) {
  const frontmatter = {
    ...site.siteMetadata,
    keywords: site.siteMetadata.keywords.join(", "),
  };
  return (
    <Layout frontmatter={frontmatter}>
      <Hero />
      <EggheadSection />
      <PodcastSection />
      <FCCSection />
      <ArticlesSection />
      <TalksSection />
    </Layout>
  );
}

export const pageQuery = graphql`
  query siteMetadata {
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
