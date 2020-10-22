import { expect } from 'chai';
import { Given, When, Then } from '@cucumber/cucumber';
import { GooglePage } from '../pageObjects/google.pageObjects';

const googlePage: GooglePage = new GooglePage();
var testController = null;

Given(/^I am open Google's search page$/, async function () {
    return this.waitForTestController()
        .then(async function (tc: TestCafe) {
            testController = tc;
            await testController.navigateTo(googlePage.url());
        });
});

When(/^I am typing my search request "(.*)" on Google$/, async function (text: string) {
    return await testController.typeText(googlePage.searchBox(), text);
});

Then(/^I am pressing "(.*)" key on Google$/, async function (text: string) {
    return await testController.pressKey(text);
});

Then(/^I should see that the first Google's result is "(.*)"$/, async function (text: string) {
    const firstLink = googlePage.firstSearchResult(testController);
    const found = await firstLink.innerText;

    expect(found).to.include(text);
});
