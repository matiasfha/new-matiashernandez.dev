import React from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import EggheadSection from "@/components/EggheadSection";
import PodcastSection from "@/components/PodcastSection";
import ArticlesSection from "@/components/ArticlesSection";
import TalksSection from "@/components/TalksSection";
import FCCSection from "@/components/FCCSection";

export default function Index() {
  return (
    <Layout>
      <Hero />
      <EggheadSection />
      <PodcastSection />
      <FCCSection />
      <ArticlesSection />
      <TalksSection />
    </Layout>
  );
}