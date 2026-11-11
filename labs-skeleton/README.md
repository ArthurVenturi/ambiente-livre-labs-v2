# Element Starter

A framework-free HTML, CSS, and JavaScript scaffold. It intentionally contains no page copy or example content; the HTML only provides the semantic page shell and empty insertion points.

## Start

Open `index.html` in a browser. Google Material Symbols are loaded from Google Fonts, so an internet connection is needed for the icon font.

## Structure

```text
.
├── index.html
├── README.md
├── css/
│   ├── variables.css
│   ├── reset.css
│   ├── base.css
│   ├── layout.css
│   ├── utilities.css
│   └── components/
│       ├── header.css
│       ├── navigation.css
│       ├── footer.css
│       ├── buttons.css
│       ├── forms.css
│       └── cards.css
└── js/
    └── main.js
```

## Theme and icon use

- Global brand colors, semantic theme tokens, spacing, type, shadows, and breakpoints are defined in `css/variables.css`.
- The default theme is dark. `data-theme="light"` on `<html>` activates the light semantic tokens.
- JavaScript loads a saved theme choice when available and supports optional controls with `data-theme-toggle`.
- Use Material Symbols with `<span class="material-symbols-outlined" aria-hidden="true">search</span>` once adding page content.
- CSS is loaded in dependency order from the HTML file; keep `variables.css` first.

No build step or package install is required.
