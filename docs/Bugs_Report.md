# Bug Report

## Bug 1: Empty Cart Checkout Allowed

- **Environment:** Web / `standard_user`
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Login as `standard_user`.
  2. With 0 items in the cart, click the shopping cart icon.
  3. Click "Checkout".
  4. Fill in dummy data and click "Continue", then "Finish".
- **Expected Result:** The system should block checkout if the cart is empty, or the "Checkout" button should be disabled.
- **Actual Result:** The system allows the user to complete a transaction for $0.00 with no items.

## Bug 2: State Mismatch Between Cart Badge and Actual Checkout Data

- **Environment:** Web / `problem_user`
- **Severity:** High
- **Steps to Reproduce:**
  1. Login as `problem_user`.
  2. Add 3 items to the cart from the main inventory page.
  3. Click on a product to view its detail page.
  4. Add 1 item to the cart from the detail page.
  5. Note the cart badge displays "4".
  6. Proceed to the checkout overview.
- **Expected Result:** The checkout overview should display 4 items and calculate the total accordingly.
- **Actual Result:** The checkout overview only displays 3 items, causing a mismatch between cart state and order data.

## Bug 3: Severe Input Validation Failure on Checkout Form

- **Environment:** Web / `problem_user`
- **Severity:** Critical
- **Steps to Reproduce:**
  1. Login as `problem_user`.
  2. Add an item to the cart and click "Checkout".
  3. Type a normal string into the "First Name" field.
  4. Click into the "Last Name" field.
- **Expected Result:** The user should be able to type their last name, and the first name should remain as entered.
- **Actual Result:** The "Last Name" field refuses all input. Furthermore, the "First Name" field is forcibly truncated/altered to only accept a single character.

## Bug 4: Defective "Remove" Button Functionality

- **Environment:** Web / `problem_user`
- **Severity:** High
- **Steps to Reproduce:**
  1. Login as `problem_user`.
  2. Click "Add to Cart" on any item.
  3. Click the "Remove" button that replaces the "Add to Cart" button.
- **Expected Result:** The item should be removed from the cart and the cart badge should decrement.
- **Actual Result:** The "Remove" button does nothing. This occurs on both the main inventory page and the individual product detail pages.

## Bug 5: Incorrect Product Routing from Inventory

- **Environment:** Web / `problem_user`
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Login as `problem_user`.
  2. Click on the title or image of a specific product (e.g., Sauce Labs Fleece Jacket).
- **Expected Result:** The user should be navigated to the detail page matching the clicked product.
- **Actual Result:** The user is routed to the detail page of a completely different product.

## Bug 6: Universal Incorrect Product Imagery

- **Environment:** Web / `problem_user`
- **Severity:** High
- **Steps to Reproduce:**
  1. Login as `problem_user`.
  2. Observe the product images across the main inventory page (`inventory.html`).
- **Expected Result:** Each product card should display its own unique, accurate product image.
- **Actual Result:** All 6 products display the exact same incorrect image (an unrelated stock photo).

## Bug 7: Inconsistent "Add to Cart" Functionality

- **Environment:** Web / `problem_user`
- **Severity:** High
- **Steps to Reproduce:**
  1. Login as `problem_user`.
  2. Iterate through the inventory list and click the "Add to Cart" button for every single item.
- **Expected Result:** Every item should be successfully added to the cart, updating the button state and cart badge.
- **Actual Result:** The functionality is completely fractured; some items are successfully added to the cart, while the buttons for other items fail entirely and do nothing.

## Bug 8: Broken Product Sorting Mechanism

- **Environment:** Web / `problem_user`
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Login as `problem_user`.
  2. Locate the product sorting filter dropdown at the top right of the inventory page.
  3. Attempt to select any sort option (e.g., "Price (low to high)").
- **Expected Result:** The dropdown option should be selectable, and the UI should immediately reorder the products based on the chosen criteria.
- **Actual Result:** The sort options cannot be successfully selected, and the items do not reorder.

## Bug 9: Missing Item Error on Specific Product Page

- **Environment:** Web / `problem_user`
- **Severity:** High
- **Steps to Reproduce:**
  1. Login as `problem_user`.
  2. Attempt to navigate to the individual product detail pages (`inventory-item.html`) for the items in the catalog.
- **Expected Result:** Every product link should successfully load its respective detail page with the product's information.
- **Actual Result:** At least one specific item catalog link is broken and returns an "item cannot be found" error when attempting to load the detail page.

## Bug 10: Severe Performance Latency on Login/Inventory Load

- **Environment:** Web / `performance_glitch_user`
- **Severity:** Low
- **Steps to Reproduce:**
  1. Navigate to the main login screen.
  2. Enter the credentials for `performance_glitch_user` and `secret_sauce`.
  3. Click "Login".
- **Expected Result:** The authentication should process quickly, and the main inventory page should load within standard acceptable response times (e.g., under 1-2 seconds).
- **Actual Result:** There is a significant, noticeable delay (latency) before the main inventory page actually loads and renders the products.
