export default {
  title: "Navbar",
  name: "navbar",
  type: "document",
  fields: [
    {
      title: "Links",
      name: "link",
      type: "array",
      of: [{ type: "menuItem" }]
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
