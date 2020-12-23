import React from "react";
import { graphql } from "gatsby";
import tw, { styled } from "twin.macro";
import { Buzzsprout } from "mdx-embed";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import DefaultGrid from "@/components/Grid";
import EggheadSection from "@/components/EggheadSection";
import PodcastSection from "@/components/PodcastSection";
import ArticlesSection from "@/components/ArticlesSection";

const Section = styled(DefaultGrid)`
  padding: 2rem 0;
  position: relative;
  grid-template-rows: 42px minmax(60px, 80px) 1fr;
  margin-top: 2rem;
  p {
    ${tw`text-gray-900`}
  }
`;
const H2 = styled.h1`
  ${tw`text-gray-900 text-2xl font-muli font-bold text-left inline-block`}
`;
const A = styled.a`
  ${tw`no-underline transform transition duration-300 inline-block text-2xl font-muli font-bold px-2 text-blue-700 border-b-2 hover:scale-110 hover:text-blue-800`}
`;

const Copy = tw.p`
font-muli
`;

const Articles = tw.div`
  grid grid-cols-1 gap-6 mt-12 mx-auto w-11/12
`;
const Card = styled.a`
  ${tw`grid mb-4 gap-8 w-full no-underline transform transition duration-300 hover:shadow-lg hover:scale-110 font-muli text-gray-500`};
  grid-template-columns: 200px 1fr;
  grid-template-areas: "imagen content";
  img {
    grid-area: imagen;
    width: 100%;
    max-height: 200px;
  }
  span:first-child {
    ${tw`text-gray-600 text-xs`}
  }
  div {
    grid-area: content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    height: 90%;
  }
  div > p {
    ${tw`text-gray-900 text-sm`}
    a {
      ${tw`text-blue-900 no-underline`}
    }
  }
  div > span {
    ${tw`text-gray-600 text-xs`}
  }
`;

const H3 = tw.h3`
  font-muli text-gray-900 m-0
`;
export default function Index() {
  return (
    <Layout>
      <Hero />
      <EggheadSection />
      <PodcastSection />
      <ArticlesSection />
      <Section>
        <div>
          <H2>Y hago algunas</H2>
          <A href="/talks">charlas</A>
        </div>
        <Copy>También me gusta participar en meetups o encuentros.</Copy>
        <Articles>
          <Card href="http:presentaciones.matiashernandez.dev">
            <img src="https:presentaciones.matiashernandez.dev/assets/images/charla1.png" />
            <div>
              <H3>Clojure 101 Para javascripters</H3>
              <p>
                20/10/2020{" "}
                <a href="https:valdivia.beerjs.cl/">BeerJS Valdivida</a> 📺
                Video en Youtube
                <br />
                11/11/2020{" "}
                <a href="https:valdivia.beerjs.cl/">
                  Facebook Developers Circles: Santiago
                </a>
              </p>
            </div>
          </Card>
        </Articles>
      </Section>
    </Layout>
  );
}
