# Resume Builder

Production-oriented resume document generator built with Next.js, TypeScript, and Tailwind CSS. This project renders a printable, ATS-friendly, single-page A4 resume. It is not a portfolio website.

## Install

```bash
pnpm install
```

## Run Locally

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Edit Resume Content

All resume content lives in:

```text
src/data/resume.ts
```

Edit this file to update contact details, summary, skills, experience, projects, education, languages, enabled bullets, and section visibility.

## Enable Or Disable Bullets

Each experience bullet supports an `enabled` flag:

```ts
{
  text: "Built a shared Design System using Storybook.",
  enabled: true,
}
```

Set `enabled: false` to keep the bullet in the data file while hiding it from the rendered resume. If `enabled` is omitted, the bullet is shown by default.

## Enable Or Disable Sections

Use `resumeSettings` in `src/data/resume.ts`:

```ts
export const resumeSettings = {
  showSummary: true,
  showSkills: true,
  showProjects: false,
  showEducation: true,
  showLanguages: true,
  compactOlderExperience: true,
};
```

Projects are disabled by default so the resume can stay close to one A4 page until project details are ready.

## Export PDF

Click `Print / Export PDF`, or use the browser print command.

Recommended Chrome print settings:

- Destination: Save as PDF
- Paper size: A4
- Margins: None
- Scale: 100%
- Background graphics: Enabled
- Headers and footers: Disabled

## Validate

```bash
pnpm lint
pnpm typecheck
pnpm build
```
