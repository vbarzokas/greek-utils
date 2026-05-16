# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0]

### Added
- **`toUpperCase(text)`** — Greek-typographic uppercase that drops tonos on vowels (Άκης → ΑΚΗΣ) while preserving dialytika and converting final sigma. Unlike JavaScript's built-in `.toUpperCase()`, which incorrectly keeps the tonos.
- **`toLowerCase(text)`** — Greek-aware lowercase that additionally normalizes σ at the end of a Greek word to the final form ς.
- **`normalizeFinalSigma(text)`** — Normalizes sigma form in Greek text bidirectionally: σ at end of word → ς, ς inside a word → σ.
- TypeScript declaration file (auto-generated from TypeScript source) — consumers now get types out of the box.
- ESM entry point (`lib/index.mjs`) with named exports — supports `import { toGreek } from 'greek-utils'`.
- `exports`, `types`, `files`, and `engines` fields in `package.json` (Node `>=18`).
- GitHub Actions CI workflow with a Node 18/20/22 matrix.
- CodeQL security analysis workflow.
- Dependabot config for weekly npm + GitHub Actions updates.
- `c8` test coverage with thresholds (lines 90%, functions 90%, branches 80%); currently at 100% / 98%.
- Edge-case test suite covering non-string inputs, idempotency, mixed scripts, long inputs, and regex special chars in `ignoreCharacters`.

### Changed
- **BREAKING:** Source migrated to TypeScript (`src/`) with the build emitting `lib/`. Anyone working off the repo source must now run `npm run build` first.
- **BREAKING:** Dropped support for Node <18 via the new `engines` field. The library was already incompatible with end-of-life Node versions in practice.
- **BREAKING:** Deep imports (e.g. `require('greek-utils/lib/mappings/diacritics-map')`) are now blocked by the `exports` field in `package.json`. Use the public API.
- `removeStopWords` now returns non-string inputs unchanged, matching the other methods (previously threw on `null`/`undefined`).
- Precompiled regex maps at module load instead of rebuilding on every call. Notable speedup for `removeStopWords` (was building ~290 RegExp objects per invocation).
- Migrated from `.eslintrc` + `standard` to ESLint 9 flat config (`eslint.config.js`).
- Replaced deprecated `test/mocha.opts` with `.mocharc.json`.

### Fixed
- Regex special characters (`]`, `\`, `^`, `-`) in user-supplied `ignoreCharacters` are now escaped before being injected into the regex character class. Previously these could corrupt the lookahead.

### Removed
- Travis CI configuration (Travis-CI.org has been shut down).
- `standard` dev dependency (was unused alongside `eslint`).

### Security
- Removed several layers of deprecated transitive dependencies by upgrading ESLint and Mocha.

## [1.3.0] and earlier

See [git history](https://github.com/vbarzokas/greek-utils/commits/master) for prior releases.

[2.0.0]: https://github.com/vbarzokas/greek-utils/compare/v1.3.0...v2.0.0
[1.3.0]: https://github.com/vbarzokas/greek-utils/releases/tag/v1.3.0
