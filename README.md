# Chaosify

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23407ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![ShadCN](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcn/ui&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![Flask](https://img.shields.io/badge/Flask-2c6a81?style=for-the-badge&logo=Flask&logoColor=white)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). The app uses [Flask](https://flask.palletsprojects.com/en/stable/) and [Pillow](https://pypi.org/project/pillow/) for it's backend and is deployed via [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## Commands

To install frontend dependencies:

```bash
npm i
```

To install backend dependencies:

Refer to [Python Documentation](https://docs.python.org/3/library/venv.html) to see how to set up a python virtual environment. After setting up a virtual environment:

```bash
pip install -r requirements.txt
```

to run the website locally:

```bash
npm run dev
```

This command uses [concurrently](https://www.npmjs.com/package/concurrently) to run both the react frontend and python backend.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To format using prettier:

```bash
npx prettier --write .
```
