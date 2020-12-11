import React from 'react'
import Layout from '@/components/Layout'
import tw, { styled } from 'twin.macro'
import DefaultGrid from '@/components/Grid'
import DefaultHero from '@/components/Hero'
const Container = tw.div`
  bg-white max-w-full relative px-4 md:px-8
`

const Grid = styled(DefaultGrid)`
  ${tw`relative pb-20 max-w-screen-md`}
`
const Hero = styled(DefaultHero)`
  ${tw`h-0 mb-8`}
  h1 {
    ${tw`text-white text-2xl md:text-4xl font-chivo font-bold text-center self-center`}
    span {
      ${tw`no-underline text-red hover:underline cursor-pointer`}
    }
  }
  div:first-of-type {
    ${tw`md:grid-cols-1 max-w-screen-md`}
  }
`

function Page({ children, pageContext: { frontmatter } }) {
  return (
    <>
      <Layout frontmatter={frontmatter}>
        <Hero>
          <div dangerouslySetInnerHTML={{ __html: frontmatter.hero }} />
        </Hero>
        <Container>
          <Grid>{children}</Grid>
        </Container>
      </Layout>
    </>
  )
}

export default Page
