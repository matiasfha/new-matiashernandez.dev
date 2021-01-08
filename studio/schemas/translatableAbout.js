export default {
  title: "Translatable About Page",
  name: "translatableAbout",
  type: "object",
  options: {
    i18n: true,
    base: "es_ES",
    languages: ["en_US", "es_ES"]
  },
  fields: [
    {
      name: "about",
      title: "About",
      type: "markdown"
    }
  ]
};
