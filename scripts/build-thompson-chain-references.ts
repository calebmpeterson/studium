import fs from "node:fs";
import _ from "lodash";
import { JSDOM } from "jsdom";
import minimist from "minimist";

type VerseReference = {
  type: "verse";
  book: string;
  chapter: string;
  verse: string;
};

type ChainReference = {
  type: "chain";
  label: string;
  id: string;
};

type Reference = VerseReference | ChainReference;

type ReferenceChain = {
  label?: string;
  references: Reference[];
};

type Entry = {
  id: string;
  name: string;
  chains: ReferenceChain[];
};

const parseVerseReference = (reference: string): VerseReference => {
  const [bookAndChapter, verse] = reference.split(":");
  const bookAndChapterParts = bookAndChapter.split(" ");

  // Example: Genesis 2
  if (bookAndChapterParts.length === 2) {
    return {
      type: "verse",
      book: bookAndChapterParts[0],
      chapter: bookAndChapterParts[1],
      verse,
    };
  }
  // Example 2 Timothy 1
  else if (bookAndChapterParts.length === 3) {
    return {
      type: "verse",
      book: bookAndChapterParts[0] + " " + bookAndChapterParts[1],
      chapter: bookAndChapterParts[2],
      verse,
    };
  }

  throw new Error(`Unhandled verse reference format: "${reference}`);
};

const parseChainReference = ($reference: Element): ChainReference => {
  const $anchor = $reference.querySelector("a");
  if (!$anchor) {
    throw new Error(`Chain reference has no anchor: ${$reference.innerHTML}`);
  }

  const href = $anchor.getAttribute("href");

  if (!href) {
    throw new Error(`Chain reference has no href ${$reference.innerHTML}`);
  }

  const label = $anchor.innerHTML;

  if (!label) {
    throw new Error(`Chain reference has no label ${$reference.innerHTML}`);
  }

  return {
    type: "chain",
    id: href?.split("#")[1],
    label,
  };
};

const abort = (message: string, error?: unknown) => {
  console.error(message, error ?? "no error available");
  process.exit(1);
};

const log = (...args: unknown[]) => {
  console.log(
    ...args.map((arg) => {
      if (_.isObject(arg) || _.isArray(arg)) {
        return JSON.stringify(arg, null, 2);
      }
      return arg;
    })
  );
};

const hasMultipleChains = ($entry: Element) =>
  Boolean($entry.querySelector("ul"));

console.log("Reading document");
const raw = fs.readFileSync(
  "./src/data/epub/thompson-chain-reference-study-bible/OEBPS/Text/part0000.xhtml",
  "utf8"
);

console.log("Parsing document");
const { document } = new JSDOM(raw).window;
const $entries = document.querySelectorAll('h3[id^="V"]');

const argv = minimist(process.argv.slice(2));
const { limit } = argv;
console.log({ limit });

let results: Entry[] = [];

for (const [index, $name] of $entries.entries()) {
  if (index >= limit) {
    break;
  }

  const id = $name.getAttribute("id") as unknown as string;
  const name = $name.querySelector("a")!.innerHTML.trim();

  const entrySelector = `h3[id="${id}"] + ul`;
  const $entry = document.querySelector(entrySelector);

  if ($entry) {
    if (hasMultipleChains($entry)) {
      console.warn(`${id} skipped: multiple chains not handled yet`);
      const entry = {
        id,
        name,
        chains: [],
      };

      results.push(entry);
    } else {
      try {
        // If there is a label, it's the first <li>
        const $label = $entry.querySelector("ul li:first-of-type");
        const labelHTML = $label?.innerHTML;
        const label = labelHTML?.includes("href") ? undefined : labelHTML;

        const $references = $entry.querySelectorAll("li:has(a)");

        const references = _.map($references, ($reference) => {
          if ($reference.innerHTML.startsWith("SEE")) {
            return parseChainReference($reference);
          }

          const reference = $reference.querySelector("a")!.innerHTML;
          return parseVerseReference(reference);
        });

        const entry: Entry = {
          id,
          name,
          chains: [
            {
              label: label,
              references,
            },
          ],
        };

        results.push(entry);
      } catch (error) {
        abort(`Failed to process ${id} / ${name}`, error);
      }
    }
  } else {
    abort(`Mismatched element for ${id} / ${name} ${entrySelector}`);
  }
}

console.log(`Results ${results.length}`);

for (const result of results) {
  log(result.id, result);
}
