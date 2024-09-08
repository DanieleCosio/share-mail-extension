import esbuildPluginTsc from "esbuild-plugin-tsc";
import * as esbuild from "esbuild";

/* Only dev mode for now */
const config = {
    outdir: "web/static/extension",
    bundle: true,

    plugins: [
        esbuildPluginTsc({
            force: true,
        }),
    ],

    minify: false,
    sourcemap: "inline",
    entryPoints: ["web/pageConnector.ts"],
};

await esbuild.build(config);
