---
name: kjv-cli
description: Query the King James Version with the kjv CLI for book metadata, passages, first mentions, or exact whole-word occurrences. Use for KJV lookup tasks; not for biblical interpretation, cross references, or other translations.
---

# KJV CLI

Use `kjv` to retrieve KJV text. Add `--json` whenever the result will be consumed programmatically or needs structured fields.

## Choose a command

- `kjv list [query...]` lists books and abbreviations. An optional query matches either field case-insensitively.
- `kjv show <reference...>` retrieves a passage within one chapter.
- `kjv define <term>` returns one first-mention verse for a single term. It uses case-insensitive exact keys, then a closest-spelling fallback when no exact key exists. A quoted trailing `*` performs a case-insensitive prefix lookup and returns the earliest matching first mention, for example `kjv define 'eye*'`; verify the returned term when precision matters.
- `kjv occurrences <term>` returns every verse with a case-insensitive whole-word match for one term, in canonical Bible order.

## References

Pass book titles or abbreviations case-insensitively. Multi-word book titles may be separate arguments.

```bash
kjv show Genesis 1:1       # one verse
kjv show Genesis 1:3-10    # range
kjv show Genesis 1:3,4,7   # selection
kjv show Genesis 1         # whole chapter
kjv show 1 John 1:1        # multi-word book
```

References cannot span chapters. Verse selections are returned in ascending, deduplicated order.

## Boundaries

`define` and `occurrences` each accept one non-empty term. `occurrences` is exact whole-word matching, not fuzzy or stemmed. The CLI intentionally does not provide cross-reference lookup.
