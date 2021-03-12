import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import tw, { styled, css } from "twin.macro";
import { TwitterIcon, TwitterShareButton } from "react-share";
import Seo from "@/components/Seo";
import Layout from "@/components/Layout";
import { bpMaxSM } from "@/lib/breakpoints";

const Grid = styled.div`
  ${tw`max-w-screen-lg mx-auto grid grid-cols-1 pt-20`}
  grid-template-rows: minmax(250px,300px) minmax(100px,190px) 1fr 100px;
  grid-template-areas:
    "img"
    "title"
    "content"
    "footer";
  justify-content: center;
`;

const ImgContainer = styled.div`
  grid-area: img;
  justify-self: center;
  width: 640px;
  max-height: 300px;

  ${bpMaxSM} {
    width: 100%;
  }
  .gatsby-image-wrapper {
    max-height: 300px;
  }
`;
const TitleContainer = styled.div`
  grid-area: title;
  ${tw`pb-4 md:pb-0`};
  p {
    ${tw`font-muli italic text-sm text-gray-600 dark:text-gray-200 m-0 pt-4`}
  }
`;
const H1 = styled.h1`
  ${tw`font-muli text-gray-900 dark:text-gray-100 text-4xl text-left justify-center pt-8 mb-0`}
`;

const Content = styled.div`
  grid-area: content;
  ${tw`font-wotfard text-left text-lg`}
  p, ul, h1, h2, h3 {
    ${tw`max-w-screen-md mx-auto`}
  }
`;

const Footer = styled.div`
  grid-area: footer;
  padding: 0rem 0rem 1rem;
  justify-self: self-end;
  a {
    ${tw`no-underline text-blue-800 dark:text-sepia-400 font-muli`}
  }
  p {
    ${tw`text-gray-700 dark:text-gray-100 font-muli`}
    span {
      ${tw`no-underline text-blue-800 dark:text-sepia-400 font-muli ml-2`}
    }
  }
`;
export default function PostTemplate({ data: { mdx } }) {
  const frontmatter = {
    ...mdx.frontmatter,
    keywords: mdx.frontmatter.keywords.join(", "),
    slug: mdx.fields.slug,
  };
  return (
    <>
      <Layout frontmatter={frontmatter} isBlogPost>
        <Grid>
          <ImgContainer>
            <GatsbyImage
              image={mdx.frontmatter.banner.childImageSharp.gatsbyImageData}
              title={mdx.frontmatter.title}
              alt={mdx.frontmatter.title}
            />
          </ImgContainer>
          <TitleContainer>
            <H1>{mdx.frontmatter.title}</H1>
            <p>Actualizado {mdx.frontmatter.date}</p>
          </TitleContainer>
          <Content>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </Content>
          <Footer>
            <p>
              <a
                href={`https://github.com/matiasfha/new-matiashernandez.dev/tree/master/web/content/posts/${mdx.fields.slug}.mdx`}
              >
                Edita esto en github
              </a>
            </p>
            <p>
              Comparte en
              <TwitterShareButton
                url={`https://matiashernandez.dev/${mdx.fields.slug}`}
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
        canonical_url
        title
        description
        date(formatString: "MMMM DD, YYYY")
        bannerCredit
        banner {
          childImageSharp {
            gatsbyImageData(width: 640, layout: CONSTRAINED)
          }
        }
        keywords
      }
      body
    }
  }
`;
