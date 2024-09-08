import esbuildPluginTsc from "esbuild-plugin-tsc";
import * as esbuild from "esbuild";
import { readFile } from "fs/promises";
import { minify } from "html-minifier";
import npmDts from "npm-dts";

const cssMinifyPlugin = {
    name: "cssMinifyPlugin",
    setup(build) {
        build.onLoad({ filter: /\.css$/ }, async (args) => {
            const f = await readFile(args.path);
            const css = await esbuild.transform(f, {
                loader: "css",
                minify: true,
            });
            return { loader: "text", contents: css.code };
        });
    },
};

const htmlMinifyPlugin = {
    name: "htmlMinifyPlugin",
    setup(build) {
        build.onLoad({ filter: /\.html$/ }, async (args) => {
            const f = await readFile(args.path);
            const html = minify(f.toString(), {
                minifyCSS: true,
                removeComments: true,
                caseSensitive: true,
                collapseWhitespace: true,
            });
            return { loader: "text", contents: html };
        });
    },
};

const svgMinifyPlugin = {
    name: "svgMinifyPlugin",
    setup(build) {
        build.onLoad({ filter: /\.svg$/ }, async (args) => {
            const f = await readFile(args.path);
            const svg = minify(f.toString(), {
                minifyCSS: true,
                removeComments: true,
                caseSensitive: true,
                collapseWhitespace: true,
            });
            return { loader: "text", contents: svg };
        });
    },
};

const config = {
    outdir: "dist/",
    bundle: true,
    loader: {
        ".svg": "text",
        ".css": "text",
        ".html": "text",
    },

    plugins: [
        esbuildPluginTsc({
            force: true,
        }),
        htmlMinifyPlugin,
        cssMinifyPlugin,
        svgMinifyPlugin,
    ],

    minify: false,
    sourcemap: true,
    entryPoints: ["src/index.ts"],
    target: ["es6"],
    format: "esm",
    treeShaking: true,
    /* external: [].concat.apply(
        [],
        [Object.keys(dependencies), Object.keys(peerDependencies)],
    ), */
};

/* const configEsm = {
    outfile: "dist/index.esm.js",
    bundle: true,
    loader: {
        ".svg": "text",
        ".css": "text",
        ".html": "text",
    },

    plugins: [
        esbuildPluginTsc({
            force: true,
        }),
        htmlMinifyPlugin,
        cssMinifyPlugin,
        svgMinifyPlugin,
    ],

    minify: false,
    treeShaking: true,
    platform: "node",
    format: "esm",
    sourcemap: "external",
    entryPoints: ["src/index.ts"],
}; */

await esbuild.build(config);
/* await esbuild.build(configEsm); */

/* new npmDts.Generator({
    entry: "src/index.ts",
    output: "dist/index.d.ts",
}).generate();
 */
