# Studium

A responsive web-based reader for the Authorized King James Version of the Bible.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## CLI

### Local Build

Build the `kjv-cli` package from this checkout:

```bash
pnpm build:cli
```

For local CLI development, link the generated package globally:

```bash
cd dist
npm link
```

This makes `kjv` available as a system-wide command and links it to this checkout's `dist` directory. Rebuild after changing CLI source files to update the command.

To install a specific local build without linking it, package and install the tarball:

```bash
cd dist
npm pack
npm install --global ./kjv-cli-<version>.tgz
```

For a published release, install from npm:

```bash
npm install --global kjv-cli
```

### Standalone executable

With Node.js 25.5 or newer, build a standalone executable for the current
operating system and architecture:

```bash
pnpm build:cli:standalone
./dist/standalone/kjv --help
```

On Windows the executable is `dist/standalone/kjv.exe`. It includes the Node.js
runtime, CLI data, and `--skill` instructions, so it can be copied and run without
installing Node.js. Build separately for each target platform. On macOS the build
applies an ad hoc signature. This uses Node's single executable application
feature, which is still under active development.

## License

Source code is licensed under the MIT License.

Individual datasets, found in `src/data` are covered by their respective licenses/copyrights where indicated.
