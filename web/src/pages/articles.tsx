import React from "react";
import { graphql } from "gatsby";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import FCCSection from "@/components/FCCSection";
import EFSection from '@/components/EFSection';

export default function Index({ data: { site } }) {
  const frontmatter = {
    ...site.metadata,
    keywords: site.metadata.keywords.join(", "),
  };
  return (
    <Layout frontmatter={frontmatter}>
      <Hero />
      <EFSection />
      <FCCSection />
      
    </Layout>
  );
}

export const pageQuery = graphql`
  query metaData {
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