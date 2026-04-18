# Goal Description

Complete redesign of the Cascade frontend to a premium dark-mode UI that feels like a state-of-the-art $20/month SaaS product. This involves implementing a specific design system, overhauling authentication pages with glassmorphism effects, and significantly revamping the Dashboard and its components (ScoreCard, Insights, and a new custom CSS ScoreChart).

## User Review Required

- **Custom CSS Chart:** I will completely remove the `recharts` library from `ScoreChart.jsx` and implement a custom CSS-based bar chart using `div` elements, as requested.
- **Icons:** I will implement inline SVG icons for the Quick Stats and action items.

## Open Questions

None at this time.

## Proposed Changes

### Global Styles

#### [MODIFY] [index.css](file:///c:/Users/ASUS/Desktop/vector/cascade-frontend/src/index.css)
- Implement global background (`#0d0d14`), primary text (`#f8fafc`), and font (`Inter, system-ui`).
- Add specific scrollbar styling (4px width, transparent track, purple thumb).

### Authentication Pages

#### [MODIFY] [Login.jsx](file:///c:/Users/ASUS/Desktop/vector/cascade-frontend/src/pages/Login.jsx)
- Full-screen dark background.
- Glass-effect card (`background: rgba(255,255,255,0.04)`, `border: 0.5px solid rgba(255,255,255,0.1)`).
- Purple gradient text for "Cascade".
- Subtitle "Your personal life optimization system".
- Dark styling for inputs and purple gradient background for the login button.

#### [MODIFY] [Register.jsx](file:///c:/Users/ASUS/Desktop/vector/cascade-frontend/src/pages/Register.jsx)
- Same design structure and input/button styles as Login.

### Dashboard & Components

#### [MODIFY] [Dashboard.jsx](file:///c:/Users/ASUS/Desktop/vector/cascade-frontend/src/pages/Dashboard.jsx)
- **Header:** Add dynamic greeting ("Good morning/afternoon/evening, [User]"), current date, and "Live" badge.
- **Layout:** Reorganize to include the Hero Card (Section A), Quick Stats (Section B - Insights), Today's Focus (Section C), 7-Day Trend (Section D - ScoreChart), and Bottleneck Alert (Section E).
- **Logout:** Update to ghost style with red text on hover.

#### [MODIFY] [ScoreCard.jsx](file:///c:/Users/ASUS/Desktop/vector/cascade-frontend/src/components/ScoreCard.jsx)
- Large hero card with subtle purple glow (`box-shadow: 0 0 40px rgba(139,92,246,0.15)`).
- Implement colored status bar below the number (0-40=red, 41-70=orange, 71-100=green).

#### [MODIFY] [Insights.jsx](file:///c:/Users/ASUS/Desktop/vector/cascade-frontend/src/components/Insights.jsx)
- Update layout to 3 cards side-by-side with colored icon circles (blue for sleep, purple for focus, teal for activity) and big numbers.

#### [MODIFY] [ScoreChart.jsx](file:///c:/Users/ASUS/Desktop/vector/cascade-frontend/src/components/ScoreChart.jsx)
- Remove `recharts`.
- Build a custom bar chart using flexbox `div` bars with purple gradients and animated slide-up on mount.
- Display score numbers above bars and day labels below.

## Verification Plan

### Automated Tests
- Run `npm run build` in `cascade-frontend` to ensure the new syntax, styles, and logic compile successfully without errors.

### Manual Verification
- Start the React dev server using `npm run dev`.
- Visually inspect the Login and Register screens to verify the glass effect and gradients.
- Visually inspect the Dashboard to confirm all 5 sections are present and accurately styled according to the design tokens.
- Verify the custom CSS bar chart animations and the dynamic greeting logic.
