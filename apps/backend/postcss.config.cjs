module.exports = (config) => {
    const rules = {
        plugins: [
            require("postcss-import"),
            require("postcss-nested"),
            require("autoprefixer"),
        ],
    };

    if (config.env === "development") {
        rules.map = "inline";
        return rules;
    }

    return {};
};
