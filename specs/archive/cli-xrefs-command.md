# `kjv xrefs`

Add a new subcommand to the `src/cli` tool.

## Usage

```bash
kjv xrefs <reference...> [--json]
```

## Summary

The `xrefs` subcommand shows cross references for the requested verse or verses.

It must support the same reference syntax and validation behavior as `kjv show`.

## Reference Handling

`xrefs` must accept the same reference forms as `show` (single chapter only):

- `Genesis 1:1`
- `Genesis 1:3-10`
- `Genesis 1:3,4,7`
- `Genesis 1`

Reference rules:

- Book names and abbreviations are case-insensitive.
- Multi-word books can be passed as separate args.
- Verse selections are normalized to ascending order and deduplicated.
- Cross-chapter references are not supported.

## Behavior

- Resolve `<reference...>` using the same parsing and validation logic as `show`.
- Expand the input into the resolved source verses in verse order.
- For each resolved source verse:
  - include the source verse reference
  - include the source verse text
  - fetch its cross references
  - fetch the text for each cross-referenced verse
- Emit one grouped result per resolved source verse.
- If a resolved source verse has no cross references, still emit that source verse with an empty cross-reference list.

## Text Output

Text output is grouped by resolved source verse.

For each resolved source verse, render:

```text
{source-book} {source-chapter}:{source-verse}
{source-text}

{xref-book-1} {xref-chapter-1}:{xref-verse-1}
{xref-text-1}

{xref-book-2} {xref-chapter-2}:{xref-verse-2}
{xref-text-2}
```

Repeat that block for each resolved source verse from the input reference.

If a source verse has no cross references, render the source verse reference and source verse text only.

## JSON Output

When `--json` is passed, output valid JSON as an array of grouped source-verse results:

```json
[
  {
    "reference": {
      "book": "Genesis",
      "chapter": 1,
      "verse": 1
    },
    "text": "In the beginning God created the heaven and the earth.",
    "xrefs": [
      {
        "book": "John",
        "chapter": 1,
        "verse": 1,
        "text": "In the beginning was the Word, and the Word was with God, and the Word was God."
      }
    ]
  }
]
```

Rules:

- Return one object per resolved source verse.
- `reference` describes the source verse.
- `text` is the text of the source verse.
- `xrefs` is an array of cross references for that source verse.
- Each xref record contains `book`, `chapter`, `verse`, and `text`.
- If a source verse has no cross references, `xrefs` must be an empty array.

## Errors

- Invalid references must follow existing CLI conventions.
- Errors should be written to stderr.
- Invalid input must exit with a non-zero status code.
- This behavior does not change when `--json` is present.

## Acceptance Criteria

- `kjv xrefs 'Genesis 1:1'` returns one grouped text result with source verse text and its cross references.
- `kjv xrefs 'Genesis 1:1' --json` returns one grouped JSON object with `reference`, `text`, and `xrefs`.
- `kjv xrefs 'Genesis 1:1-3'` returns three grouped results, one per resolved source verse.
- `kjv xrefs 'Genesis 1:3,1,3,2' --json` returns grouped results for verses 1, 2, and 3 in ascending order with duplicates removed.
- `kjv xrefs 'Genesis 1:31-2:3'` prints an invalid reference error and exits non-zero.
- A resolved source verse with no cross references still appears in text output and in JSON with `"xrefs": []`.
