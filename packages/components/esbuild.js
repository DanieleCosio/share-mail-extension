import esbuildPluginTsc from "esbuild-plugin-tsc";
import * as esbuild from "esbuild";
import { readFile } from "fs/promises";
import { minify } from "html-minifier";

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

    minify: true,
    sourcemap: true,
    entryPoints: ["src/index.ts"],
    target: ["es6"],
    format: "esm",
    treeShaking: true,
};

await esbuild.build(config);
