const path = require('path')

require('dotenv').config({
  path: '.env',
})
const baseUrl = 'https://www.matiashernandez.dev',
  {
    NODE_ENV,
    URL: NETLIFY_SITE_URL = baseUrl,
    DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
    CONTEXT: NETLIFY_ENV = NODE_ENV,
    BUZZSPROUT_TOKEN,
  } = process.env,
  isNetlifyProduction = NETLIFY_ENV === 'production',
  siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    siteUrl: 'https://matiashernandez.dev',
    author: 'Matías Henrández',
    title: 'Matias Hernández',
    description:
      'Sitio personal de Matias Hernández. Desarrollador, Speaker, Podcaster y Educador',
    keywords: [
      'Matias Hernández',
      'Matias',
      'React',
      'egghead',
      'Development',
      'Desarrollador',
      'Web Development',
      'Jamstack',
    ],
    titter: '@matiasfha',
    instagram: '@matiasfha',
    organization: '',
    image: 'assets/photo.png',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/posts`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-buzzsprout-api',
      options: {
        name: 'ControlRemoto',
        token: BUZZSPROUT_TOKEN,
        podcastId: '1057351',
      },
    },
    {
      resolve: `gatsby-source-buzzsprout-api`,
      options: {
        name: 'CafeConTech',
        token: BUZZSPROUT_TOKEN,
        podcastId: '1081172',
      },
    },

    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve('./src/templates/page.js'),
        },
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1035,
              sizeByPixelDensity: true,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
            },
          },
        ],
      },
    },
    '@pauliescanlon/gatsby-mdx-embed',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'A learning, teaching and writing software engineer',
        short_name: 'RWieruch',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#525dce',
        display: 'standalone',
        icon: 'assets/favicon.svg',
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: { rule: { include: /assets/ } },
    },
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@/assets': path.resolve(__dirname, 'assets'),
          '@/components': path.resolve(__dirname, 'src/components'),
          '@/images': path.resolve(__dirname, 'src/images'),
        },
      },
    },
    {
      resolve: 'gatsby-plugin-prettier-eslint',
      options: {
        prettier: {
          patterns: [
            // The pattern "**/*.{js,jsx,ts,tsx}" is not used because we will rely on `eslint --fix`
            '**/*.{css,scss,less}',
            '**/*.{json,json5}',
            '**/*.{graphql}',
            '**/*.{md,mdx}',
            '**/*.{html}',
            '**/*.{yaml,yml}',
          ],
        },
        eslint: {
          patterns: '**/*.{js,jsx,ts,tsx}',
          customOptions: {
            fix: true,
            cache: true,
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Chivo:400,700', 'Playfair Display:ital@1'],
        },
        typekit: {
          id: 'muli',
          api: '//use.edgefonts.net',
        },
      },
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://egghead.io/instructors/matias-francisco-hernandez-arellano/feed?user_email=matiasfh%40gmail.com&user_token=195af077-8518-43ed-8be7-34f73437d2ff`,
        name: `EggheadLessons`,
      },
    },
    `gatsby-plugin-advanced-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: '*' }],
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },

    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     // The property ID; the tracking code won't be generated without it
    //     trackingId: 'UA-178170568-1',
    //     anonymize: true,
    //     // Setting this parameter is also optional
    //     respectDNT: true,
    //     defer: true,
    //   },
    // },
  ],
}
