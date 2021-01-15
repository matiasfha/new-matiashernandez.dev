import React from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import EggheadSection from "@/components/EggheadSection";
import ArticlesSection from "@/components/ArticlesSection";
import FCCSection from "@/components/FCCSection";

export default function Index() {
  return (
    <Layout lang="en">
      <Hero lang="en" />
      <EggheadSection lang="en" />
      <FCCSection lang="en" />
      <ArticlesSection lang="en" />
    </Layout>
  );
}
