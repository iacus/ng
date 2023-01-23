const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginNavigation = require('@11ty/eleventy-navigation')
const pluginSvgSprite = require("eleventy-plugin-svg-sprite");
const Image = require("@11ty/eleventy-img");
const markdownIt = require('markdown-it')

const filters = require('./utils/filters.js')
const transforms = require('./utils/transforms.js')
const shortcodes = require('./utils/shortcodes.js')


async function imageShortcode(src, klass, alt, sizes, lazzy) {
    let metadata = await Image(src, {
        // widths: [300, 600, 1000, 1500],
        formats: ["webp", "jpeg"],
        outputDir: "./dist/assets",
        urlPath: "assets/",
        useCache: true
    });

    let imageAttributes = {
        class: klass,
        alt,
        sizes,
        loading: lazzy,
        decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (config) {
    // Plugins
    config.addPlugin(pluginRss)
    config.addPlugin(pluginNavigation)
    config.addPlugin(pluginSvgSprite, {
        path: "./src/assets/icons",
        svgSpriteShortcode: "iconsprite"
    })
    config.addNunjucksAsyncShortcode("image", imageShortcode);

    // Filters
    Object.keys(filters).forEach((filterName) => {
        config.addFilter(filterName, filters[filterName])
    })

    // Transforms
    Object.keys(transforms).forEach((transformName) => {
        config.addTransform(transformName, transforms[transformName])
    })

    // Shortcodes
    Object.keys(shortcodes).forEach((shortcodeName) => {
        config.addShortcode(shortcodeName, shortcodes[shortcodeName])
    })

    // Asset Watch Targets
    config.addWatchTarget('./src/assets')

    // Markdown
    config.setLibrary(
        'md',
        markdownIt({
            html: true,
            breaks: true,
            linkify: true,
            typographer: true
        })
    )

    // Layouts
    config.addLayoutAlias('base', 'base.njk')
    config.addLayoutAlias('article', 'article.njk')

    // Pass-through files
    config.addPassthroughCopy({'src/assets/images':'assets/'})
    config.addPassthroughCopy({'src/assets/videos':'assets/'})
    config.addPassthroughCopy('src/assets/fonts')
    config.addPassthroughCopy({'src/assets/scripts/js':'js'})

    // Deep-Merge
    config.setDataDeepMerge(true)

    // Base Config
    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: 'includes',
            layouts: 'layouts',
            data: 'data'
        },
        templateFormats: ['njk', 'md', '11ty.js'],
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk'
    }
}
