import React from "react";
import ReactMarkdown from "react-markdown";
import tw, { styled } from "twin.macro";
import DefaultGrid from "@/components/Grid";
import { bpMaxSM } from "@/lib/breakpoints";

const Section = styled(DefaultGrid)`
  grid-template-rows: minmax(42px, 50px) minmax(60px, 80px) 1fr;
  ${tw`mb-0 md:mb-2 py-0 mt-8 relative`};
  p {
    ${tw`text-gray-900 dark:text-gray-100`}
  }
`;
const H2 = styled.h2`
  ${tw`text-gray-900 text-xl md:text-2xl font-muli font-bold text-left inline-block`};
  ${tw`dark:text-gray-100`}
  p {
    ${tw`m-0`}
  }
  a {
    ${tw`no-underline transform transition duration-300 inline-block text-xl md:text-2xl font-muli font-bold px-2 text-blue-700 border-b-2 hover:scale-110 hover:text-blue-800`};
    ${tw`dark:text-sepia-400 dark:hover:text-sepia-500`}
  }
`;

const Copy = tw.p`
font-muli text-sm md:text-base
`;

const Articles = tw.div`
  grid grid-cols-1 gap-6 mt-12 mx-auto w-full md:w-11/12
`;

const Card = styled.a`
  ${tw`w-full grid mb-2 gap-6 no-underline transform transition duration-300 font-muli text-gray-500 md:hover:shadow-lg md:hover:scale-110 md:hover:bg-gray-100 md:p-2`};
  ${tw`dark:text-gray-100 dark:md:hover:bg-steel-700`};
  grid-template-columns: 200px 1fr;
  grid-template-areas: "imagen content";
  ${bpMaxSM} {
    grid-template-columns: 1fr;
    grid-template-rows: 100px 1fr;
    grid-template-areas:
      "imagen"
      "content";
  }
  img {
    grid-area: imagen;
    width: 100%;
    ${bpMaxSM} {
      width: 90%;
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
    height: 90%;
    ${tw`flex flex-col items-start justify-center mt-2 md:mt-0`}
  }
  div > p {
    ${tw`text-gray-900 text-sm dark:text-gray-100`}
    a {
      ${tw`text-blue-900 no-underline dark:text-sepia-400`}
    }
  }
  div > span {
    ${tw`text-gray-600 text-xs dark:text-gray-200`}
  }
`;

const H3 = tw.h3`
  font-muli text-gray-900 m-0 dark:text-gray-100
`;

const Tag = tw.div`
  text-gray-100 bg-gray-600 rounded-md p-4 font-muli dark:text-gray-600 dark:bg-gray-100 
`

const title = {
    es: `Estos son algunos de mis artículos en distintas publicaciones`,
};

const articles = [
  {
    title: "¿Cómo funciona la prop `key` en React?",
    link: 'https://escuelafrontend.com/articulos/como-funciona-la-prop-key-en-react',
    publication: 'Escuela Frontend'
  },
  {
    title: "La Guía Definita de Métodos de Arreglos en Javascript",
    link: 'https://escuelafrontend.com/articulos/metodos-de-arreglos',
    publication: "Escuela Frontend"
  },
  {
    title: "Escriba Javascript Moderno con Arrow Functions",
    link: "https://escuelafrontend.com/articulos/arrow-functions",
    publication: "Escuela Frontend"
  },
  {
    title: "Hugo vs Gatsby - Draft.dev",
    link: "https://draft.dev/learn/platforms/hugo-vs-gatsby",
    publication: "Draft-dev"
  }
]

export default function EFSection({ lang = "es" }) {
    return (
        <Section>
            <div>
                <H2>
                    <ReactMarkdown>{title[lang]}</ReactMarkdown>
                </H2>
            </div>
            
            <Articles>
                {articles.map((post) => {
                    return (
                        <Card href={post.link} key={post.id}>
                            <div>
                                <H3>{post.title}</H3>
                                <Tag>{post.publication}</Tag>
                            </div>
                        </Card>
                    );
                })}
            </Articles>
        </Section>
    );
}
