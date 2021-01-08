import React from "react";
import tw, { styled } from "twin.macro";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import ReactMarkdown from 'react-markdown'
import DefaultGrid from "@/components/Grid";

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
  span:first-of-type {
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

const query = graphql`
  query {
    allSanityTalks {

      nodes {
        description
        id
        image {
          asset {
            fluid {
              src
            }
          }
        }
        title
        link
      }
    }
  }

`;

export const TalksList = ({ articles}) => {
 return (
      <Articles>
        {articles.map((post) => {
          return (
            <Card href={post.link} key={post.id}>
              {/* <span>{post.frontmatter.date}</span> */}
              <img
                src={post.image.asset.fluid.src}
                alt={post.title}
              />
              <div>
                <H3>{post.title}</H3>
                <p><ReactMarkdown>{post.description}</ReactMarkdown></p>
              </div>
            </Card>
          );
        })}
      </Articles>
 )
}

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
