/**
 * Jest configuration for the project.
 *
 * @module jest.config
 * @type {import('@jest/types').Config.InitialOptions}
 */
export default {
    /**
     * Use the Node.js environment for testing.
     * This is suitable for testing backend code.
     * @type {string}
     */
    testEnvironment: "node",

    /**
     * Disable transformation of files before testing.
     * Useful when running tests on native ESM or when no transpilation is needed.
     * @type {object}
     */
    transform: {},
};
