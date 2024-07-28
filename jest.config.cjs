module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/test/__ mocks __/fileMocks.js',
        '\\.(png|css)$': '<rootDir>/path-to-fileMock.js',
    },
    globals: {
        'ts-jest': {
            diagnostics: false
        }
    }
}