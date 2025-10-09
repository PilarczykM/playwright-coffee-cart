# playwright-coffee-cart

End-to-end tests for the Coffee Cart application using Playwright.

## Installation

```bash
npm install
```

## Running tests

```bash
npx playwright test
```

## Test Coverage

The test suite covers the following scenarios:

- **Navigation**: Verifies all navigation links work correctly.
- **Cart Management**:
    - Opening the payment modal.
    - Adding/removing items from the cart.
    - Increasing/decreasing item quantities.
    - Correctly updating the total price.
    - Removing an item when its quantity reaches zero.
- **Product Interactions**:
    - Verifying all products display with name and price.
    - Translating coffee names on double-click.
    - Opening a custom context menu on right-click.
    - Triggering a promotional offer after adding multiple items.
    - Handling application errors when adding items under specific conditions.
    - Displaying a cart preview on hover.
- **Performance**:
    - A test to check page load speed with URL parameters.
