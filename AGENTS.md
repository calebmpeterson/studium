# Agent Guide

## CLI

### Local Build

The CLI source is in `src/cli`; its publishable package is built into `dist` with:

```bash
pnpm build:cli
```

To exercise the local build as the system-wide `kjv` command during development, link the generated package:

```bash
cd dist
npm link
```

`npm link` creates a global symlink to this checkout's `dist` directory. Rebuild after CLI source changes so the linked command uses the current bundle.

For a non-linked install of an exact local build, package and install its tarball instead:

```bash
cd dist
npm pack
npm install --global ./kjv-cli-<version>.tgz
```

Install a published release with `npm install --global kjv-cli`.
