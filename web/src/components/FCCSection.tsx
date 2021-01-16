import React from "react";
import ReactMarkdown from 'react-markdown';
import tw, { styled } from "twin.macro";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import DefaultGrid from "@/components/Grid";
import { bpMaxSM } from "@/lib/breakpoints";

const Section = styled(DefaultGrid)`
  padding: 2rem 0;
  position: relative;
  grid-template-rows: minmax(42px, 50px) minmax(60px, 80px) 1fr;
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
  a {
    ${tw`no-underline transform transition duration-300 inline-block text-xl md:text-2xl font-muli font-bold px-2 text-blue-700 border-b-2 hover:scale-110 hover:text-blue-800`}
  }
`;

const Copy = tw.p`
font-muli text-sm md:text-base
`;

const Articles = tw.div`
  grid grid-cols-1 gap-6 mt-12 mx-auto w-full md:w-11/12
`;

const Card = styled.a`
  ${tw`w-full grid mb-4 gap-8 no-underline transform transition duration-300 font-muli text-gray-500 md:hover:shadow-lg md:hover:scale-110 md:hover:bg-gray-100 md:p-4`};
  grid-template-columns: 200px 1fr;
  grid-template-areas: "imagen content";
  ${bpMaxSM} {

    grid-template-columns: 1fr;
    grid-template-rows: 100px 1fr;
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
  allFeedFccEn {
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

const title = {
 es: `También escribo en [Freecodecamp](http://freecodecamp.org/espanol/news/author/matias-hernandez)`,
en: `I also write on [Freecodecamp](http://freecodecamp.org/news/author/matias-hernandez)`
}

const copy = {
  es: `Freecodecamp es una organización sin fines de lucro para la enseñanza de desarrollo de software y formación de futuros desarrolladores.
Tengo el honor y agrade de escribir para su editorial en español e ingles.`,
  en: `Freecodecamp is a non-profit organization for teaching software development and training future developers.
I have the honor and pleasure to write for your editorial in Spanish and English.`
}

export default function FreecodecampSection({ lang = 'es' }) {
  const { allFeedFccEs, allFeedFccEn } = useStaticQuery(query);
  const data = lang === 'es' ? allFeedFccEs : allFeedFccEn
  return (
    <Section>
      <div>
        <H2><ReactMarkdown>{title[lang]}</ReactMarkdown></H2>
      </div>
      <Copy>{copy[lang]}
      </Copy>
      <Articles>
        {data.nodes.map(post => {
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
