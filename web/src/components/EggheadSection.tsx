import React from "react";
import ReactMarkdown from 'react-markdown';
import tw, { styled } from "twin.macro";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import DefaultGrid from "@/components/Grid";

const Section = styled(DefaultGrid)`
  grid-template-rows: 42px 60px 200px;
  ${tw`pt-8 relative`}
  p {
    ${tw`text-gray-900`}
  }
  h2 {
    ${tw`text-gray-900 text-2xl font-muli font-bold text-left inline-block`}
    a {
      ${tw`no-underline transform transition duration-300 inline-block text-2xl font-muli font-bold px-2 text-blue-700 border-b-2 hover:scale-110 hover:text-blue-800`}
    }
  }
`;

const Gallery = tw.div`
  w-11/12 grid grid-cols-3 gap-4 mt-12 mx-auto
`;
const Card = styled.div`
  ${tw`w-full transform transition duration-300 hover:shadow-lg hover:scale-110`};
  max-height: 160px;
`;
const Copy = tw.p`
  font-muli
`;

const H2 = styled.h1`
  ${tw`text-gray-900 text-2xl font-muli font-bold text-left inline-block`}
p {
 ${tw`m-0`}
}
a {
  ${tw`no-underline transform transition duration-300 inline-block text-2xl font-muli font-bold px-2 text-blue-700 border-b-2 hover:scale-110 hover:text-blue-800`}

}
`;

const query = graphql`
query MyQuery {
  allEgghead {
    edges {
      node {
        ogTitle
        ogUrl
        remoteImage {
          childImageSharp {
            fluid(maxWidth: 320) {
              ...GatsbyImageSharpFluid
              ...GatsbyImageSharpFluidLimitPresentationSize
            }
          }
        }
      }
    }
  }
}
`;

const title = {
  es: `Lecciones y Cursos en [Egghead](https://egghead.io)`,
  en: `Lessons and courses at [Egghead](https://egghead.io)`
}

const copy = {
  es: `Me encanta enseñar y tuve la gran oportunidad de ser parte de Egghead.
        Las lecciones y cursos en egghead son el primer y quizá más importante
        material audiviosual que realizo`,
  en:`I love teaching and had a great opportunity to be a part of Egghead.
         The lessons and courses at egghead are the first and perhaps most important
         audio material that I make`
}
const EggheadSection = ({ lang = 'es' }) => {
  const data = useStaticQuery(query);
  const { edges } = data.allEgghead;
  return (
    <Section>
      <div>
      <H2><ReactMarkdown>{title[lang]}</ReactMarkdown></H2>
      </div>
      <Copy>{copy[lang]}
      </Copy>
      <Gallery>
        {edges.map(({node}) => {
        return(
          <Card key={node.ogUrl}>
            <a href={node.ogUrl}>
              <Img
                fluid={node.remoteImage.childImageSharp.fluid}
                alt={node.ogTitle}
              />
            </a>
          </Card>
        )})}
      </Gallery>
    </Section>
  );
};

export default EggheadSection;
