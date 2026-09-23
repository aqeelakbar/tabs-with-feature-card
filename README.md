# Tabs with Feature Card

An interaction study of a responsive tabbed feature card, built with React, TypeScript and Vite. It explores how motion, layout and navigation details affect a small interface across screen sizes.

**[Live demo](https://aqeelakbar.github.io/tabs-with-feature-card/)**

## ✦ About the Component

The design is inspired by [Wise’s design system](https://wise.design) and interface patterns found on [wise.com](https://wise.com). While the system did not provide full sizing or spacing references, I followed the visual and interaction style closely — especially the tab behavior and typography.

This project reflects my attention to detail and design sensibility. I aimed to create a smooth, elegant user experience by including:
- Scrollable tab navigation on mobile with a visual fade cue to suggest overflow
- Animated underline that slides between tabs based on exact tab width and position
- Clean hover, focus, and active states that don’t cause layout shifts
- Font sizing and layout that adapt across screen sizes
- A mobile-first, modular architecture with accessible markup

## ✦ Key Features

- **Custom Styling**: I made layout and spacing decisions independently due to limited design specs. I defined hover and focus states to stay consistent with the tone of the reference brand.
- **Responsive Layout**: Built mobile-first with media queries. The layout adjusts at defined breakpoints and was tested across screen sizes.
- **Keyboard-accessible tabs**: The tabs and panels are linked by stable IDs. Arrow keys, `Home`, and `End` move focus; `Enter`, `Space`, or a click selects a tab. Only the selected tab is in the normal Tab order, and focus outlines remain visible.
- **Animation**: The underline slides smoothly between active tabs. The tab navigation includes a subtle fade effect on mobile to suggest scrollability.

## ✦ Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/aqeelakbar/tabs-with-feature-card.git
  cd tabs-with-feature-card
  ```

2. Install dependencies:
  ```bash
  npm install
  ```

3. Run the development server
  ```bash
  npm run dev
  ```

4. Run the interaction tests:
  ```bash
  npm test
  ```

## ✦ Notes

I’ve kept the code modular and easy to follow, separating logic, styles, and data. The project focuses on craft over complexity — my aim was not just to build a component, but to create an interaction that feels thoughtful and complete.
