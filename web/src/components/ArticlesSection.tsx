import React from "react";
import tw, { styled } from "twin.macro";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import DefaultGrid from "@/components/Grid";
import { bpMaxSM } from "@/lib/breakpoints";

const Section = styled(DefaultGrid)`
  padding: 2rem 0;
  position: relative;
  grid-template-rows: 42px minmax(60px, 170px) 1fr;
  margin-top: 2rem;
  p {
    ${tw`text-gray-900`}
  }
`;
const H2 = styled.h1`
  ${tw`text-gray-900 text-xl md:text-2xl font-muli font-bold text-left inline-block`}
p {
${tw`m-0`}
}
a{
  ${tw`no-underline transform transition duration-300 inline-block text-xl md:text-2xl font-muli font-bold px-2 text-blue-700 border-b-2 hover:scale-110 hover:text-blue-800`}
}
`;

const Copy = tw.p`
font-muli text-sm md:text-base
`;

const Articles = tw.div`
  grid grid-cols-1 gap-6 mt-12 mx-auto w-full md:w-11/12 mt-16
`;

const Card = styled.a`
  ${tw`grid mb-4 gap-8 w-full no-underline transform transition duration-300 font-muli text-gray-500 md:hover:shadow-lg md:hover:scale-110 md:hover:bg-gray-100 md:p-4`};
  grid-template-columns: 200px 1fr;
  grid-template-areas: "imagen content";
  ${bpMaxSM} {

    grid-template-columns: 1fr;
    grid-template-rows: 200px 1fr;
    grid-template-areas: "imagen"
  "content";

  }
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
en: allMdx(filter: {frontmatter: {favorite: {eq: true}, lang: {eq: "en"}}}) {
      nodes {
id
        slug
        frontmatter {
          banner {
            childImageSharp {
              fluid {
              ...GatsbyImageSharpFluid
              }
            }
          }
          title
          description
          keywords
        }
      }
    }
es: allMdx(filter: {frontmatter: {favorite: {eq: true}, lang: {ne: "en"}}}) {
      nodes {
id
        slug
        frontmatter {
          banner {
            childImageSharp {
              fluid {
              ...GatsbyImageSharpFluid
              }
            }
          }
          title
          description
          keywords
        }
      }
    }

  }


`;

export const ArticlesList = ({ articles}) => {
 return (
      <Articles>
        {articles.map((post) => {
          const keywords = post.frontmatter.keywords
            .map((item) => `#${item.trim()}`)
            .join(", ");
          return (
            <Card href={`/${post.slug}`} key={post.id}>
              {post.frontmatter.banner?.childImageSharp?.fluid==null ? null :
              <Img
                fluid={post.frontmatter.banner.childImageSharp.fluid}
                alt={post.frontmatter.alt}
                />}
              <div>
                <H3>{post.frontmatter.title}</H3>
                <p>{post.frontmatter.description}</p>
                <span>{post.frontmatter.date}</span>
                <span>{keywords}</span>
              </div>
            </Card>
          );
        })}
      </Articles>
 )
}

const title = {
  es: `Escribo algunos Artículos`,
  en: `I write some Articles`,
}

const copy = {
  es: `Un digital garden/jardín digital es un espacio digital lleno de
                    ideas interconectadas e información recolectada, curada y siempre en
                    progreso durante el tiempo. Esto implica que dentro de este espacio
                    existirá contenido que aún no "florece" o incluso que se encuentra
                    en estado de semilla o germinación. Un conjunto de ideas que se
                    mantienen en progreso. Estará enfocado en Javascript, React y
                    desarrollo web en general.

        Esta es mi selección personal de esas
                    semillas.`,
  en: `A digital garden is a digital space full of
                     interconnected ideas and information collected, curated and always in
                     progress over time. This implies that within this space
                     there will be content that is not yet "blooming" or even found
                     in the state of seed or germination. A set of ideas that
                     keep in progress. It will be focused on Javascript, React and
                     web development in general.

         This is my personal selection of those
                     seeds.`
}

export default function ArticlesSection({ lang = 'es'}) {
  const { es, en } = useStaticQuery(query);

  return (
    <Section>
      <div>
        <H2>{title[lang]}</H2>
      </div>
      <Copy>{copy[lang]}
      </Copy>
      <ArticlesList articles={lang === 'es'? es.nodes : en.nodes} />
      </Section>
  );
}
