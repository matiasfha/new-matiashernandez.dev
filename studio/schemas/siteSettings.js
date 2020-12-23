export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // You probably want to uncomment the next line once you've made a siteSettings document in the Studio. This will remove the settings document type from the create-menus.
  // __experimental_actions: ['update', 'publish', /* 'create', 'delete' */],
  fields: [
    {
      name: "egghead",
      title: "Egghead Links",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};
