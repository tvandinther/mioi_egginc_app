module.exports = {
    roots: [
        '<rootDir>/src',
    ],

    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: [
        'js',
        'json',
        'jsx',
        'node',
        'ts',
        'tsx',
    ],
    globals: {
        'ts-jest': {
            tsconfig: {
                target: 'es2015',
                module: 'commonjs',
                jsx: 'react',
            },
        },
    },
    preset: 'ts-jest/presets/js-with-ts-esm',
    testMatch: null,
    testEnvironment: "jsdom",
    testPathIgnorePatterns: [
        "<rootDir>/src/__tests__/data",
        "<rootDir>/src/__tests__/mocks"
    ],
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "<rootDir>/src/__tests__/mocks/styleMock.ts",
        "\\.(gif|ttf|eot|svg)$": "<rootDir>/src/__tests__/mocks/fileMock.ts"
    }
}