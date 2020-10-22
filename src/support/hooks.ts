import { unlinkSync } from 'fs';
import { After, AfterAll, Before, BeforeAll, Status } from '@cucumber/cucumber';
import { BROWSER } from '../environment';
import { createTestFile, generateHtmlReport } from './helper';
import { testControllerHolder } from './testControllerHolder';
const createTestCafe: TestCafeFactory = require('testcafe');

const TEST_CAFE_HOST = 'localhost';
const TEST_FILE = 'test.ts';
const DELAY = 5 * 1000;
let failedScenarios = 0;

let testCafe: TestCafe;

function runTest() {
    createTestCafe(TEST_CAFE_HOST)
        .then(async function (tc: TestCafe) {
            testCafe = tc;
            let runner: Runner = tc.createRunner();

            runner = runner
                .src(`./${TEST_FILE}`)
                .screenshots({
                    path: 'out/reports/screenshots/',
                    takeOnFails: true,
                    fullPage: true
                })
                .browsers(`${BROWSER}`.trim());

            try {
                return runner.run();
            } catch (error) {
                return console.error('Caught error: ', error);
            }
        })
        .then(() => {
            if (failedScenarios > 0) {
                console.warn(`🔥🔥🔥 ${failedScenarios} scenarios (retry included) failed 🔥🔥🔥`);
            } else {
                console.log(`All tests passed 😊`);
            }
        });
}

BeforeAll(async function () {
    createTestFile(TEST_FILE);
    runTest();
});

// Before(async function () {
//     return await this.waitForTestController().maximizeWindow();
// });

After(async function (testCase) {
    if (testCase.result.status === Status.FAILED) {
        failedScenarios += 1;
    }
});

AfterAll(async function () {
    testControllerHolder.destroy();
    unlinkSync(TEST_FILE);
    setTimeout(async () => {
        generateHtmlReport();
        console.log('Shutting down TestCafe...');
        await testCafe.close();
    }, DELAY * 2);
});
