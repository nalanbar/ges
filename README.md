# Tabletop Eco Score

Static GitHub Pages calculator for the board game environmental impact rubric in `tabletop_eco_score_v03.xlsx`.

## Local structure

- `index.html`: page shell and calculator layout
- `styles.css`: visual design
- `app.js`: rubric data, scoring logic, and UI rendering

## Publish on GitHub Pages

1. Push this repo to GitHub.
2. In the repository settings, open `Pages`.
3. Set the source to `Deploy from a branch`.
4. Choose the default branch and `/ (root)`.
5. Save.

GitHub Pages will serve `index.html` directly.

## Scoring model

- Base product score is the sum of the seven rubric categories.
- Penalties are summed and capped at `-15`.
- Verified sustainability actions are summed and capped at `+5`.
- Final score = `base subtotal + penalties + disclosure + verified actions`.
- Impact tiers:
  - `80+`: `LIGHT`
  - `60–79`: `MODEST`
  - `40–59`: `CONSIDERABLE`
  - `Below 40`: `HEAVY`

## Rubric note

The workbook includes both a `0` disclosure option and a note saying silence should default to `-5`. The site exposes that note as an explicit control so you can choose whether to apply it.
