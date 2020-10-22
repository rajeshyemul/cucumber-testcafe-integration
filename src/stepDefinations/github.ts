import { GithubPage } from "../pageObjects/github.pageObjects";
import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from 'chai';

const githubPage: GithubPage = new GithubPage();
var testController = null;

Given(/^I open the GitHub page$/, async function () {
    return this.waitForTestController()
        .then(async function (tc: TestCafe) {
            testController = tc;
            await testController.navigateTo(githubPage.url());
        });
});

When(/^I am typing my search request "([^"]*)" on GitHub$/, async function (text: String) {
    await testController.typeText(githubPage.searchButton(), text);
});

Then(/^I am pressing (.*) key on GitHub$/, async function (text: any) {
    await testController.pressKey(text);
});

Then(/^I should see that the first GitHub's result is (.*)$/, async function (text: String) {
    // FAILS on PURPOSE -> so you can see the screenshot in the report
    const firstLink = githubPage.firstSearchResult(testController);
    const found = await firstLink.innerText;

    expect(found).to.include(text);
});

