export default {
  title: "Translatable Site Settings",
  name: "translatableSiteSettings",
  type: "object",
  options: {
    i18n: true,
    base: "es_ES",
    languages: ["en_US", "es_ES"]
  },
  fields: [
    {
      name: "bio",
      title: "Bio",
      type: "markdown"
    },
    {
      name: "eggheadTitle",
      title: "Egghead Title",
      type: "array",
      of: [{ type: "block" }]
    },
    {
      name: "eggheadSection",
      title: "Egghead Section",
      type: "text"
    },
    {
      name: "podcastTitle",
      title: "Podcast Title",
      type: "array",
      of: [{ type: "block" }]
    },
    {
      name: "podcastSection",
      title: "Podcast Section",
      type: "text"
    },
    {
      name: "articleTitle",
      title: "Article Title",
      type: "array",
      of: [{ type: "block" }]
    },
    {
      name: "articleSection",
      title: "Article Section",
      type: "text"
    }
  ]
};
