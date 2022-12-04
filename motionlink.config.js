/**
 * Run this script with:
 *
 * @example
 * npx motionlink content=<content_link_access_key>
 */

const markdownService = require("motionlink-cli/lib/services/markdown_service");
const ObjectTransformers = markdownService.ObjectTransformers;

const showdown = require("showdown");

/** @type {import("motionlink-cli/lib/models/config_models").TemplateRule[]} */
const rules = [
  {
    template: "motionlink_templates/index.template.html",
    outDir: ".",
    alsoUses: [],
    uses: {
      database: "content",
      fetchBlocks: true,
      filter: {
        or: [
          {
            property: "Status",
            select: {
              equals: "Public",
            },
          },
        ],
      },

      map: (page, context) => {
        page.otherData.title = ObjectTransformers.transform_all(
          page.data.properties.Name.title
        );

        page.otherData.html = new showdown.Converter().makeHtml(
          context.genMarkdownForBlocks(page.blocks)
        );

        page._title = "index";
        return page;
      },
    },
  },
];

module.exports = rules;
