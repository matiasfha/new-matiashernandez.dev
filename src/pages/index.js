import React from 'react'
import { graphql } from 'gatsby'
import tw, { styled } from 'twin.macro'
import { Buzzsprout } from 'mdx-embed'
import Layout from '@/components/Layout'
import Hero from '@/components/Hero'
import DefaultGrid from '@/components/Grid'
import EggheadSection from '@/components/EggheadSection'

const Container = tw.div`
  max-w-full relative px-8 h-screen mb-16
`

const Section = styled(DefaultGrid)`
  padding: 2rem 0;
  position: relative;
  grid-template-rows: 42px minmax(60px, 80px) 1fr;
  margin-top: 2rem;
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

const Copy = tw.p`
font-muli
`

const Podcasts = tw.div`
grid grid-rows-2 mt-12 mx-auto w-11/12`

const Card2 = styled.div`
  ${tw`transform transition duration-500 hover:shadow-lg hover:scale-110 mb-4`}
  height: 204px;
`

const Articles = tw.div`
  grid grid-cols-1 gap-6 mt-12 mx-auto w-11/12
`

const Card = styled.a`
  ${tw`grid mb-4 gap-8 w-full no-underline transform transition duration-500 hover:shadow-lg hover:scale-110 font-muli text-gray-500`};
  grid-template-columns: 300px 1fr;
  grid-template-areas: 'imagen content';
  img {
    grid-area: imagen;
    width: 100%;
    min-height: 200px;
  }
  span:first-child {
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
    ${tw`text-gray-800 text-sm`}
    a {
      color: rgb(4, 67, 172);
      text-decoration: none;
    }
  }
  div > span {
    ${tw`text-gray-600 text-xs`}
  }
`

const H3 = tw.h3`
  font-muli font-black text-gray-900 m-0
`

export default function Index({
  data: {
    allPodcastEpisodeCafeConTech,
    allPodcastEpisodeControlRemoto,
    allMdx,
  },
}) {
  const cafeConTech = new URL(
    allPodcastEpisodeCafeConTech.nodes[0].audio_url,
  ).pathname
    .slice(1)
    .replace(/\.[^/.]+$/, '')
  const controlRemoto = new URL(
    allPodcastEpisodeControlRemoto.nodes[0].audio_url,
  ).pathname
    .slice(1)
    .replace(/\.[^/.]+$/, '')
  return (
    <Layout>
      <Hero />
      <Container>
        <EggheadSection />
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
            <Card2>
              <Buzzsprout buzzsproutId={cafeConTech} />
            </Card2>
            <Card2>
              <Buzzsprout buzzsproutId={controlRemoto} />
            </Card2>
          </Podcasts>
        </Section>
        <Section>
          <div>
            <H2>Escribo algunos </H2>
            <A href="/posts">Artículos</A>
          </div>
          <Copy>
            {`Un digital garden/jardín digital es un espacio digital lleno de
            ideas interconectadas e información recolectada, curada y siempre en
            progreso durante el tiempo. Esto implica que dentro de este espacio
            existirá contenido que aún no "florece" o incluso que se encuentra
            en estado de semilla o germinación. Un conjunto de ideas que se
            mantienen en progreso. Estará enfocado en Javascript, React y
            desarrollo web en general.

Esta es mi selección personal de esas
            semillas.`}
          </Copy>
          <Articles>
            {allMdx.nodes.map((post) => {
              const keywords = post.frontmatter.keywords
                .map((item) => `#${item.trim()}`)
                .join(', ')
              return (
                <Card href={`/posts/${post.slug}`}>
                  {/* <span>{post.frontmatter.date}</span> */}
                  <img
                    src={post.frontmatter.banner.childImageSharp.fluid.src}
                    alt={post.frontmatter.alt}
                  />
                  <div>
                    <H3>{post.frontmatter.title}</H3>
                    <p>{post.frontmatter.description}</p>
                    <span>{post.frontmatter.date}</span>
                    <span>{keywords}</span>
                  </div>
                </Card>
              )
            })}
          </Articles>
        </Section>
        <Section>
          <div>
            <H2>Y hago algunas</H2>
            <A href="/talks">charlas</A>
          </div>
          <Copy>También me gusta participar en meetups o encuentros.</Copy>
          <Card href="http://presentaciones.matiashernandez.dev">
            <img src="https://presentaciones.matiashernandez.dev/assets/images/charla1.png" />
            <div>
              <H3>Clojure 101 Para javascripters</H3>
              <p>
                20/10/2020{' '}
                <a href="https://valdivia.beerjs.cl/">BeerJS Valdivida</a> 📺
                Video en Youtube
                <br />
                11/11/2020{' '}
                <a href="https://valdivia.beerjs.cl/">
                  Facebook Developers Circles: Santiago
                </a>
              </p>
            </div>
          </Card>
        </Section>
      </Container>
    </Layout>
  )
}
export const pageQuery = graphql`
  query {
    allMdx(filter: { frontmatter: { favorite: { eq: true } } }) {
      nodes {
        frontmatter {
          date(fromNow: true, locale: "es")
          banner {
            childImageSharp {
              fluid {
                src
              }
            }
          }
          description
          title
          keywords
        }
        slug
      }
    }

    allPodcastEpisodeCafeConTech(
      limit: 1
      sort: { fields: published_at, order: DESC }
    ) {
      nodes {
        audio_url
        description
        published_at(formatString: "DD/MM/YYYY")
        remoteImage {
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
    }

    allPodcastEpisodeControlRemoto(
      limit: 1
      sort: { fields: published_at, order: DESC }
    ) {
      nodes {
        audio_url
        description
        published_at(formatString: "DD/MM/YYYY")
        remoteImage {
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
    }
  }
`
