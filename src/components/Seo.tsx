import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
// import SchemaOrg from '@/components/SchemaOrg'

export type SiteT = {
  siteUrl: string
  title: string
  description: string
  keywords: Array<string>
  twitter: string
}

export type FrontMatterT = {
  title: string
  description: string
  keywords: string
  image?: string
}
export type Props = {
  frontmatter?: FrontMatterT
}

const Seo: React.FC<Props> = ({ frontmatter }: Props) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          author
          keywords
          siteUrl
          image
        }
      }
    }
  `)
  const site = data.site.siteMetadata
  const ogImage = frontmatter.image || site.image
  const title = frontmatter.title || site.title
  const description = frontmatter.description || site.description
  const keywords = `${frontmatter.keywords},${site.keywords.join(',')}`
  return (
    <Helmet title={title}>
      <html lang="es" />
      <title>{title}</title>
      {/* OpenGraph tags */}
      <meta property="og:url" content={site.siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.siteUrl} />
      <meta property="keywords" content={keywords} />
      <meta property="description" content={description} />
      {/* <meta property="fb:app_id" content={seo.social.fbAppID} />*/}

      {/* Twitter Card tags */}
      <meta name="twitter:creator" content={site.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:site" content={site.siteUrl} />
      <meta name="twitter:description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="image" content={ogImage} />
      <meta itemProp="image" content={ogImage} />
      <meta name="twitter:image" content={ogImage} />
      <meta property="og:image" content={ogImage} />

      {/*<SchemaOrg
        url={site.siteUrl}
        title={site.title}
        image={`${site.siteUrl}`}
        datePublished={frontmatter.date ? frontmatter.date : null}
        description={site.description}
        canonicalUrl={site.siteUrl}
        author={site.author}
        organization={site.organization}
        defaultTitle={site.title}
        />*/}
      <noscript>This site runs best with JavaScript enabled.</noscript>
    </Helmet>
  )
}

export default Seo
