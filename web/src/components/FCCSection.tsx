import React from "react";
import tw, { styled } from "twin.macro";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
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
  allFeedFccEs {
    nodes {
      contentSnippet
      id
      image {
        attrs {
          url
        }
      }
      link
      isoDate(formatString: "DD/MM/YYYY")
      title
    }
  }
}
`;

export default function FreecodecampSection() {
  const { allFeedFccEs } = useStaticQuery(query);
  return (
    <Section>
      <div>
        <H2>También escribo en <A href="http://freecodecamp.org/espanol/news/author/matias-hernandez/">Freecodecamp</A></H2>
      </div>
      <Copy>
        {`Freecodecamp es una organización sin fines de lucro para la enseñanza de desarrollo de software y formación de futuros desarrolladores.
Tengo el honor y agrade de escribir para su editorial en español e ingles.`}
      </Copy>
      <Articles>
        {allFeedFccEs.nodes.map(post => {
          return (
            <Card href={post.link} key={post.id}>
              <img
                src={post.image?.attrs?.url}
                alt={post.title}
              />
              <div>
                <H3>{post.title}</H3>
                <p>{post.contentSnippet}</p>
                <span>{post.isoDate}</span>
              </div>
            </Card>
          );
        })}
      </Articles>
    </Section>
  );
}
