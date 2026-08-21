const { Builder, Browser, until, By } = require("selenium-webdriver");
const { expect } = require("chai");

describe("Add item to cart and complete checkout", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser(Browser.EDGE).build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should add an item to the cart, complete checkout, and show order confirmation", async function () {
    // Log in
    await driver.get("https://www.saucedemo.com/");
    await driver.wait(
      until.elementLocated(By.css('[data-test="username"]')),
      10000,
    );
    await driver
      .findElement(By.css('[data-test="username"]'))
      .sendKeys("standard_user");
    await driver
      .findElement(By.css('[data-test="password"]'))
      .sendKeys("secret_sauce");
    await driver.findElement(By.css('[data-test="login-button"]')).click();
    await driver.wait(
      until.elementLocated(By.css('[data-test="inventory-list"]')),
      10000,
    );

    // Add the backpack to cart
    await driver
      .findElement(By.css('[data-test="add-to-cart-sauce-labs-backpack"]'))
      .click();

    // Check the cart badge shows "1"
    const badge = await driver.findElement(
      By.css('[data-test="shopping-cart-badge"]'),
    );
    const badgeText = await badge.getText();
    expect(parseInt(badgeText, 10)).to.equal(1);

    // go to cart page
    await driver
      .findElement(By.css('[data-test="shopping-cart-link"]'))
      .click();

    // click checkout
    const checkoutBtn = await driver.wait(
      until.elementLocated(By.css('[data-test="checkout"]')),
      10000,
    );
    await checkoutBtn.click();

    // Fill in the customer info form
    await driver.wait(
      until.elementLocated(By.css('[data-test="firstName"]')),
      10000,
    );

    await driver
      .findElement(By.css('[data-test="firstName"]'))
      .sendKeys("John");
    await driver.findElement(By.css('[data-test="lastName"]')).sendKeys("Doe");
    await driver
      .findElement(By.css('[data-test="postalCode"]'))
      .sendKeys("298399");
    await driver.findElement(By.css('[data-test="continue"]')).click();

    //verify the total looks like "Total: $xx.xx"
    const totalEl = await driver.wait(
      until.elementLocated(By.css('[data-test="total-label"]')),
      10000,
    );
    const totalText = await totalEl.getText();
    expect(totalText).to.match(/Total:\s*\$\d+\.\d{2}/);

    // Click finish and check the confirmation message
    const finishButton = await driver.wait(
      until.elementLocated(By.css('[data-test="finish"]')),
      10000,
    );
    await finishButton.click();

    const complete = await driver.wait(
      until.elementLocated(By.css('[data-test="complete-header"]')),
      10000,
    );

    const completeText = await complete.getText();
    expect(completeText).to.equal("Thank you for your order!");
  });
});
