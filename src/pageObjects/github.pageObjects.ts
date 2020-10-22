import { Selector } from 'testcafe'

export class GithubPage {
    url() {
        return 'https://github.com/';
    }

    searchBox() {
        return Selector('.header-search-input');
    }

    firstSearchResult(testController: TestController) {
        return Selector('.repo-list-item').nth(0).with({ boundTestRun: testController });
    }

    loginButton() {
        return Selector('.btn.btn-primary.btn-block');
    }

    loginErrorMessage() {
        return Selector('#js-flash-container > div > div');
    }

    searchButton() {
        return Selector('.header-search-input');
    }
}