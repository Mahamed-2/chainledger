# Digital Product Passport (DPP) Demo Platform 🇪🇺

An end-to-end, locally runnable demonstration of a Digital Product Passport system built to align with the upcoming EU Ecodesign for Sustainable Products Regulation (ESPR) and the Chainledger consortium standards.

## 🚀 Features

*   **Chainledger-Compliant Data Model**: 7 Prisma models covering the entire product lifecycle (Materials, Processes, Footprint, Certifications, etc.).
*   **eIDAS 2.0 Role Simulation**: Next.js Middleware simulating 4 distinct roles (Consumer, Recycler, Auditor, Brand Admin) with field-level data filtering in the API.
*   **GDPR Article 30 Compliance**: Automatic logging of data access tied to eIDAS pseudo-identities.
*   **SHACL Schema Validation**: Simulated Zod validation engine for incoming ESPR payloads.
*   **GS1 Digital Link URI Resolution**: Resolving products strictly via GS1 syntax.

## 🧩 Tech Stack

*   **Framework**: Next.js 14 (App Router)
*   **Language**: TypeScript
*   **Database**: Prisma ORM with SQLite (for easy local portable demo)
*   **Styling**: Tailwind CSS, Glassmorphism UI
*   **Libraries**: React Leaflet (Supply Chain Maps), Recharts (Ecological Footprint), Lucide React (Icons), Zod (Validation)

## 📦 Run Locally

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Generate Prisma Client & Push Schema**:
    ```bash
    npx prisma db push
    ```
3.  **Seed the Database** (Loads the H&M Sustainable Outfit demo data):
    ```bash
    npm run prisma:seed
    ```
4.  **Start Development Server**:
    ```bash
    npm run dev
    ```

Navigate to `http://localhost:3000` to view the Customer Landing Page and access the B2C passport, B2B Dashboard, and Admin PIM Hub.

## 🚢 Deployment (Vercel)

For stateless deployment to Vercel, ensure you bind a PostgreSQL/MySQL database via Vercel Storage instead of using SQLite, as Serverless functions have read-only filesystems. Since this is a demo, deploying with SQLite works for purely read-only interactions (assuming the `dev.db` is committed to the repository).
