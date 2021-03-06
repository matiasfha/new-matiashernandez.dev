export default {
  title: "About page",
  name: "aboutPage",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "content",
      title: "Content",
      type: "markdown"
    },
    {
      name: "description",
      title: "Description",
      type: "string"
    },
    {
      name: "locale",
      title: "Locale",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Spanish", value: "es" },
          { title: "English", value: "en" }
        ]
      }
    }
  ]
};
