import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import getOgImage from "@/lib/getOgImage";
// import SchemaOrg from '@/components/SchemaOrg'

export type FrontMatterT = {
    title: string;
    description: string;
    keywords: string;
    image?: string;
    siteUrl?: string;
};
export type Props = {
    frontmatter?: FrontMatterT;
    isBlogPost?: boolean;
    lang?: string;
};

const Seo: React.FC<Props> = ({
    frontmatter,
    isBlogPost = false,
    lang = "es",
}: Props) => {
    const ogImage = getOgImage({
        title: frontmatter.title,
        tags: frontmatter.keywords
            .split(",")
            .map((item) => `#${item.trim()}`)
            .join(" "),
        cloudName: "matiasfha",
        imagePublicId: "social-card.jpg",
    });

    const title = frontmatter.title;
    const description = frontmatter.description;
    const keywords = frontmatter.keywords;
    return (
        <Helmet title={title}>
            <html lang={lang} />
            <title>{title}</title>
            <meta property="og:url" content={frontmatter.siteUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={isBlogPost ? "article" : "website"} />
            <meta property="og:site_name" content={frontmatter.siteUrl} />
            <meta property="keywords" content={keywords} />
            <meta property="description" content={description} />

            <meta name="twitter:creator" content="https://twitter.com/matiasfha/" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:site" content={frontmatter.siteUrl} />
            <meta name="twitter:description" content={description} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="image" content={ogImage} />
            <meta itemProp="image" content={ogImage} />
            <meta name="twitter:image" content={ogImage} />
            <meta property="og:image" content={ogImage} />

            <noscript>This site runs best with JavaScript enabled.</noscript>
        </Helmet>
    );
};

export default Seo;
