import React from "react";

import Seo from "@/components/Seo";
import Layout from "@/components/Layout";
import Grid from "@/components/Grid";

function Page({ children, pageContext: { frontmatter } }) {
  return (
    <>
      <Seo frontmatter={frontmatter} />
      <Layout>
        <Grid>{children}</Grid>
      </Layout>
    </>
  );
}

export default Page;
