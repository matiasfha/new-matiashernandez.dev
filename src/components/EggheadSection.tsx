import React from "react";
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
`;
const A = styled.a`
  ${tw`no-underline transform transition duration-300 inline-block text-2xl font-muli font-bold px-2 text-blue-700 border-b-2 hover:scale-110 hover:text-blue-800`}
`;

const query = graphql`
  query {
    allEgghead {
      nodes {
        ogUrl
        ogTitle
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
`;

const EggheadSection = () => {
  const data = useStaticQuery(query);
  const { nodes } = data.allEgghead;
  return (
    <Section>
      <div>
        <H2>Lecciones y Cursos en </H2> <A href="https://egghead.io">Egghead</A>
      </div>
      <Copy>
        Me encanta enseñar y tuve la gran oportunidad de ser parte de Egghead.
        Las lecciones y cursos en egghead son el primer y quizá más importante
        material audiviosual que realizo
      </Copy>
      <Gallery>
        {nodes.map((item) => (
          <Card key={item.ogUrl}>
            <a href={item.ogUrl}>
              <Img
                fluid={item.remoteImage.childImageSharp.fluid}
                alt={item.ogTitle}
              />
            </a>
          </Card>
        ))}
      </Gallery>
    </Section>
  );
};
export default EggheadSection;
