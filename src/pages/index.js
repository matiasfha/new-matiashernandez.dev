import React from 'react'
import { graphql } from 'gatsby'
import tw, { styled } from 'twin.macro'

import Layout from '@/components/Layout'
import Hero from '@/components/Hero'
import DefaultGrid from '@/components/Grid'

const Container = tw.div`
  max-w-full relative px-8 h-screen mb-16
`

const Section = styled(DefaultGrid)`
  padding: 2rem 0;
  position: relative;
  grid-template-rows: 42px 60px 200px;
`

const Gallery = tw.div`
  grid grid-cols-3 gap-1 pt-6
`
const Card = styled.div`
  ${tw`w-80 transform transition duration-500 hover:shadow-lg `};
  img {
    ${tw`w-80 transform transition duration-500 hover:scale-110`};
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

const Podcasts = tw.div`
grid grid-rows-2 gap-y-40 pt-6`
const Card2 = styled.a`
  ${tw`text-gray-700 w-full grid transform transition duration-500 hover:scale-105 hover:shadow-lg no-underline`};
  grid-template-columns: 180px 1fr;
  img {
    ${tw`w-36`};
  }
`
const H3 = tw.h3`
  font-bold font-muli text-gray-800 pt-0 mt-0
`

const Date = tw.date`
font-muli text-gray-600 text-base
`
export default function Index({ data: { site } }) {
  const {
    siteMetadata: {
      pageContent: { eggheadPlaylist },
    },
  } = site
  return (
    <Layout>
      <Hero />
      <Container>
        <Section>
          <div>
            <H2>Lecciones y Cursos en </H2>{' '}
            <A href="https://egghead.io">Egghead</A>
          </div>
          <Copy>
            Me encanta enseñar y tuve la gran oportunidad de ser parte de
            Egghead. Las lecciones y cursos en egghead son el primer y quizá más
            importante material audiviosual que realizo
          </Copy>
          <Gallery>
            {eggheadPlaylist.map((item) => (
              <Card key={item.url}>
                <a href={item.url}>
                  <img src={item.img} alt={item.title} />
                </a>
              </Card>
            ))}
          </Gallery>
        </Section>
        <Section>
          <div>
            <H2> Podcasts </H2>
            <A href="https://controlremoto.io">Control Remoto</A>
            <H2>y</H2>
            <A href="http://www.cafecon.tech"> Café con Tech </A>
          </div>
          <Copy>
            Me encanta enseñar y tuve la gran oportunidad de ser parte de
            Egghead. Las lecciones y cursos en egghead son el primer y quizá más
            importante material audiviosual que realizo
          </Copy>
          <Podcasts>
            <Card2 href="">
              <img src="https://matiashernandez.dev/static/669b89366a7e928e7f837edac0133367/2ae96/8d66eb17bb7d02ca4856ab443a78f2148cafbb129f58a3c81282007c6fe24ff2.jpg" />
              <div>
                <H3>JAMStack ¿Qué es SSG y SSR?</H3>
                <Copy>
                  Me encanta enseñar y tuve la gran oportunidad de ser parte de
                  Egghead. Las lecciones y cursos en egghead son el primer y
                  quizá más importante material audiviosual que realizo.
                </Copy>
                <Date>27/7/2020</Date>
              </div>
            </Card2>
            <Card2>
              <img src="https://matiashernandez.dev/static/66f9affa618d8c6eab9685f7a32e758c/2ae96/8d66eb17bb7d02ca4856ab443a78f2148cafbb129f58a3c81282007c6fe24ff2.jpg" />
              <div>
                <H3>JAMStack ¿Qué es SSG y SSR?</H3>
                <Copy>
                  Me encanta enseñar y tuve la gran oportunidad de ser parte de
                  Egghead. Las lecciones y cursos en egghead son el primer y
                  quizá más importante material audiviosual que realizo.
                </Copy>
                <Date>27/7/2020</Date>
              </div>
            </Card2>
          </Podcasts>
        </Section>
      </Container>
    </Layout>
  )
}
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        pageContent {
          eggheadPlaylist {
            img
            url
          }
        }
      }
    }
  }
`
