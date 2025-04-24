const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement, putText, getText } = require("../../lib/commands.js");
const { timeout } = require("puppeteer");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("this user is visited the page {string}", async function (string) {
  // Write code here that turns the phrase above into concrete actions
  return await this.page.goto(`http://qamid.tmweb.ru${string}`);
});

When(
  "the user is choose the day of the booking week {string}",
  async function (string) {
    // Write code here that turns the phrase above into concrete actions
    return await clickElement(this.page, `a:nth-child(${string})`);
  }
);

When(
  "the user is choose the show time and movie title {string}",
  async function (sessionId) {
    // Write code here that turns the phrase above into concrete actions
    return await clickElement(
      this.page,
      `a[href='#'][data-seance-id='${sessionId}']`
    );
  }
);

When("the user has chose any free seat in the movie hall", async function () {
  // Write code here that turns the phrase above into concrete actions
  return await clickElement(
    this.page,
    `span[class='buying-scheme__chair buying-scheme__chair_standart']`
  );
});

When("the user is click on to the «Reservation» button", async function () {
  // Write code here that turns the phrase above into concrete actions
  return await this.page.click(`.acceptin-button`);
});

Then(
  "sees the booking confirmation with the name of the movie {string}",
  async function (string) {
    const actual = await getText(this.page, `.ticket__details.ticket__title`);
    const expected = await string;
    // Write code here that turns the phrase above into concrete actions
    return expect(actual).contains(expected);
  }
);

Given("this user visited the page {string}", async function (string) {
  // Write code here that turns the phrase above into concrete actions
  return await this.page.goto(`http://qamid.tmweb.ru${string}`);
});

When(
  "the user is choose a seat in the hall that is not available for booking",
  async function () {
    // Write code here that turns the phrase above into concrete actions
    return await clickElement(
      this.page,
      `span[class='buying-scheme__chair buying-scheme__chair_taken']`
    );
  }
);

When(
  "the user is try to click on to the «Reservation» button",
  async function () {
    // Write code here that turns the phrase above into concrete actions
    return await clickElement(
      this.page,
      "span[class='buying-scheme__chair buying-scheme__chair_taken']"
    );
  }
);

Then(
  "the user is understands that the «Reservation» button is inactive",
  async function () {
    expected = true;
    const acceptinButton = await this.page.$(".acceptin-button");
    const actual = await acceptinButton.evaluate((btn) => btn.disabled);
    // Write code here that turns the phrase above into concrete actions
    return expect(actual).equal(expected);
  }
);
