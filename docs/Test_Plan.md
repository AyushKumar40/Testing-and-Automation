# Swag Labs (SauceDemo) - Test Plan

## 1. Scope

This test plan outlines the quality assurance approach for the Swag Labs e-commerce platform (saucedemo.com).

**In-Scope:**

- User Authentication (Login logic, error handling, role-based routing).
- Product Inventory (Display, sorting, routing to detail pages).
- Shopping Cart (Adding/removing items, badge state management).
- Checkout Workflow (Form validation, total calculation, order completion).
- Logout / session behavior

## 2. Types of Testing

- **Functional Testing:** Ensuring core user journeys (login, add to cart, checkout) work as intended.
- **UI Testing:** Verifying elements render correctly, images load, and responsive design holds up.
- **Negative Testing:** Testing invalid inputs, locked out users, and edge cases (e.g., checking out with 0 items).
- **Edge Case:** Empty cart checkout, cart badge boundary (0 → 1 → many), sort order edge cases, browser back-button after logout.
- **Exploratory:** Manual, unscripted testing focused on `problem_user` to surface non-obvious UI/logic bugs
- **Cross-Browser Considerations:** Ensuring functionality remains consistent across Chromium-based browsers (Chrome) and Edge.
- **Regression (Automated):** Selenium + Mocha scripts for the 3 most critical flows, runnable in CI

## 3. Test Environment

- **URL:** https://www.saucedemo.com
- **Browsers:** Google Chrome (Latest), Edge (Latest)
- **Automation Framework:** Selenium WebDriver with JavaScript (Node.js)

## 4. Test Data

The following system-provided credentials will be used:

| Username                  | Password       | Expected Behavior                                                                             |
| ------------------------- | -------------- | --------------------------------------------------------------------------------------------- |
| `standard_user`           | `secret_sauce` | Normal, fully working flow — baseline for all comparisons                                     |
| `locked_out_user`         | `secret_sauce` | Login blocked; error message displayed                                                        |
| `problem_user`            | `secret_sauce` | Logs in successfully but UI/logic bugs present throughout (images, sort, checkout form, cart) |
| `performance_glitch_user` | `secret_sauce` | Logs in successfully but with a significant (multi-second) delay                              |

## 5. Test Cases (Manual & Automated)

| ID                      | Title                                                                 | Steps                                                                                                                                | Expected Result                                                                                    | Priority               |
| ----------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ---------------------- |
| **TC-01**               | Successful login with valid credentials                               | 1. Go to saucedemo.com 2. Enter `standard_user` / `secret_sauce` 3. Click Login                                                      | User is redirected to `/inventory.html`; product list is visible                                   | High                   |
| **TC-02**               | Login fails for locked-out user                                       | 1. Go to saucedemo.com 2. Enter `locked_out_user` / `secret_sauce` 3. Click Login                                                    | Login is blocked; error banner reads "Epic sadface: Sorry, this user has been locked out."         | High                   |
| **TC-03**               | Add single item to cart and verify badge                              | 1. Login as `standard_user` 2. Click "Add to cart" on Sauce Labs Backpack                                                            | Cart badge updates from no badge to "1"; button label changes to "Remove"                          | High                   |
| **TC-04**               | End-to-end checkout flow                                              | 1. Login as `standard_user` 2. Add 2 items to cart 3. Go to cart → Checkout 4. Fill First/Last Name + Zip → Continue 5. Click Finish | Order summary shows correct items/total; "Thank you for your order" confirmation page is displayed | High                   |
| **TC-05**               | Checkout blocked with missing required field                          | 1. Login → add item → go to checkout 2. Leave "Zip/Postal Code" blank 3. Click Continue                                              | Error message: "Error: Postal Code is required"; user remains on checkout-step-one                 | Medium                 |
| **TC-06**               | Remove item from cart updates badge                                   | 1. Login → add 2 items 2. Go to cart 3. Click "Remove" on one item                                                                   | Item disappears from list; badge count decrements by 1                                             | Medium                 |
| **TC-07** (exploratory) | `problem_user` product images render correctly                        | 1. Login as `problem_user` 2. View inventory page                                                                                    | Each product shows its own correct image (**this fails — see Bug Report BUG-02**)                  | Low (bug-hunting case) |
| **TC-08** (exploratory) | `problem_user` product links navigate correctly                       | 1. Login as `problem_user` 2. Click each product name/image in turn                                                                  | Each click opens that product's own detail page (**this fails — see Bug Report BUG-03**)           | Low (bug-hunting case) |
| **TC-09** (exploratory) | `problem_user` all products can be added to cart                      | 1. Login as `problem_user` 2. Click "Add to cart" on each of the 6 products                                                          | All 6 items add successfully (**this fails for some items — see Bug Report BUG-04**)               | Low (bug-hunting case) |
| **TC-10** (exploratory) | `performance_glitch_user` inventory page loads within reasonable time | 1. Login as `performance_glitch_user`, time how long `inventory.html` takes to render                                                | Page loads within ~2 seconds (**this fails — see Bug Report BUG-10**)                              | Low                    |

## 6. Risk Assessment

- **High Risk:** The `problem_user` profile exposes massive vulnerabilities in state management (cart count vs. actual items) and input validation (checkout form locking). These areas are most likely to fail in production.
- **Medium Risk:** Routing and sorting features are prone to breaking, impacting user navigation.
- **Low Risk:** Performance degradation (simulated by `performance_glitch_user`) impacts UX but does not cause hard functional blockers.
