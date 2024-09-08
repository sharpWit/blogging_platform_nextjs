This is a [Blogging Platform Next.js](https://sharpwit.github.io/blogging_platform_nextjs/) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install dependency:

Second, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Setup

The project uses **Vercel** for hosting, and a **PostgreSQL** database has been provisioned directly within Vercel.

1. **Database Creation**:  
   A PostgreSQL database was created in Vercel to store application data.

2. **Prisma Integration**:  
   Prisma ORM has been installed and configured to manage the database. It handles migrations, schema management, and database queries. The connection to the PostgreSQL database is established through environment variables.

## CI/CD

This project utilizes **GitHub Actions** and **Vercel** for continuous integration and deployment.

1. **GitHub Actions**:  
   Continuous Integration (CI) and Continuous Deployment (CD) are managed using GitHub Actions. Workflow files responsible for testing, building, and deploying the project can be found in the `.github/workflows` directory of this repository.

2. **Vercel Deployment**:  
   The project is hosted on Vercel, ensuring smooth deployment and scaling. The Vercel configuration includes automated deployments triggered by changes in the repository.
