import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import tw, { styled } from "twin.macro";
import { Buzzsprout } from "mdx-embed";

import DefaultGrid from "@/components/Grid";

const Section = styled(DefaultGrid)`
  padding: 2rem 0;
  position: relative;
  grid-template-rows: minmax(42px, 80px) minmax(60px, 80px) 1fr;
  margin-top: 2rem;
  p {
    ${tw`text-gray-900`}
  }
`;
const H2 = styled.h2`
  ${tw`text-gray-900 text-xl md:text-2xl font-muli font-bold text-left inline-block`}
`;
const A = styled.a`
  ${tw`no-underline transform transition duration-300 inline-block text-xl md:text-2xl font-muli font-bold px-2 text-blue-700 border-b-2 hover:scale-110 hover:text-blue-800`}
`;

const Copy = tw.p`
  font-muli text-sm md:text-base
`;

const Podcasts = tw.div`
grid grid-rows-2 mt-12 mx-auto w-11/12`;

const Card2 = styled.div`
  ${tw`transform transition duration-300 hover:shadow-lg hover:scale-110 mb-4`}
  max-height: 200px;
`;

const query = graphql`
  query {
    allPodcastEpisodeCafeConTech(
      limit: 1
      sort: { fields: published_at, order: DESC }
    ) {
      nodes {
        audio_url
        description
        published_at(formatString: "DD/MM/YYYY")
        remoteImage {
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
    }

    allPodcastEpisodeControlRemoto(
      limit: 1
      sort: { fields: published_at, order: DESC }
    ) {
      nodes {
        audio_url
        description
        published_at(formatString: "DD/MM/YYYY")
        remoteImage {
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
    }
  }
`;
export default function PodcastSection() {
  const {
    allPodcastEpisodeCafeConTech,
    allPodcastEpisodeControlRemoto,
  } = useStaticQuery(query);
  const cafeConTech = new URL(
    allPodcastEpisodeCafeConTech.nodes[0].audio_url
  ).pathname
    .slice(1)
    .replace(/\.[^/.]+$/, "");
  const controlRemoto = new URL(
    allPodcastEpisodeControlRemoto.nodes[0].audio_url
  ).pathname
    .slice(1)
    .replace(/\.[^/.]+$/, "");
  return (
    <Section>
      <div>
        <H2> Podcasts
        <A href="https://controlremoto.io">Control Remoto</A>
        y <A href="http://www.cafecon.tech">Café con Tech </A>
      </H2>
      </div>
      <Copy>
        Me encanta enseñar y tuve la gran oportunidad de ser parte de Egghead.
        Las lecciones y cursos en egghead son el primer y quizá más importante
        material audiviosual que realizo
      </Copy>
      <Podcasts>
        <Card2>
          <Buzzsprout buzzsproutId={cafeConTech} />
        </Card2>
        <Card2>
          <Buzzsprout buzzsproutId={controlRemoto} />
        </Card2>
      </Podcasts>
    </Section>
  );
}
