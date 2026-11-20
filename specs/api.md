# KJV Web API plan

## Goal

Expose the four data capabilities of the `kjv` CLI through stable, versioned
JSON API routes under `/api/v1/*`. This keeps the new public contract separate
from the main app's existing, unversioned API routes.

This is a read-only API over bundled KJV data. It should be same-origin at
launch; public cross-origin access, authentication, and rate limits are
separate product decisions.

## Current state and compatibility

The existing routes should remain unchanged in this work:

| Existing route | Existing purpose and response | Relationship |
| --- | --- | --- |
| `GET /api/books` | `{ books: string[] }` | Does not expose CLI abbreviations or filtering. |
| `GET /api/kjv/:book/:chapter` | `{ book, chapter, verses }`, slug path inputs and app `Verse` records | Keep as the page-oriented chapter route. |
| `GET /api/search` | First-mention, semantic, and fuzzy text search results | Discovery search, not exact CLI occurrences. |
| `GET /api/first-mention-index` | Entire first-mention index | Needed by the current in-browser UI. |
| `GET /api/cross-references`, `GET /api/table-of-contents` | App-specific support data | Out of scope. |

The new API can ship without moving any browser callers. New UI work can opt in
once a narrower response is useful.

## Route map

All new routes accept `GET` only and support JSON and plain-text response
representations through the standard `Accept` request header. Every query
parameter must occur at most once; a duplicate is a `400`, not an arbitrary
first or last value.

| CLI capability | Endpoint | Query parameters | Success payload |
| --- | --- | --- | --- |
| `kjv list [query...]` | `GET /api/v1/books` | `q` optional non-empty string; case-insensitive substring on title or abbreviation | `data.items: Book[]` |
| `kjv show <reference...>` | `GET /api/v1/verses` | `reference` required; URL-encoded CLI reference | `data: { reference, verses: Verse[] }` |
| `kjv define <term>` | `GET /api/v1/first-mentions` | `term` required; one non-whitespace-delimited term | `data: FirstMentionLookup` |
| `kjv occurrences <term>` | `GET /api/v1/occurrences` | `term` required; one non-whitespace-delimited term; `limit` optional positive integer (default `100`, maximum `500`); `offset` optional non-negative integer (default `0`) | `data: { term, total, limit, offset, items: Verse[] }` |

`reference` deliberately matches `kjv show` rather than splitting request data
into `book`, `chapter`, and `verses`. That gives web callers the same grammar as
the CLI and leaves one normalizer to maintain. Supported values are a full book
title or abbreviation (case-insensitive), a chapter, a comma-separated verse
selection, or an inclusive verse range, all within one chapter:

```text
/api/v1/verses?reference=Genesis%201
/api/v1/verses?reference=ge%201%3A3-10
/api/v1/verses?reference=1%20John%201%3A3%2C4%2C7
```

Selections are de-duplicated and returned in ascending verse order. Cross-
chapter references remain unsupported.

## Content negotiation

The client selects its response representation with `Accept`, not a query
parameter and not request `Content-Type` (the latter describes a request body,
and these read-only routes have none).

| `Accept` value | Representation |
| --- | --- |
| Omitted, `*/*`, or a request that ranks JSON highest | `application/json; charset=utf-8` (default) |
| `text/plain` ranked highest | `text/plain; charset=utf-8` |
| Neither `application/json` nor `text/plain` is acceptable | `406 Not Acceptable`, `not_acceptable` error |

Honor normal `Accept` quality values when both supported types are present; for
example, `Accept: text/plain;q=1, application/json;q=0.8` selects text. A
plain `Accept: application/json` remains the recommended choice for browser
and programmatic clients because it preserves the response envelope and all
metadata.

Plain text is the CLI's existing human-readable rendering, with one trailing
newline:

| Endpoint | `text/plain` body |
| --- | --- |
| `/api/v1/books` | The `kjv list` lines: `{title},{abbreviation}`. |
| `/api/v1/verses` | The `kjv show` output for the supplied reference. |
| `/api/v1/first-mentions` | The `kjv define` output for the resolved first mention. |
| `/api/v1/occurrences` | The `kjv occurrences` output for the selected page of matches. |

For occurrence requests, pagination remains in effect for both formats. JSON
includes `total`, `limit`, and `offset` in its body; the plain-text form adds
`X-Total-Count`, `X-Result-Limit`, and `X-Result-Offset` response headers so a
script can paginate without parsing prose. A successful empty plain-text
occurrences page has a `200` status and an empty body.

## Response contracts

### Common envelope

Successful responses:

```json
{ "data": {} }
```

JSON client errors:

```json
{
  "error": {
    "code": "invalid_parameter",
    "message": "term must be a single non-empty term",
    "parameter": "term"
  }
}
```

`parameter` is omitted when an error concerns the whole request. Clients should
branch on `code`, not the human-readable message.

When `text/plain` was selected, errors use a single line in the form
`{code}: {message}\n`. A `406` can use this form only when `text/plain` is
acceptable; otherwise it returns the JSON error shape so the client receives a
machine-readable explanation of the failed negotiation.

### Shared resource types

New endpoints use the CLI's numeric record shape rather than the current app
`Verse` type, whose chapter and verse fields are strings and which includes a
preformatted reference.

```ts
type Verse = {
  book: string;
  chapter: number;
  verse: number;
  text: string;
};

type Book = {
  title: string;
  abbreviation: string;
};
```

```json
// GET /api/v1/verses?reference=Genesis%201%3A1
{
  "data": {
    "reference": "Genesis 1:1",
    "verses": [
      {
        "book": "Genesis",
        "chapter": 1,
        "verse": 1,
        "text": "In the beginning God created the heaven and the earth."
      }
    ]
  }
}
```

```ts
type FirstMentionLookup = {
  query: string;       // supplied term after trimming
  matchedTerm: string; // lower-case index key that was selected
  match: "exact" | "closest";
  verse: Verse;
};
```

`matchedTerm` and `match` make the CLI's Levenshtein fallback explicit. For
example, `?term=aaronitee` returns `match: "closest"`, the selected index key,
and that key's verse rather than silently presenting it as an exact result.

Occurrence results are in canonical Bible order. A valid term with no matching
verses is an empty collection (`200`, `total: 0`, `items: []`), rather than the
CLI's human-facing "No occurrences found" error. Invalid terms remain `400`.

## Validation, status codes, and HTTP behavior

Add a shared query reader that rejects `string[]`, missing required values,
blank values, and invalid pagination. Use Zod, already a project dependency,
for the request schemas; do not coerce malformed values such as `limit=ten` or
`offset=-1`.

| Condition | Status | Error code |
| --- | --- | --- |
| Unsupported method | `405` and `Allow: GET` | `method_not_allowed` |
| Neither supported representation is acceptable | `406` | `not_acceptable` |
| Missing, duplicate, malformed, or invalid parameter | `400` | `invalid_parameter` |
| Invalid reference grammar, range, or selection | `400` | `invalid_reference` |
| Validly parsed but unknown book | `404` | `book_not_found` |
| Known book with absent chapter or out-of-range verse | `404` | `verse_not_found` |
| Unexpected failure | `500` | `internal_error` |

Do not send raw errors or stacks to clients. Log the underlying failure with
route and request identifier (where available). Set a common cache policy for
the immutable corpus: `public, s-maxage=86400, stale-while-revalidate=604800`.
Revisit it if the data later becomes user-specific or remotely updated.

## Reuse design

Do not invoke the compiled `kjv` binary or import Commander command factories
from an API route. Those layers own argument parsing, `console` output,
`process.exitCode`, and text formatting. Instead, move the CLI's pure data and
domain logic into a framework-neutral `src/kjv/` module, with adapters on top:

```text
src/kjv/
  types.ts
  data/{kjv-data,book-abbreviations,first-mention-index}.ts
  books/{buildBookLookup,resolveBookTitle}.ts
  verses/{parseReference,normalizeVerseSelection,getVerses}.ts
  first-mentions/{lookupFirstMention,ensureSingleTerm,findClosestFirstMentionKey}.ts
  occurrences/findOccurrences.ts
  books.ts
src/cli/
  commands/  # parse CLI args, call src/kjv, format stdout/stderr
  output/    # CLI-only presentation
src/pages/api/v1/
  books.ts
  verses.ts
  first-mentions.ts
  occurrences.ts
  _shared.ts # validation, method/error/envelope/cache helpers
```

Move the logic currently in `listBookRecords`, `parseReference`,
`normalizeVerseSelection`, `show`, `resolveBookTitle`, `getFirstMentionRecord`,
and `findOccurrences` without changing its data semantics. Rename `show` to an
HTTP-neutral `getVerses`, retaining a thin `show` wrapper if it protects the
CLI module surface and tests. Split first-mention lookup so it returns both the
chosen index key and verse; the CLI adapter can still render only the verse.

Represent invalid references, unknown books, missing chapters, and invalid
verse selections as typed domain errors (or a discriminated result). Both CLI
and API adapters can then translate the same outcomes without matching error
message strings.

Do not fold existing app-specific readers (`getBookAndChapter`,
`getTextSearchResults`, or cross-reference helpers) into this first extraction:
their types and behavior differ. They can delegate to `src/kjv` later, after
compatibility tests establish their present contracts.

## Implementation sequence

1. Add the shared `src/kjv` types, data accessors, resolvers, parsers, and
   services by moving pure CLI code unchanged; introduce typed domain outcomes
   at existing validation points.
2. Update the four CLI commands to call shared services while preserving their
   text, JSON, and exit-code behavior. Keep output code in `src/cli`.
3. Add API helpers for method enforcement, single-value query parsing, Zod
   schemas, `Accept` negotiation, JSON/plain-text serializers, error
   serialization, envelopes, pagination headers, and cache headers.
4. Add the four `src/pages/api/v1/*.ts` handlers. Do not modify existing API
   routes or their callers.
5. Add endpoint documentation and decide independently whether any browser UI
   should migrate to the new contracts.

## Verification plan

Preserve existing CLI unit tests and add shared-service tests covering full
chapters, case-insensitive abbreviations, normalized selections, exact and fuzzy
first mentions, and canonical whole-word occurrences.

Add handler tests for all success paths and for duplicate parameters, invalid
terms, malformed references, unknown books, non-`GET` methods, empty occurrence
results, pagination bounds, and cache/`Allow` headers. Test JSON defaulting,
explicit plain-text CLI-compatible output, `Accept` quality ordering, and `406`
responses as well. Assert status, headers, and body.

Run `pnpm test:run`, `pnpm typecheck`, `pnpm lint`, `pnpm build:cli`, and
`pnpm build`. Smoke-test each new path locally and confirm that established
`/api/books`, `/api/search`, `/api/kjv/:book/:chapter`, and cross-reference
responses are unchanged.
