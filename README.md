# Inkwell

A deployment-ready MERN blog application with JWT authentication, post CRUD, comments, search, image uploads, profiles, and a responsive Tailwind UI.

## Run locally

1. Copy `server/.env.example` to `server/.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install everything with `npm run install:all`.
3. Start both apps with `npm run dev`.
4. Open `http://localhost:5173`.

The API runs on `http://localhost:5000`. Uploaded images are served from `/uploads`.

## Production

Build the client with `npm run build`, then serve `client/dist` from your preferred static host. Set `CLIENT_URL` to that host in the API environment and run the Express server with `npm start --prefix server`.
