const { Builder, Browser, By, until } = require("selenium-webdriver");
const { expect } = require("chai");

describe("Login - locked out user", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should block login and show a locked out error message", async function () {
    await driver.get("https://www.saucedemo.com/");
    await driver.wait(
      until.elementLocated(By.css('[data-test="username"]')),
      10000,
    );

    // Enter login credentials
    await driver
      .findElement(By.css('[data-test="username"]'))
      .sendKeys("locked_out_user");
    await driver
      .findElement(By.css('[data-test="password"]'))
      .sendKeys("secret_sauce");
    await driver.findElement(By.css('[data-test="login-button"]')).click();

    // wait for red error banner and check its text
    const errorEl = await driver.wait(
      until.elementLocated(By.css('[data-test="error"]')),
      10000,
    );
    const errorText = await errorEl.getText();
    expect(errorText).to.include("Sorry, this user has been locked out");

    // confirm we are still on the login page
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal("https://www.saucedemo.com/");
  });
});
