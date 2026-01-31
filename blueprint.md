
# Lotto Number Generator

## Overview

This is a simple web application that generates and displays a set of 6 unique lottery numbers.

## Project Outline

*   **HTML (`index.html`):** The main structure of the application.
*   **CSS (`style.css`):** Styles for the application, making it visually appealing.
*   **JavaScript (`main.js`):** The logic for generating the lottery numbers and updating the UI.
*   **Web Component:** A custom element (`lotto-ball`) will be used to display each number.

## Current Plan

1.  **Update `index.html`:**
    *   Change the title to "Lotto Number Generator".
    *   Add a main container for the app.
    *   Add a title heading.
    *   Add a container to display the generated numbers.
    *   Add a button to generate the numbers.
2.  **Update `style.css`:**
    *   Add modern styling to the body, container, title, number display, and button.
    *   Use CSS variables for colors.
    *   Add a subtle background texture.
    *   Style the `lotto-ball` custom element.
3.  **Update `main.js`:**
    *   Define the `LottoBall` custom element.
    *   Implement the logic to generate 6 unique random numbers between 1 and 45.
    *   Add a click event listener to the "Generate" button to trigger the number generation and display.
