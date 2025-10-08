
# Coffee Cart Test Cases

## Navigation

*   **Test Case 1: (@smoke)** Verify that the user can navigate to the menu page.
    *   **Steps:**
        1.  Go to the website.
        2.  Click on the "menu" link in the navigation bar.
    *   **Expected Result:** The user should be redirected to the menu page (`/`).

*   **Test Case 2: (@smoke)** Verify that the user can navigate to the cart page.
    *   **Steps:**
        1.  Go to the website.
        2.  Click on the "cart" link in the navigation bar.
    *   **Expected Result:** The user should be redirected to the cart page (`/cart`).

*   **Test Case 3: (@smoke)** Verify that the user can navigate to the GitHub page.
    *   **Steps:**
        1.  Go to the website.
        2.  Click on the "github" link in the navigation bar.
    *   **Expected Result:** The user should be redirected to the GitHub page (`/github`).

## Menu Page

*   **Test Case 4: (@happy_path)** Verify that all coffee items are displayed with their name and price.
    *   **Steps:**
        1.  Go to the menu page.
    *   **Expected Result:** All coffee items should be displayed, each with its name and price.

*   **Test Case 5: (@happy_path)** Verify that double-clicking on a coffee title translates it to Chinese.
    *   **Steps:**
        1.  Go to the menu page.
        2.  Double-click on the title of any coffee item.
    *   **Expected Result:** The coffee title should be translated to Chinese.

*   **Test Case 6: (@happy_path)** Verify that right-clicking on a coffee icon opens an "add to cart" dialog.
    *   **Steps:**
        1.  Go to the menu page.
        2.  Right-click on the icon of any coffee item.
    *   **Expected Result:** A dialog should appear, allowing the user to add the item to the cart.

*   **Test Case 7: (@happy_path)** Verify that adding a 3rd item to the cart triggers a promo coffee pop-up.
    *   **Steps:**
        1.  Go to the menu page.
        2.  Add two different coffee items to the cart.
        3.  Add a third coffee item to the cart.
    *   **Expected Result:** A pop-up should appear, offering a promotional coffee.

*   **Test Case 8: (@performance)** Verify that the "add to cart" process slows down when the cart has more than 7 items.
    *   **Steps:**
        1.  Go to the menu page.
        2.  Add 7 different coffee items to the cart.
        3.  Add an 8th coffee item to the cart.
    *   **Expected Result:** The process of adding the 8th item to the cart should be noticeably slower.

*   **Test Case 9: (@performance)** Verify that the page loads slower when the `?ad=1` parameter is present.
    *   **Steps:**
        1.  Navigate to `https://coffee-cart.app/?ad=1`.
    *   **Expected Result:** The page should take a longer time to load compared to the normal page load.

*   **Test Case 10: (@destructive)** Verify that an error is thrown when adding a coffee to the cart with the `?breakable=1` parameter.
    *   **Steps:**
        1.  Navigate to `https://coffee-cart.app/?breakable=1`.
        2.  Try to add any coffee item to the cart.
    *   **Expected Result:** An error should be displayed, and the item should not be added to the cart.

*   **Test Case 11: (@happy_path)** Verify that hovering over the "Pay" button shows a quick cart preview.
    *   **Steps:**
        1.  Go to the menu page.
        2.  Add at least one item to the cart.
        3.  Hover the mouse over the "Proceed to checkout" button.
    *   **Expected Result:** A preview of the cart should be displayed.

## Cart Page

*   **Test Case 12: (@happy_path)** Verify that items added to the cart are displayed correctly.
    *   **Steps:**
        1.  Go to the menu page.
        2.  Add one or more items to the cart.
        3.  Navigate to the cart page.
    *   **Expected Result:** The cart page should display all the items that were added, along with their quantities and prices.

*   **Test Case 13: (@happy_path)** Verify that the user can remove items from the cart.
    *   **Steps:**
        1.  Go to the cart page with items in it.
        2.  Click on the "remove" button for an item.
    *   **Expected Result:** The item should be removed from the cart, and the total price should be updated.

*   **Test Case 14: (@happy_path)** Verify that the total price is calculated correctly.
    *   **Steps:**
        1.  Go to the cart page with items in it.
    *   **Expected Result:** The total price should be the sum of the prices of all items in the cart.

*   **Test Case 15: (@happy_path)** Verify that the user can proceed to checkout.
    *   **Steps:**
        1.  Go to the cart page with items in it.
        2.  Click on the "Proceed to checkout" button.
    *   **Expected Result:** The user should be taken to the checkout page (or a mock checkout page).
