import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Link } from "gatsby";
import Img from "gatsby-image";
import tw, { styled, css } from "twin.macro";
import { TwitterIcon, TwitterShareButton } from "react-share";
import Seo from "@/components/Seo";
import Layout from "@/components/Layout";
import { bpMaxSM } from "@/lib/breakpoints";

const Grid = styled.div`
  ${tw`max-w-screen-lg mx-auto grid grid-cols-1 pt-20`}
  grid-template-rows: minmax(250px,500px) minmax(130px,200px) 1fr 100px;
  grid-template-areas:
    "img"
    "title"
    "content"
    "footer";
  justify-content: center;
`;

const ImgContainer = styled.div`
  grid-area: img;
  width: 720px;
  justify-self: center;
  ${bpMaxSM} {
    width: 100%;
  }
`;
const TitleContainer = styled.div`
  grid-area: title;
  p {
    ${tw`font-muli text-sm text-gray-700 m-0`}
  }
`;
const H1 = styled.h1`
  ${tw`font-muli text-gray-900 text-4xl text-left justify-center pt-8 mb-0`}
`;

const Content = styled.div`
  grid-area: content;
  ${tw`font-muli text-left text-lg`}
`;

const Footer = styled.div`
  grid-area: footer;
  padding: 0rem 0rem 1rem;
  justify-self: self-end;
  a {
    ${tw`no-underline text-blue-800 font-muli`}
  }
  p {
    ${tw`text-gray-700 font-muli`}
    span {
      ${tw`no-underline text-blue-800 font-muli ml-2`}
    }
  }
`;
export default function PostTemplate({ data: { mdx } }) {
  return (
    <>
      <Seo frontmatter={mdx.frontmatter} />
      <Layout>
        <Grid>
          <ImgContainer>
            <Img
              fluid={mdx.frontmatter.banner.childImageSharp.fluid}
              title={mdx.frontmatter.title}
              alt={mdx.frontmatter.title}
            />
          </ImgContainer>
          <TitleContainer>
            <H1>{mdx.frontmatter.title}</H1>
            <p>{mdx.frontmatter.date}</p>
          </TitleContainer>
          <Content>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </Content>
          <Footer>
            <p>
              <a
                href={`https://github.com/matiasfha/new-matiashernandez.dev/tree/master/web/content/posts/${mdx.frontmatter.slug}.mdx`}
              >
                Edita esto en github
              </a>
            </p>
            <p>
              Comparte en
              <TwitterShareButton
                url={`https://matiashernandez.dev/${mdx.frontmatter.slug}`}
                title={mdx.frontmatter.title}
                via="matiasfha"
              >
                <span>Twitter</span>
              </TwitterShareButton>
            </p>
          </Footer>
        </Grid>
      </Layout>
    </>
  );
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
        bannerCredit
        slug
        banner {
          childImageSharp {
            fluid(maxWidth: 920) {
              ...GatsbyImageSharpFluid
              ...GatsbyImageSharpFluidLimitPresentationSize
            }
          }
        }
        keywords
      }
      body
    }
  }
`;
