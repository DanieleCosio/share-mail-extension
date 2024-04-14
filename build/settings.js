import esbuildPluginTsc from "esbuild-plugin-tsc";

export function createBuildSettings(options) {
    return {
        outdir: "dist/",
        bundle: true,
        plugins: [
            esbuildPluginTsc({
                force: true,
            }),
        ],
        ...options,
    };
}
