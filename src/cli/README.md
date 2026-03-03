# KJV CLI

## Command

```bash
kjv <subcommand> [options]
```

## Subcommands

### `list`

Usage:

```bash
kjv list [--json]
```

Description:

- Lists all books and abbreviations.

Text output:

- One line per book
- Comma-delimited: `{book},{abbreviation}`
- No headings

JSON output (`--json`):

```json
[{ "title": "Genesis", "abbreviation": "Ge" }]
```

### `show <reference>`

Usage:

```bash
kjv show <reference> [--json]
```

Description:

- Shows one verse, a verse selection, or a full chapter.

Supported reference forms (single chapter only):

- `Genesis 1:1`
- `Genesis 1:3-10`
- `Genesis 1:3,4,7`
- `Genesis 1`

Reference rules:

- Book names/abbreviations are case-insensitive.
- Verse selections are normalized to ascending order and deduplicated.
- Cross-chapter references are not supported.

Text output:

Single verse:

```text
{book} {chapter}:{verse}

{verse} {text-of-verse}
```

Verse range/selection:

```text
{book} {chapter}:{verse-or-range}

{verse-1} {text-of-verse-1}
{verse-2} {text-of-verse-2}
...
```

Whole chapter:

```text
{book} {chapter}

{verse-1} {text-of-verse-1}
{verse-2} {text-of-verse-2}
...
```

JSON output (`--json`):

```json
[
  {
    "book": "Genesis",
    "chapter": 1,
    "verse": 1,
    "text": "In the beginning..."
  }
]
```

### `define <term>`

Usage:

```bash
kjv define <term> [--json]
```

Description:

- Shows the first-mention verse for a single term.

Rules:

- `<term>` must be a single word/term.
- Matching is case-insensitive.
- Uses closest Levenshtein match when exact term is not found.

Text output:

```text
{book} {chapter}:{verse}

{verse} {text-of-verse}
```

JSON output (`--json`):

```json
[
  {
    "book": "Exodus",
    "chapter": 4,
    "verse": 14,
    "text": "And the anger of the LORD..."
  }
]
```

## Options

### `--json`

Available on all subcommands:

- `kjv list --json`
- `kjv show <reference> --json`
- `kjv define <term> --json`
