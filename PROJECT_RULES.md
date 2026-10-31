# Project Guidelines & Rules

## 1. Global Responsive Design Standard (Default Across All Views)
- **Mandatory Multi-Device Compatibility**: Every interface, screen, canvas, dashboard, and component must be responsive by default, supporting mobile (320px+), tablet, laptop, and wide desktop displays.
- **Mobile-First / Fluid Breakpoints**:
  - Desktop-optimised fixed-height layouts (`h-screen overflow-hidden`) must gracefully fall back to natural scroll layouts (`min-h-screen overflow-y-auto`) on mobile and tablet breakpoints (`< 1024px`).
  - Grids and sidebars must stack into single-column flows on mobile viewports.
  - Interactive SVG graphics (pitches, charts, radars) must use flexible `viewBox` coordinates, responsive `w-full h-auto` dimensions, and horizontal scroll safeguards (`overflow-x-auto min-w-[...]`) when high detail is required.
  - Touch targets for buttons, selectors, tabs, and nodes must meet minimum accessible dimensions (at least 44x44px or padded touch zones).
- **No Horizontal Body Overflow**: Prevent unintended horizontal scrolling (`overflow-x-hidden`) on root containers.

## 2. Language Standard
- Adhere strictly to **British English (`en-GB`)** by default across all user-facing copy, documentation, commit messages, and comments (e.g., *colour*, *optimised*, *visualisation*, *centre*).
