# Changelog

## 1.0.3

### Patch Changes

- 8054923: Add AI assistant skill for automatic gradient upgrades and simplify README
  - Added SKILL.md for AI coding assistants (Claude Code, Codex, OpenCode) to automatically upgrade bg-gradient-to-\* utilities (thanks to [@ieedan](https://github.com/ieedan/))
  - Simplified package README with cleaner design and badges
  - Root README now symlinks to package README

## 1.0.2

### Patch Changes

- a08c91b: Update README with full documentation, OG image, and CSS output example

## 1.0.1

### Patch Changes

- 5852b7b: Add README to npm package

## 1.0.0

### Major Changes

Initial release of tw-easing-gradients - Tailwind CSS v4 plugin for smooth easing gradients.

**Features:**

- 4 easing functions: `ease`, `ease-in`, `ease-out`, `ease-in-out`
- 8 gradient directions: `t`, `r`, `b`, `l`, `tl`, `tr`, `bl`, `br`
- Configurable color stops (2-100, default: 15)
- CSS `color-mix()` in oklch for smooth transitions
- Full TypeScript support
