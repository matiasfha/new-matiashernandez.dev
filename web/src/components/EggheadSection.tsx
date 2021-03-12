import React from "react";
import ReactMarkdown from "react-markdown";
import tw, { styled } from "twin.macro";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import DefaultGrid from "@/components/Grid";
import { bpMaxSM } from "@/lib/breakpoints";

const Section = styled(DefaultGrid)`
  grid-template-rows: minmax(42px, 50px) 60px 1fr;
  ${tw`mt-8 relative`}
  p {
    ${tw`text-gray-900 dark:text-gray-100`}
  }
  h2 {
    ${tw`text-gray-900 text-xl md:text-2xl font-muli font-bold text-left inline-block`};
    ${tw`dark:text-gray-100`};
    a {
      ${tw`no-underline transform transition duration-300 inline-block text-xl md:text-2xl font-muli font-bold px-2 text-blue-700 border-b-2 hover:scale-110 hover:text-blue-800`};
      ${tw`dark:text-sepia-400 dark:hover:text-sepia-500`}
    }
  }
`;

const Gallery = tw.div`
  w-full md:w-11/12 grid grid-rows-3 md:grid-cols-3 gap-8 md:gap-4 mt-12 mx-auto md:max-h-44
`;
const Card = styled.div`
  ${tw`w-full transform transition duration-300 md:hover:shadow-lg md:hover:scale-110`};
  max-height: 160px;
  ${bpMaxSM} {
    .gatsby-image-wrapper {
      margin: 0 auto;
    }
  }
`;
const Copy = tw.p`
  font-muli text-sm md:text-lg
`;

const query = graphql`
  query MyQuery {
    es: allEgghead {
      edges {
        node {
          ogTitle
          ogUrl
          remoteImage {
            childImageSharp {
              gatsbyImageData(
                width: 320
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
      }
    }
    en: allEggheadEn {
      edges {
        node {
          ogTitle
          ogUrl
          remoteImage {
            childImageSharp {
              gatsbyImageData(
                width: 320
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
      }
    }
  }
`;

const title = {
    es: `## Lecciones y Cursos en [Egghead](https://egghead.io)`,
    en: `## Lessons and courses at [Egghead](https://egghead.io)`,
};

const copy = {
    es: `Me encanta enseñar y tuve la gran oportunidad de ser parte de Egghead.
        Las lecciones y cursos en egghead son el primer y quizá más importante
        material audiviosual que realizo`,
    en: `I love teaching and had a great opportunity to be a part of Egghead.
         The lessons and courses at egghead are the first and perhaps most important
         audio material that I make`,
};
const EggheadSection = ({ lang = "es" }) => {
    const data = useStaticQuery(query);
    const { edges } = data[lang];
    return (
        <Section>
            <ReactMarkdown>{title[lang]}</ReactMarkdown>
            <Copy>{copy[lang]}</Copy>
            <Gallery>
                {edges.map(({ node }) => {
                    const image = getImage(node.remoteImage);
                    return (
                        <Card key={node.ogUrl}>
                            <a href={node.ogUrl}>
                                <GatsbyImage alt={node.ogTitle} image={image} />
                            </a>
                        </Card>
                    );
                })}
            </Gallery>
        </Section>
    );
};

export default EggheadSection;
