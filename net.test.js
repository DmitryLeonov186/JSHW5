const { timeout } = require("puppeteer");
const { clickElement, putText, getText } = require("./lib/commands.js");
let page;
beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
  await page.setDefaultNavigationTimeout(0);
});
afterEach(() => {
  page.close();
});
describe("Test suite of 3 test", () => {
  test("One ticket", async () => {
    const expected = "Ведьмак";
    await clickElement(page, "a:nth-child(4)");
    await clickElement(page, "a[href='#'][data-seance-id='225']");
    await clickElement(
      page,
      "span[class='buying-scheme__chair buying-scheme__chair_standart']"
    );
    await page.click(".acceptin-button");
    const actual = await getText(page, ".ticket__details.ticket__title");
    expect(actual).toContain(expected);
  });
  test("two tickets", async () => {
    const expected = "Сталкер(1979)";
    await clickElement(page, "a:nth-child(5)");
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='217']"
    );
    await clickElement(
      page,
      "span[class='buying-scheme__chair buying-scheme__chair_standart']"
    );
    await clickElement(
      page,
      "span[class='buying-scheme__chair buying-scheme__chair_standart']"
    );
    await page.click(".acceptin-button");
    const actual = await getText(page, ".ticket__details.ticket__title");
    expect(actual).toContain(expected);
  });
  test("Sad case", async () => {
    expected = true;
    await clickElement(page, "a:nth-child(5)");
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='199']"
    );
    await clickElement(
      page,
      "span[class='buying-scheme__chair buying-scheme__chair_taken']"
    );
    const acceptinButton = await page.$(".acceptin-button");
    const actual = await acceptinButton.evaluate((btn) => btn.disabled);
    expect(actual).toEqual(expected);
  });
});
