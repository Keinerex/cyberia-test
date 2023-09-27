// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    testEnvironment: "jest-environment-jsdom",
};

const jestConfig = async () => {
    const nextJestConfig = await createJestConfig(customJestConfig)();
    return {
        ...nextJestConfig,
        moduleNameMapper: {
            // Workaround to put our SVG mock first
            "\\.svg$": "<rootDir>/tests/utils/svg.js",
            ...nextJestConfig.moduleNameMapper,
        },
    };
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = jestConfig;
