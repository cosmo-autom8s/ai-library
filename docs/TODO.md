# TODO

Rolling list of tasks, improvements, and ideas for the AI Knowledge Library.

---

## Up Next

- [ ] **Multi-category support** — Change `category` from single enum to array in `velite.config.ts` (`s.enum(categories)` → `s.array(s.enum(categories))`). Then update: category page routing, filtering logic, sidebar/nav, card display, and all existing entry frontmatter. See [ea-content-plan.md](plans/ea-content-plan.md) for the planned multi-category mappings per entry.

## Backlog

- [ ] **Entry card image previews** — Add a `bannerImage` field to the entry schema in `velite.config.ts` and render it in the `EntryCard` component on the homepage feed. Currently images only show inline in the entry detail page body, not in the card grid. Reference: TAAFT shows image/video previews in scrollable cards.
- [ ] **Banner image component** — Replace inline `![](...)` markdown images with a proper banner component in `EntryDetail` that reads from the schema field, with consistent sizing and responsive behavior.

## Done

_(Move completed items here with the date)_
