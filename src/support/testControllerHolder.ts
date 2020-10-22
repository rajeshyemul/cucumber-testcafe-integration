import * as data from 'testcafe'

class TestControllerHolder {

    private static testController?: TestController
    private static captureResolver: any;
    private static getResolver: any;

    public capture(t: TestController) {
        TestControllerHolder.testController = t

        if (TestControllerHolder.getResolver) {
            TestControllerHolder.getResolver(t);
        }

        return new Promise(resolve => (TestControllerHolder.captureResolver = resolve));
    }

    public destroy() {
        TestControllerHolder.testController = undefined;

        if (TestControllerHolder.captureResolver) {
            TestControllerHolder.captureResolver();
        }
    }

    public get() {
        return new Promise(resolve => {
            if (TestControllerHolder.testController) {
                // already captured
                resolve(TestControllerHolder.testController);
            } else {
                // resolve (later) when captured
                TestControllerHolder.getResolver = resolve;
            }
        });
    }
}

export const testControllerHolder: TestControllerHolder = new TestControllerHolder();
