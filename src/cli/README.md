# KJV CLI

## Command

```bash
kjv <subcommand> [options]
```

## Subcommands

### `list` (alias: `books`)

Usage:

```bash
kjv list [query...] [--json]
# or
kjv books [query...] [--json]
```

Description:

- Lists all books and abbreviations.
- Optional `query` filters results using case-insensitive contains on both book name and abbreviation.

Text output:

- One line per book
- Comma-delimited: `{book},{abbreviation}`
- No headings

JSON output (`--json`):

```json
[{ "title": "Genesis", "abbreviation": "Ge" }]
```

### `show <reference...>`

Usage:

```bash
kjv show <reference...> [--json]
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
- Multi-word books can be passed as separate args (for example: `kjv show 1 John 1:1`).
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

### `categories`

Usage:

```bash
kjv categories [--json]
```

Description:

- Lists the Testament and book categories used in the website footer.
- Text output contains one category per line, such as `Old Testament` and `Pentateuch`.
- `--json` includes each category's testament, name, label, and books.

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
- A trailing `*` finds the earliest first mention of any word beginning with the prefix; quote it in your shell, for example `kjv define 'eye*'`.
- Uses closest Levenshtein match when an exact term is not found.

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

### `occurrences <term>`

Usage:

```bash
kjv occurrences <term> [-c <category>]... [-b <book>]... [--json]
```

Description:

- Shows every verse containing a case-insensitive, whole-word match for a single term.
- Results follow canonical Bible order.
- `<term>` must be a single word/term; matching is exact and case-insensitive.
- `-c`/`--category` may be repeated and is case-insensitive. Repeated categories are combined.
- `-b`/`--book` may be repeated. Each book accepts a case-insensitive full name or abbreviation.
- When categories and books are both supplied, a verse's book must match both filters.
- Testament categories select every book in that Testament. Shared labels such as `Historical` combine their matching book groups.

Examples:

```bash
kjv occurrences faith -c Gospels -c "Pauline Epistles"
kjv occurrences faith -b John -b Rom
kjv occurrences faith -c Gospels -b John
```

Text output:

```text
{book} {chapter}:{verse}

{verse} {text-of-verse}

{next-book} {next-chapter}:{next-verse}

{next-verse} {text-of-verse}
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

## Options

### `--json`

Available on all subcommands:

- `kjv list --json` (or `kjv books --json`)
- `kjv categories --json`
- `kjv show <reference...> --json`
- `kjv define <term> --json`
- `kjv occurrences <term> --json`

### `--skill`

Prints the bundled `SKILL.md` instructions for an AI agent using this CLI:

```bash
kjv --skill
```
