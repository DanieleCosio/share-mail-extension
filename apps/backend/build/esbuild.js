import esbuildPluginTsc from "esbuild-plugin-tsc";
import * as esbuild from "esbuild";

/* Only dev mode for now */
const config = {
    outdir: "web/static/app",
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
    ],

    minify: false,
    sourcemap: "inline",
    entryPoints: ["web/app.ts"],
};

await esbuild.build(config);
