import React from 'react'
import tw, { styled } from 'twin.macro'
import { useStaticQuery, graphql } from 'gatsby'
import DefaultGrid from '@/components/Grid'
import Instagram from '@/assets/instagram-brands.svg'
import Twitter from '@/assets/twitter-brands.svg'
import Egghead from '@/assets/egghead.svg'
import { ScrollContext } from '../utils/scrollToRef'

const Container = tw.div`
  bg-dark grid grid-rows-1 max-w-full pt-12 gap-12 px-4 md:px-8
`

const Grid = styled(DefaultGrid)`
  ${tw`max-w-screen-md`}
`
const Title = tw.h1`
text-xl md:text-3xl text-center text-red font-chivo font-bold leading-8
`
const Copy = tw.p`
text-lg md:text-xl italic text-white font-playfair text-center
`

const Columns = styled.div`
  ${tw`grid grid-cols-1 md:grid-cols-2 md:gap-8 w-full py-16`}
  justify-items: center;
`
const Card = styled.div`
  ${tw`flex flex-col items-start md:items-center justify-between mb-8`}
`

const Content = styled.div`
  ${tw`grid gap-4`}
  grid-template-columns: 80px 1fr;
  @media (min-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    text-align: center;
    justify-items: center;
  }
  h2 {
    ${tw`font-chivo text-white text-xl leading-6 font-bold mb-0`}
  }
  h3 {
    ${tw`font-chivo text-white leading-5 text-lg font-normal m-0`}
  }
  img {
    ${tw`rounded-full w-20 md:w-32`}
  }
`
const Description = styled.p`
  ${tw`font-muli text-white leading-5 text-sm text-left md:text-center`}
`

const Social = styled.div`
  ${tw`flex flex-row items-center justify-around`}
  a {
    ${tw`no-underline h-8 w-8 border-white border-solid border rounded-full`}
    margin-right: 5px;
  }
  svg {
    padding-top: 0.5rem;
    padding-left: 0.35rem;
  }
`

const Matias = ({ content }: { content: string }) => {
  return (
    <Card>
      <Content>
        <img
          src="https://avatars3.githubusercontent.com/u/282006?s=400&u=a9d3c26dc6c2cfc5cbe04192b1fd6c2bb29c9be5&v=4"
          alt="@matiasfha"
        />
        <div>
          <h2>Matías Hernández</h2>
          <h3>El Informático</h3>
        </div>
      </Content>
      <Description>{content}</Description>
      <Social>
        <a href="https://twitter.com/matiasfha">
          <Twitter width="20px" height="17px" />
        </a>
        <a href="https://instagram.com/matiasfha">
          <Instagram width="20px" height="17px" />
        </a>
        <a href="http://egghead.io/instructors/matias-francisco-hernandez-arellano?af=4cexzz">
          <Egghead width="20px" height="17px" />
        </a>
      </Social>
    </Card>
  )
}
const Camilo = ({ content }: { content: string }) => {
  return (
    <Card>
      <Content>
        <img
          src="https://avatars0.githubusercontent.com/u/25529313?s=460&u=6c824ed96231f9337264e49dbe5349b693bdd05d&v=4"
          alt="@elcamilosoy"
        />
        <div>
          <h2>Camilo Muñoz</h2>
          <h3>El Diseñador</h3>
        </div>
      </Content>

      <Description>{content}</Description>
      <Social>
        <a href="https://twitter.com/elcamilosoy">
          <Twitter width="20px" height="17px" />
        </a>
        <a href="https://instagram.com/elcamilosoy">
          <Instagram width="20px" height="17px" />
        </a>
      </Social>
    </Card>
  )
}

const Footer = styled.div`
  ${tw`text-center font-muli text-white text-sm py-4 w-full`}
  background-color: #000;
`

const AboutSection: React.FC = () => {
  return (
    <>
      <Container>
        <Grid>
          <div>
            <Title>Control Remoto es</Title>
          </div>
          <Columns></Columns>
        </Grid>
      </Container>
      <Footer>Control Remoto ©2020</Footer>
    </>
  )
}

export default AboutSection
