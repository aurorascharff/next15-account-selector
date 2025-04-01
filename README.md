# Next.js App Router starter project with ESLint, Prettier and Tailwind set up

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Upgrading to Eslint 9 (executed on 2024-12-03)

First, update the eslint package to the latest version. I'll use the `ncu` package to update everything in the package.json file.

```bash
ncu -u 
npm install
```

Then, update the eslint configuration file to the new format.

Referring to the [migration guide](https://eslint.org/docs/latest/use/configure/migration-guide), run the following command:

```bash
npx @eslint/migrate-config .eslintrc.json
```

Wait for the migration to finish and then run the following command to install the necessary dependencies (as prompted by the migration tool):

```bash
npm install @eslint/compat globals @eslint/js @eslint/eslintrc -D
```

Reload the editor and open the new `eslint.config.mjs` file.

Assign the default to a variable before exporting it as prompted by eslint. Then save it to run eslint format on the file.

Aslo, remove excess spacing between lines to clean up the file.

```javascript
const eslintConfig = [
  // your config here
];

export default eslintConfig;
```

Delete the `eslint.json` and `.eslintignore` files.

Ignored files are now inside the `ignores: {}` section of the `eslint.config.mjs` file.

Verify that eslint works by running the following command:

```bash
npm run lint
```

You should see the following output:

```bash
✔ No ESLint warnings or errors
```

Also, verify that autoformatting works by adding the following to any tsx file:

```javascript
const t = "t"
```

Then save the file and verify that the variable is deleted and the file is formatted correctly.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
