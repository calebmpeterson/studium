# CLI Validation

Validation binary for this run:

```bash
node /private/tmp/kjv-cli.js
```

## 1) `list` (text)

Command:

```bash
node /private/tmp/kjv-cli.js list
```

Expected output (first 8 lines from `book-abbreviations.json`):

```text
Genesis,Ge
Exodus,Exo
Leviticus,Lev
Numbers,Num
Deuteronomy,Deu
Joshua,Josh
Judges,Jdgs
Ruth,Ruth
```

Received output:

```text
Genesis,Ge
Exodus,Exo
Leviticus,Lev
Numbers,Num
Deuteronomy,Deu
Joshua,Josh
Judges,Jdgs
Ruth,Ruth
```

## 2) `show` single verse

Command:

```bash
node /private/tmp/kjv-cli.js show 'Genesis 1:1'
```

Expected output (from `kjv.json`):

```text
Genesis 1:1

1 In the beginning God created the heaven and the earth.
```

Received output:

```text
Genesis 1:1

1 In the beginning God created the heaven and the earth.
```

## 3) `show` normalized/deduplicated verse list

Command:

```bash
node /private/tmp/kjv-cli.js show 'ge 1:7,4,4,3-5'
```

Expected output (normalized to ascending unique verses 3,4,5,7):

```text
Genesis 1:3-5,7

3 And God said, Let there be light: and there was light.
4 And God saw the light, that it was good: and God divided the light from the darkness.
5 And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.
7 And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so.
```

Received output:

```text
Genesis 1:3-5,7

3 And God said, Let there be light: and there was light.
4 And God saw the light, that it was good: and God divided the light from the darkness.
5 And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.
7 And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so.
```

## 4) `show --json`

Command:

```bash
node /private/tmp/kjv-cli.js show 'Ge 1:1-2' --json
```

Expected output (array of `{ book, chapter, verse, text }`):

```json
[
  {
    "book": "Genesis",
    "chapter": 1,
    "verse": 1,
    "text": "In the beginning God created the heaven and the earth."
  },
  {
    "book": "Genesis",
    "chapter": 1,
    "verse": 2,
    "text": "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters."
  }
]
```

Received output:

```json
[
  {
    "book": "Genesis",
    "chapter": 1,
    "verse": 1,
    "text": "In the beginning God created the heaven and the earth."
  },
  {
    "book": "Genesis",
    "chapter": 1,
    "verse": 2,
    "text": "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters."
  }
]
```

## 5) `define` exact term

Command:

```bash
node /private/tmp/kjv-cli.js define aaron
```

Expected output (from `kjv-first-mention-index.json` key `aaron`):

```text
Exodus 4:14

14 And the anger of the LORD was kindled against Moses, and he said, Is not Aaron the Levite thy brother? I know that he can speak well. And also, behold, he cometh forth to meet thee: and when he seeth thee, he will be glad in his heart.
```

Received output:

```text
Exodus 4:14

14 And the anger of the LORD was kindled against Moses, and he said, Is not Aaron the Levite thy brother? I know that he can speak well. And also, behold, he cometh forth to meet thee: and when he seeth thee, he will be glad in his heart.
```

## 6) `define` fuzzy term

Command:

```bash
node /private/tmp/kjv-cli.js define aaronitee
```

Expected output (closest key resolves to `aaronit`):

```text
1 Chronicles 12:27

27 And Jehoiada was the leader of the Aaronites, and with him were three thousand and seven hundred;
```

Received output:

```text
1 Chronicles 12:27

27 And Jehoiada was the leader of the Aaronites, and with him were three thousand and seven hundred;
```

## 7) Error handling: invalid reference

Command:

```bash
node /private/tmp/kjv-cli.js show 'Genesis 1:31-2:3'; echo EXIT:$?
```

Expected output:

```text
Invalid reference: Genesis 1:31-2:3
EXIT:1
```

Received output:

```text
Invalid reference: Genesis 1:31-2:3
EXIT:1
```

## 8) Error handling: invalid define term

Command:

```bash
node /private/tmp/kjv-cli.js define 'two words'; echo EXIT:$?
```

Expected output:

```text
The define command accepts a single term only.
EXIT:1
```

Received output:

```text
The define command accepts a single term only.
EXIT:1
```

## 9) `define --json`

Command:

```bash
node /private/tmp/kjv-cli.js define aaron --json
```

Expected output:

```json
[
  {
    "book": "Exodus",
    "chapter": 4,
    "verse": 14,
    "text": "And the anger of the LORD was kindled against Moses, and he said, Is not Aaron the Levite thy brother? I know that he can speak well. And also, behold, he cometh forth to meet thee: and when he seeth thee, he will be glad in his heart."
  }
]
```

Received output:

```json
[
  {
    "book": "Exodus",
    "chapter": 4,
    "verse": 14,
    "text": "And the anger of the LORD was kindled against Moses, and he said, Is not Aaron the Levite thy brother? I know that he can speak well. And also, behold, he cometh forth to meet thee: and when he seeth thee, he will be glad in his heart."
  }
]
```

## 10) `list --json`

Command:

```bash
node /private/tmp/kjv-cli.js list --json
```

Expected output (excerpt, first records):

```json
[
  {
    "book": "Genesis",
    "chapter": 0,
    "verse": 0,
    "text": "Ge"
  },
  {
    "book": "Exodus",
    "chapter": 0,
    "verse": 0,
    "text": "Exo"
  },
  {
    "book": "Leviticus",
    "chapter": 0,
    "verse": 0,
    "text": "Lev"
  }
]
```

Received output (excerpt, first records):

```json
[
  {
    "book": "Genesis",
    "chapter": 0,
    "verse": 0,
    "text": "Ge"
  },
  {
    "book": "Exodus",
    "chapter": 0,
    "verse": 0,
    "text": "Exo"
  },
  {
    "book": "Leviticus",
    "chapter": 0,
    "verse": 0,
    "text": "Lev"
  }
]
```
