# Imagyn Reviews — Marketing Site

The official marketing website for [Imagyn Reviews](https://apps.shopify.com), a premium Shopify review app.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Deployed on Vercel

## Pages

Home, Features, Pricing, Documentation, Support, Contact, Privacy Policy, Terms of Service.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY` — required for the `/contact` page to actually deliver email via [Resend](https://resend.com). Without it, the contact form shows a clear error instead of silently failing.

## Production build

```bash
npm run build
npm run start
```

## Deployment

Pushing to `main` deploys automatically via the connected Vercel project. Remember to set `RESEND_API_KEY` in the Vercel project's environment variables for the contact form to work in production.
