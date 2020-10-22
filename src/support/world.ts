import { testControllerHolder } from "./testControllerHolder";
import { setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';

const DEFAULT_TIMEOUT = 30 * 1000;

function CustomWorld() {
    this.waitForTestController = testControllerHolder.get;
}

setDefaultTimeout(DEFAULT_TIMEOUT);
setWorldConstructor(CustomWorld);