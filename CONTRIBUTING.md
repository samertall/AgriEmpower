# Contributing to AgriEmpower

Thanks for helping build more accessible agriculture and nutrition education for women farmers in Rwanda.

## Workflow

1. Fork the repository.
2. Clone your fork and create a branch such as `feature/lesson-search`.
3. Make a focused change with clear commit messages.
4. Run `npm test` and `npm run build` locally.
5. Push your branch and open a pull request describing the motivation, screenshots (for UI changes), and testing performed.

## Content and product standards

- Prioritize clear language, mobile usability, accessible controls, and low-bandwidth behavior.
- Check curriculum changes with qualified local agronomy/nutrition reviewers before promoting them as advice.
- Ask native Kinyarwanda speakers to review translations; do not assume automated translation is adequate for deployment.
- Do not invent impact statistics, partnerships, field agents, success stories, or user testimonials.
- Keep personal data minimal. Do not send local drafts to external services or add analytics without an explicit, documented privacy review.
- Keep both EN and RW entries synchronized in `src/data.js` and `src/i18n.js`.
- Avoid new dependencies unless they significantly improve accessibility, reliability or maintainability.

## Issues and pull requests

Open a GitHub issue with the user problem, expected behavior and reproduction steps. For significant new features, propose the interaction, data needs and privacy constraints before implementing.

Code is licensed under the MIT License; by contributing, you agree to distribute your contribution under that license.
