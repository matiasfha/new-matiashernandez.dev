export default {
  title: "Site Settings",
  name: "siteSettings",
  type: "document",
  fields: [
    {
      name: "Esegghead",
      title: "Egghead Links",
      type: "array",
      of: [{ type: "string" }]
    },
    {
      name: "Enegghead",
      title: "Egghead English Links",
      type: "array",
      of: [{ type: "string" }]
    },
    {
      title: "Profile picture",
      type: "image",
      name: "image"
    },
    {
      name: "bio",
      title: "Bio",
      type: "markdown"
    }
  ]
};
