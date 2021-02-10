import React from "react";
import tw, { styled } from "twin.macro";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import ReactMarkdown from "react-markdown";
import DefaultGrid from "@/components/Grid";
import { bpMaxSM } from "@/lib/breakpoints";

const Section = styled(DefaultGrid)`
  grid-template-rows: 42px 60px 1fr;
  ${tw`mb-0 md:mb-2 py-0 mt-8 relative`};
  p {
    ${tw`text-gray-900 dark:text-gray-100`}
  }
`;
const H2 = styled.h1`
  ${tw`text-gray-900 text-2xl font-muli font-bold text-left inline-block`};
  ${tw`dark:text-gray-100`}
`;
const A = styled.a`
  ${tw`no-underline transform transition duration-300 inline-block text-2xl font-muli font-bold px-2 text-blue-700 border-b-2 hover:scale-110 hover:text-blue-800`};
  ${tw`dark:text-gray-100`}
`;

const Copy = tw.p`
font-muli
`;

const Articles = tw.div`
  grid grid-cols-1 gap-6 m-0 md:mt-12 mx-auto w-11/12
`;

const Card = styled.a`
  ${tw`w-full grid mb-2 gap-6 no-underline transform transition duration-300 font-muli text-gray-500 md:hover:shadow-lg md:hover:scale-110 md:hover:bg-gray-100 md:p-2`};
  ${tw`dark:text-gray-100 dark:md:hover:bg-steel-700`};
  grid-template-columns: 200px 1fr;
  grid-template-areas: "imagen content";
  ${bpMaxSM} {
    grid-template-columns: 1fr;
    grid-template-rows: 200px 1fr;
    grid-template-areas:
      "imagen"
      "content";
  }
  picture,
  .gatsby-image-wrapper,
  source,
  img {
    grid-area: imagen;
    width: 100%;
    ${bpMaxSM} {
      max-width: 90%;
      margin: 0 auto;
    }
    max-height: 200px;
  }
  span:first-of-type {
    ${tw`text-gray-600 text-xs`}
    ${tw`dark:text-gray-200`}
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
    ${tw`text-gray-900 text-sm dark:text-gray-100`}
  }
  a {
    ${tw`text-blue-900 no-underline dark:text-sepia-400`}
  }
  div > span {
    ${tw`text-gray-600 text-xs dark:text-gray-200`}
  }
`;

const H3 = styled.h3`
  ${tw`font-muli text-gray-900 m-0 dark:text-gray-200`};
  a {
    ${tw`no-underline`}
  }
`;

const query = graphql`
  query {
    allSanityTalks {
      nodes {
        description
        id
        image {
          asset {
            fluid {
              ...GatsbySanityImageFluid
            }
          }
        }
        title
        link
      }
    }
  }
`;

export const TalksList = ({ articles }) => {
    return (
        <Articles>
            {articles.map((post) => {
                return (
                    <Card key={post.id}>
                        {/* <span>{post.frontmatter.date}</span> */}
                        <Img fluid={post.image.asset.fluid} alt={post.title} />
                        <div>
                            <H3>
                                <a href={post.link}>{post.title}</a>
                            </H3>
                            <ReactMarkdown>{post.description}</ReactMarkdown>
                        </div>
                    </Card>
                );
            })}
        </Articles>
    );
};

export default function TalksSection() {
    const { allSanityTalks } = useStaticQuery(query);
    return (
        <Section>
            <div>
                <H2>Y hago algunas Charlas</H2>
            </div>
            <Copy>También me gusta participar en meetups o encuentros.</Copy>
            <TalksList articles={allSanityTalks.nodes} />
        </Section>
    );
}
