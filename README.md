# Next Auth App

An example application demonstrates how to setup database stored credentials with NextAuth v5 (AuthJS) in a NextJS v14.x application.

## Getting Started

Clone this repository or download the .zip file.

### Setup Database
You can choose whatever database you want, I chose a local instance of Postgres because that is my favorite database.

#### Jump into a PSQL Shell
```sh
psql
```

#### Create Database

```sh
create database next_auth_app;
```

Verify your database was created successfully.

```sh
\l
```

--- 
## Configure Environment Variables

Create either a `.env.local` file and add the following environment variables

```env
PG_CONNECTION_STRING="postgres://<db_username>:<db_password>@<db_address>:<db_port>/<db_name>"
AUTH_SECRET="<your_auth_secret>" 
```
You can create an auth secret using the following in the terminal:

```sh
openssl rand -base64 32
```

NOTE: Note sure if this works on Windows as I'm using MacOS. 

Optionally, if you can try (assuming you've already install NextAuth):

```sh
npx auth secret
```

Now that you have your environment configured you are ready to let Drizzle create the tables.

---
## Using Drizzle ORM

### Pushing updates to the database

```sh
npx drizzle-kit push
```
When you make changes to your db schema, you should run the above command.

---
## Start the Development Server

```sh
npm run dev
```

[http://localhost:3000/login](http://localhost:3000/login)

--- 
## Resources

- [Postgres](https://www.postgresql.org/) - Backend Database.
  - [Postgres Error Codes](https://www.postgresql.org/docs/current/errcodes-appendix.html)
- [Drizzle ORM](https://orm.drizzle.team/) - Database ORM
- [`node-postgres` - `pg`](https://orm.drizzle.team/docs/get-started-postgresql#node-postgres)
- [`bcrypt`](https://www.npmjs.com/package/bcrypt) - Compare and hashing passwords.
- [AuthJS](https://authjs.dev/) - Authentication.
  - [Generating Auth Secrets](https://stackoverflow.com/questions/75000633/where-to-generate-next-auth-secret-for-next-auth)
- [TailwindCSS for NextJS](https://tailwindcss.com/docs/guides/nextjs) - CSS Styling.
- [Shadcn/ui](https://ui.shadcn.com/docs) - UI Components
- [`otplib`](https://www.npmjs.com/package/otplib) - Generating single use passwords.
- [`qrcode.react`](https://www.npmjs.com/package/qrcode.react)
