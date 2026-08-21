const { Builder, By, until, Browser } = require("selenium-webdriver");
const { expect } = require("chai");

describe("Login - valid credentials", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should log in successfully with standard_user and land on the inventory page", async function () {
    // Open the site
    await driver.get("https://www.saucedemo.com/");

    // Wait for the username field to exist, then type into it
    await driver.wait(
      until.elementLocated(By.css('[data-test="username"]')),
      10000,
    );
    await driver
      .findElement(By.css('[data-test="username"]'))
      .sendKeys("standard_user");

    // Type the password
    await driver
      .findElement(By.css('[data-test="password"]'))
      .sendKeys("secret_sauce");

    // Click login button
    await driver.findElement(By.css('[data-test="login-button"]')).click();

    // wait for the inventory page's product list to appear
    await driver.wait(
      until.elementLocated(By.css('[data-test="inventory-list"]')),
      10000,
    );

    // Assert we actually landed on the right page
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include("/inventory.html");

    const pageTitle = await driver.getTitle();
    expect(pageTitle).to.equal("Swag Labs");
  });
});
