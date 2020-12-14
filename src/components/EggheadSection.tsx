import React from 'react'
import tw, { styled } from 'twin.macro'
import { useStaticQuery, graphql } from 'gatsby'
import DefaultGrid from '@/components/Grid'

const Section = styled(DefaultGrid)`
  padding: 2rem 0;
  position: relative;
  grid-template-rows: 42px 60px 200px;
`

const Gallery = tw.div`
  w-11/12 grid grid-cols-3 gap-4 mt-12 mx-auto
`
const Card = styled.div`
  ${tw`w-full transform transition duration-500 hover:shadow-lg `};
  img {
    ${tw`w-full transform transition duration-500 hover:scale-110`};
  }
`
const Copy = tw.p`
font-muli
`

const H2 = styled.h1`
  ${tw`text-gray-800 text-2xl font-muli font-bold text-left inline-block`}
`
const A = styled.a`
  ${tw`no-underline transform transition duration-300 inline-block text-2xl font-muli font-bold px-2`}
  color: rgb(4, 67, 172);
  border-width: 0 0 2px 0;
  &:hover {
    ${tw`scale-110 border-solid`};
    border-color: rgb(4, 67, 172);
  }
`

const query = graphql`
  query {
    allEgghead {
      nodes {
        ogUrl
        ogTitle
        image {
          childImageSharp {
            fluid(quality: 10) {
              ...GatsbyImageSharpFluid
              originalImg
            }
            fixed(quality: 10, width: 340, height: 190) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`

const EggheadSection = () => {
  const data = useStaticQuery(query)
  const { nodes } = data.allEgghead
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
              <img
                src={item.image.childImageSharp.fluid.originalImg}
                alt={item.ogTitle}
              />
            </a>
          </Card>
        ))}
      </Gallery>
    </Section>
  )
}
export default EggheadSection
