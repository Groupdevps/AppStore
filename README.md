# AppStore - Next.js Ecommerce

This project is a [Next.js](https://nextjs.org) ecommerce application bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## Deployment

To deploy the app:

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

The app can be deployed on both **Windows** and **Linux** servers.

---

## Backend Configuration

- The backend uses **Firebase** as the database engine for data persistence.
- Minimal configuration is required in `package.json` to run and test the app.
- Environment variables for Firebase should be set in a `.env.local` file.

---

## Features Checklist

| Feature                                                                                                   | Status      |
|-----------------------------------------------------------------------------------------------------------|-------------|
| Deployable on Windows and Linux servers                                                                   | ✅ Done      |
| Usable and testable with minimal `package.json` configuration                                             | ✅ Done      |
| Uses a web framework (React/Angular)                                                                      | ✅ Done (React/Next.js) |
| Implements SSR (Server Side Rendering)                                                                    | ✅ Done      |
| Dynamic pagination (SPA style)                                                                            | ✅ Done      |
| Uses a database engine for data persistence (Firebase recommended)                                        | ✅ Done (Firebase) |
| Implements frontend and backend testing with >90% coverage                                                | ❌ Not yet   |
| Implements authentication/registration with Google/Facebook (OAuth2)                                      | ⚠️ Google done, Facebook not implemented |
| Backend classes for Users, Products, Orders, Categories (flexible implementation)                         | ✅ Done      |
| Security topics considered (SQL injection, XSS, etc.)                                                     | ❌ Not yet   |
| Recommendation system on homepage based on user navigation history                                        | ✅ Done      |

---

## Notes

- **Testing** and **security hardening** are pending.
- **Facebook OAuth2** authentication is not yet implemented.
- The app uses dynamic routing, SSR, and SPA features provided by Next.js.
- The backend structure (Users, Products, Orders, Categories) is implemented using Firebase collections.
- A recommendation system is available on the homepage, based on user browsing history.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub repository](https://github.com/vercel/next.js)

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
