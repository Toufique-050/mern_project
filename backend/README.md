# EventSphere Backend

MERN backend for the EventSphere college event management system.

## Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication
- bcryptjs password hashing
- Multer file uploads
- QRCode attendance
- PDFKit certificates

## Requirements

- Node.js 20+
- MongoDB local installation or MongoDB Atlas

## Setup

```bash
cd backend
npm install
```

Update `.env` with your MongoDB connection string and a strong JWT secret.

Start development server:

```bash
npm run dev
```

Production-style start:

```bash
npm start
```

Health check:

```text
GET http://localhost:5000/api/health
```

## Optional demo data

```bash
npm run seed
```

Seed accounts:

```text
Admin:
admin@eventsphere.com
Password123!

Organizer:
organizer@eventsphere.com
Password123!

Participant:
student@eventsphere.com
Password123!
```

Change/delete these demo credentials before a real deployment.

## Main API groups

```text
/api/auth
/api/users
/api/events
/api/registrations
/api/attendance
/api/certificates
/api/feedback
/api/media
/api/admin
```

## File uploads

Event banner:

```text
POST /api/events
Content-Type: multipart/form-data
field: banner
```

Gallery media:

```text
POST /api/media
Content-Type: multipart/form-data
field: file
```

Maximum upload size is 10 MB per file.

## Authentication

Send the JWT returned by login in:

```text
Authorization: Bearer YOUR_TOKEN
```

## Important

The frontend must call the backend API. It should never connect directly to MongoDB.
