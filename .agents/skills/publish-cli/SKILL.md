---
name: publish-cli
description: Publish the repository's kjv-cli package to npm when the user asks for a CLI release. Use for real or dry-run CLI publishing, not general npm package publishing.
---

# Publish CLI

Publish the package produced from `src/cli` as `kjv-cli`.

## Real publish

Before invoking `publish:cli` or any command that runs `npm publish`, ask the user for a current npm authenticator one-time password (OTP). Do not reuse an OTP from an earlier attempt. Do not proceed without it, and never repeat the OTP in commentary or the final response.

After the user supplies an OTP, run the same build and preparation stages as `publish:cli`, passing the OTP only to npm's publish command. Do not forward `--otp` through `pnpm publish:cli`; its nested npm command will not receive it:

```bash
pnpm build:cli && pnpm prepare:publish:cli && npm publish ./dist --otp=<otp>
```

Report whether npm accepted the release. If npm requests another OTP or rejects the publish, stop and ask the user for a fresh OTP or the needed authorization; do not retry automatically.

## Dry run

A dry run does not publish and does not require an OTP:

```bash
npm_config_dry_run=true pnpm publish:cli
```
