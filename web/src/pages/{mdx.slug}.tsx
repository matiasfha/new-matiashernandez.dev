import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import tw, { styled, css } from "twin.macro";
import { TwitterIcon, TwitterShareButton } from "react-share";
import Seo from "@/components/Seo";
import Layout from "@/components/Layout";
import { bpMaxSM } from "@/lib/breakpoints";

const Grid = styled.div`
  ${tw`max-w-screen-lg mx-auto grid grid-cols-1 pt-20`}
  grid-template-rows: minmax(250px,320px) minmax(100px,190px) 1fr 100px;
  grid-template-areas:
    "img"
    "title"
    "content"
    "footer";
  justify-content: center;
`;

const ImgContainer = styled.div`
  grid-area: img;
  ${tw`self-center max-w-screen-lg h-80`}

  ${bpMaxSM} {
    width: 100%;
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
  };
  const image = getImage(mdx.banner)
  const updatedWhen = frontmatter.lang !== 'en' ? 'Actualizado' : 'Last updated'
  const editThis = frontmatter.lang !== 'en' ? 'Edita esto en': 'Edit this in'
  const shareThis = frontmatter.lang !== 'en' ? 'Comparte en': 'Shart it in'
  return (
    <>
      <Layout frontmatter={frontmatter} isBlogPost>
        <Grid>
          <ImgContainer>
            <GatsbyImage
              image={image}
              title={mdx.frontmatter.title}
              alt={mdx.frontmatter.title}
            />
          </ImgContainer>
          <TitleContainer>
            <H1>{mdx.frontmatter.title}</H1>
            <p>{updatedWhen} {mdx.frontmatter.date}</p>
          </TitleContainer>
          <Content>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </Content>
          <Footer>
            <p>
              <a
                href={`https://github.com/matiasfha/new-matiashernandez.dev/tree/master/web/content/posts/${mdx.slug}.mdx`}
              >
                {editThis} github
              </a>
            </p>
            <p>
              {shareThis}
              <TwitterShareButton
                url={`https://matiashernandez.dev/${mdx.slug}`}
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
        banner {
          childImageSharp {
            gatsbyImageData(width: 1024, height: 320, placeholder: BLURRED)
          }
        }
      frontmatter {
        canonical_url
        title
        description
        date(formatString: "DD/MM/YY")
        bannerCredit
        keywords
      }
      body
    }
  }
`;
