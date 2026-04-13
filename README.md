# Tabletop Eco Score

Static GitHub Pages calculator for a board game environmental impact rubric.

## Local structure

- `index.html`: page shell and calculator layout
- `styles.css`: visual design
- `rubric.js`: rubric definition, point values, caps, and tier bands
- `app.js`: scoring logic and UI rendering

## Publish on GitHub Pages

1. Push this repo to GitHub.
2. In the repository settings, open `Pages`.
3. Set the source to `Deploy from a branch`.
4. Choose the default branch and `/ (root)`.
5. Save.

GitHub Pages will serve `index.html` directly.

## Scoring model

- Base product score is the sum of the weight field and categories 2-7.
- Penalties are summed and capped at `-10`.
- Verified sustainability actions are summed only when disclosure is `>= +2`, then capped at `+10`.
- Final score = `base subtotal + penalties + disclosure + verified actions`.
- The page also generates a BGG forum-format export with an optional `[thing=id]` game tag.
- Impact tiers:
- `72+`: `LIGHT`
- `52–71`: `MODEST`
- `32–51`: `CONSIDERABLE`
- `Below 32`: `HEAVY`

## Rubric note

The current rubric hard-codes lack of meaningful disclosure as `-3` and blocks verified actions unless disclosure is at least `+2`.
