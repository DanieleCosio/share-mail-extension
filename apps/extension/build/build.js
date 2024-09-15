import process from "process";
import * as esbuild from "esbuild";
import esbuildPluginTsc from "esbuild-plugin-tsc";

const config = {
    outdir: "dist/",
    bundle: true,
    loader: {
        ".css": "text",
        ".html": "text",
        ".svg": "text",
    },

    plugins: [
        esbuildPluginTsc({
            force: true,
        }),
    ],
};

const browsers = {
    CHROME: "Chrome",
    FIREFOX: "Firefox",
};

const args = process.argv.slice(2);
let browser = browsers.CHROME;

if (args.includes("--dev")) {
    config.minify = false;
    config.sourcemap = "inline";
}

if (args.includes("--firefox")) {
    browser = browsers.FIREFOX;
}

//background.js build
config.entryPoints = [`src/scripts/${browser}/background.ts`];
await esbuild.build(config);

// content.js build
config.inject = ["src/components-shim.ts"];
config.entryPoints = [`src/scripts/${browser}/content.ts`];
await esbuild.build(config);
