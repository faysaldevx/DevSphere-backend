<div align="center">

# 🌍 DevSphere – Server

### REST API for the DevSphere social development events platform

</div>

---

## 📖 About

This is the backend for **DevSphere**, a platform where people create, discover and join local social service events. The server stores events in MongoDB and checks the user's login token (JWT) issued by BetterAuth on the DevSphere client.

---

## ✨ Features

- ⚡ **REST API** built with Express.js
- 🍃 **MongoDB** database for storing events and the volunteers who join them
- 🔐 **JWT verification** using the client's BetterAuth JWKS endpoint (`jose`)
- 🌐 **CORS** enabled so the Next.js client can talk to the API
- ☁️ Ready to deploy on **Vercel**

---

## 🧰 Tech Stack

| Technology | Purpose |
| --- | --- |
| Node.js + Express.js | Server and routes |
| MongoDB (official driver) | Database |
| jose | JWT verification |
| cors | Cross-origin requests from the client |
| dotenv | Environment variables |

---

## 🛣️ API Routes

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/` | Check that the server is running |
| `POST` | `/event` | Create a new event |
| `GET` | `/events` | Get all events |
| `GET` | `/events/:id` | Get one event by its id |
| `PATCH` | `/events/:id` | Update an event (also used to save joined volunteers) |
| `DELETE` | `/events/:id` | Delete an event |

Protected requests send the login token in the header:

```
Authorization: Bearer <token>
```

---

## 🗂️ Event Data Example

```json
{
  "title": "Winter Clothes Distribution – Mirpur 10",
  "description": "Collecting and handing out warm clothes for families in need.",
  "eventType": "Donation",
  "thumbnail": "https://example.com/image.jpg",
  "location": "Mirpur 10, Dhaka",
  "eventDate": "2026-11-28T00:00:00.000Z",
  "createdBy": "organizer@example.com",
  "creatorName": "Organizer Name",
  "createdAt": "2026-11-19T10:00:00.000Z",
  "joinedUsers": [
    { "email": "volunteer@example.com", "name": "Volunteer Name", "joinedAt": "2026-11-20T09:00:00.000Z" }
  ]
}
```

---

## 🚀 Getting Started

### 1. Install

```bash
git clone https://github.com/your-username/devsphere-server.git
cd devsphere-server
npm install
```

### 2. Environment variables

Create a `.env` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
```

- `MONGODB_URI` – your MongoDB Atlas connection string
- `CLIENT_URL` – the address of the DevSphere client (used to verify login tokens)

> ⚠️ Never commit your `.env` file. Make sure it is listed in `.gitignore`.

### 3. Run

```bash
npx nodemon index.js
```

The server runs on **http://localhost:8000**.

---

## 👤 Author

**Your Name** – [@your-username](https://github.com/your-username)
