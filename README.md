# Tabs with Feature Card

This project is a responsive, accessible tabbed interface built using React and Vite. It was created for a design engineering assignment to demonstrate visual polish, interaction quality, and clean implementation.

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
- **Accessible by Default**: Supports keyboard navigation with `Enter` and `Space`, focus outlines, and semantic roles (`role="tablist"`, `aria-selected`).
- **Animation**: The underline slides smoothly between active tabs. The tab navigation includes a subtle fade effect on mobile to suggest scrollability.

## ✦ Installation

1. Clone the repository:
  ```bash
  git clone github.com:aqeelakbar/tabs-with-feature-card.git [your-project-folder]
  cd [your-project-folder]
  ```

2. Install dependencies:
  ```bash
  npm install
  ```

3. Run the development server
  ```bash
  npm run dev
  ```

## ✦ Notes

I’ve kept the code modular and easy to follow, separating logic, styles, and data. The project focuses on craft over complexity — my aim was not just to build a component, but to create an interaction that feels thoughtful and complete.
