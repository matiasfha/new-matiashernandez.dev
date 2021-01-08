import React from "react";
import Seo from "@/components/Seo";
import Layout from "@/components/Layout";
import Grid from "@/components/Grid";
import { ArticlesList } from "@/components/ArticlesSection";

export default function BlogTemplate({ children, pageContext }) {
  return (
    <Layout>
      <Grid>
        <ArticlesList articles={pageContext.nodes} />
      </Grid>
    </Layout>
  );
}
