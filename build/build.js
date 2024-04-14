import * as esbuild from "esbuild";
import { createBuildSettings } from "./settings.js";
import process from "process";

const browsers = {
    CHROME: "Chrome",
    FIREFOX: "Firefox",
};

const args = process.argv.slice(2);
const buildSettings = { minify: true };
let browser = browsers.CHROME;

if (args.includes("--dev")) {
    buildSettings.minify = false;
    buildSettings.sourcemap = "inline";
}

if (args.includes("--firefox")) {
    browser = browsers.FIREFOX;
}

buildSettings.entryPoints = [
    `src/scripts/${browser}/content.ts`,
    `src/scripts/${browser}/background.ts`,
];

await esbuild.build(createBuildSettings(buildSettings));
