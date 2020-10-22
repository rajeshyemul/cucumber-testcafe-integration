import { Selector } from "testcafe";

export class GooglePage {
    url() {
        return 'http://google.com'
    }
    searchBox() {
        return Selector('input[name="q"]');
    }

    firstSearchResult(testController: TestController) {
        return Selector('#rso').find('a').with({ boundTestRun: testController });
    }
};