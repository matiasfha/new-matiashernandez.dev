import React from "react";
import { graphql } from "gatsby";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import FCCSection from "@/components/FCCSection";
import EFSection from '@/components/EFSection';

export default function Index({ data: { site } }) {
  const frontmatter = {
    ...site.siteMetadata,
    keywords: site.siteMetadata.keywords.join(", "),
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
