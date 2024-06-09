import esbuildPluginTsc from "esbuild-plugin-tsc";

export function createBuildSettings(options) {
    return {
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
        ...options,
    };
}
