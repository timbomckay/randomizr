# randomizr

A **Gifts Randomizr** — a full-screen party app for drawing names at random, one gift at a time. Add everyone to the list with how many gifts they have, hit **Show**, then click through to reveal who's up next.

Live at [timbomckay.github.io/randomizr](https://timbomckay.github.io/randomizr/).

## Quickstart

```bash
npm install && npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |

There is no test suite and no lint step. Type checking is not part of the build — run it on demand:

```bash
npx tsc --noEmit
```

## How it works

The app has two screens, toggled by the `presenting` property on `<the-app>`:

**Entries** — add a name with a gift count, adjust counts inline, remove people. The badge in the heading shows the running total.

**Presenting** — full-screen draw mode.

| Input | Action |
| --- | --- |
| Click, `Space`, `→`, `Enter`, `Tab` | Draw the next name |
| `Esc` | Back to the entry list |
| Fullscreen button | Toggle browser fullscreen |

Each draw decrements that person's gift count and **writes straight back to `localStorage`**, so a session is persistent and picks up where it left off. Once everyone reaches zero the screen settles on "Merry Christmas".

> Testing tip: draws are destructive. To reset, bump the counts back up on the entry screen, or clear the `randomizr` key in `localStorage`.

### The draw order

[`src/utils/stack.ts`](src/utils/stack.ts) doesn't just shuffle a flat list — that would happily hand someone two gifts in a row. Instead it deals gifts into *bowls*, one bowl per average gift count, shuffles each bowl, then flattens them. Someone with three gifts lands in three different bowls and so gets spread across the running order. [`shuffle.ts`](src/utils/shuffle.ts) is a plain Fisher-Yates.

## Stack

- [Lit](https://lit.dev) 3 — web components, everything renders in shadow DOM
- [Tailwind CSS](https://tailwindcss.com) 4 via [`@tailwindcss/vite`](https://tailwindcss.com/docs/installation/using-vite)
- [TypeScript](https://www.typescriptlang.org/) 7
- [Vite](https://vite.dev) 8

Tailwind v4 compiles through Lightning CSS, so there's no `postcss.config.js` and no plugin chain to maintain.

### Tailwind inside shadow DOM

Shadow roots don't inherit page-level styles, so a normal Tailwind setup would leave every component unstyled. [`src/utils/tailwind`](src/utils/tailwind/index.ts) compiles the utility layers into a single sheet and exports it as a Lit `CSSResult`:

```ts
static styles = [_tailwind, unsafeCSS(style)];
```

Every component that wants Tailwind classes pulls in `_tailwind` this way. [`src/index.css`](src/index.css) separately covers the light-DOM document styles.

## Layout

```
src/
  app/            <the-app> — root shell, view switching, fullscreen
  views/
    entries/      <the-entries> — the name/count list
    presenting/   <the-presenting> — the draw screen
  components/     <the-clock>, <snow-effect>
  utils/
    stack.ts      draw-order generator
    shuffle.ts    Fisher-Yates
    storage.ts    localStorage read/write
    tailwind/     shared Tailwind sheet for shadow roots
public/assets/    fonts and images, copied verbatim
```

Components import their own scoped CSS with Vite's `?inline` query, which hands back a string suitable for `unsafeCSS`.

## Deploying

Pushing to `master` triggers [`.github/workflows/gh-pages.yml`](.github/workflows/gh-pages.yml), which builds and publishes `dist/` to GitHub Pages. There is no separate CI job, so a broken build shows up as a failed deploy.

`base` is set to `/randomizr` in [`vite.config.ts`](vite.config.ts) to match the Pages subpath.

Dependency updates arrive as a single batched PR each month — see [`.github/dependabot.yml`](.github/dependabot.yml).
