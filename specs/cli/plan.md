# Studium CLI

## Technical Specification

- Use the `commander` package (`pnpm install commander`) to power the Studium CLI (`kjv-cli` package, `kjv` binary name).
- All CLI-specific code must go in `src/cli`
  - The entry point should be `src/cli/main.ts`
  - Each subcommand belongs in `src/cli/{subcommand}`
  - The CLI-specific `package.json` should be placed in `src/cli/package.json`
- There should be a `package.json` command - `build:cli` which uses `tsup` to output the CLI to `dist/cli/`

## `src/cli/package.json`

```json
{
  "name": "kjv-cli",
  "version": "1.0.0",
  "private": false,
  "type": "module",
  "bin": {
    "kjv": "./main.js"
  },
  "files": ["main.js", "README.md", "LICENSE"],
  "engines": {
    "node": ">=20"
  },
  "dependencies": {
    "commander": "^14.0.1"
  }
}
```

## Build and Publish

Add the following scripts to `<repo-root>/package.json`:

```json
{
  "scripts": {
    "build:cli": "tsup src/cli/main.ts --format esm --platform node --target node20 --bundle --out-dir dist/cli --out-extension .js",
    "prepare:publish:cli": "cp src/cli/package.json dist/cli/package.json && cp README.md dist/cli/README.md && cp LICENSE dist/cli/LICENSE",
    "publish:cli": "pnpm build:cli && pnpm prepare:publish:cli && npm publish dist/cli"
  }
}
```

## References

Example references:

- Genesis 1:1 - the first verse of the first chapter of the book of Genesis.
- Genesis 1:3-10 - the third through tenth verses of Genesis chapter 1.
- Genesis 1:3,4,7 - the third, fourth, and seventh verses of Genesis chapter 1.
- Genesis 1 - the entire first chapter of the book of Genesis.

Only single-chapter references are supported for `show` in this version of the CLI.

## Abbreviations

`src/data/json/book-abbreviations.json` contains the per-book abbreviations which can be used in place of the full book name.

## Case Insensitive

Book names/abbreviations must be case insensitive.

## CLI Subcommands

### `kjv list`

Should list all books and their abbreviations.
No headings. Use comma-delimited output per line.

### `kjv show <reference>`

**Verse output:**

Text output of a single verse must adhere to this format:

```
{book} {chapter}:{verse}

{verse} {text-of-verse}
```

**Verse range output:**

Text output of a verse range must adhere to this format:

```
{book} {chapter}:{verse-or-range}

{verse-1} {text-of-verse-1}
{verse-2} {text-of-verse-2}
...
{verse-N} {text-of-verse-N}
```

**Chapter output:**

Text output of an entire chapter must adhere to this format:

```
{book} {chapter}

{verse-1} {text-of-verse-1}
{verse-2} {text-of-verse-2}
...
{verse-N} {text-of-verse-N}
```

The `show` capability should be captured in a helper function which can be re-used:

Signature is `export function show(book: string, chapter: string | number, verses?: Array<string | number>)`.

`verses` is optional; when omitted, output the entire chapter.

When a verse list/range is provided, verses must be normalized to ascending order and deduplicated before output.

`show` must output via `console.*`.

### `kjv define <term>`

This should output the "First Mention" record (Book Chapter:Verse and then text just like `kjv show`) for the given `<term>` (or closest match by Levenshtein distance).

Requirements:

- Match behavior should mirror the existing "First mention" functionality in the repo's Next.js app.
- Use `src/data/json/kjv-first-mention-index.json` as the index for lookups/fuzzy matching.
- Matching is case insensitive.
- `<term>` is a single word/term.
- If multiple fuzzy matches tie, return the first match.
- If multiple matches occur in the same verse, return that verse once.

## CLI Flags

- All subcommands should support the --json flag which will result in the output being presented as valid JSON instead of text/markdown.
- `--json` output schema: an array of records with shape `{ book: string, chapter: number, verse: number, text: string }`.
- Errors should be emitted with `console.error` and a non-zero exit code (including when `--json` is used).

## Verification

Verify this spec by:

Invoke example permutations of each defined command and validate the output against the source data in each case.

Record representative permutations for each command (not exhaustive), including command, expected output, and received output, in `specs/cli/validation.md`.
