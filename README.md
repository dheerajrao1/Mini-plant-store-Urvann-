
# Mini Plant Store

A full-stack plant catalog application where users can browse, search, and filter plants. Admins can add new plants, and the interface is fully responsive for desktop and mobile users.
* **URL:** `https://mini-plant-store-urvann-h3ns.vercel.app`
---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Quick Start](#quick-start)
* [Admin Credentials](#admin-credentials)
* [Deployment](#deployment)

---

## Features

### Browse Plants

* View a collection of plants with:

  * Name
  * Price
  * Categories (one or more)
  * Availability status

### Search & Filter

* Search plants by name or category keyword.
* Filter plants by categories like Indoor, Outdoor, Succulent, Home Decor, etc.

### Admin Panel

* Add new plants with details: Name, Price, Categories, Availability
* Form validates inputs before submission

### User Experience

* Responsive design for mobile and desktop
* Shows loading and error states while fetching data
* Clean, reusable React components

---

## Tech Stack

* **Frontend:** ReactJS, Vite, Axios, React Router
* **Backend:** Node.js, Express
* **Database:** MongoDB
* **Deployment:** Vercel

---

## Quick Start

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/dheerajrao1/Mini-plant-store-Urvann-.git
cd Mini-plant-store-Urvann-
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Add a `.env` file with:

```env
MONGO_URI=<your-mongodb-uri>
PORT=5000
JWT_SECRET=<your-secret-key>
```

(Optional) Seed the database with sample plants:

```bash
node src/seed/seed.js
```

Start the backend server:

```bash
npm start
```

Backend API base URL:

```
http://localhost:5000/api
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Add a `.env` file with:

```env
VITE_API_BASE=http://localhost:5000/api
```

Run the frontend locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## Admin Credentials

* **Username:** admin
* **Password:** admin123

Use these credentials to access admin features like adding new plants.

---

## Deployment

* **Frontend URL:** `https://mini-plant-store-urvann-h3ns.vercel.app`
* **Backend URL:** `https://mini-plant-store-urvann.vercel.app/api`

> Make sure `VITE_API_BASE` in frontend `.env` points to the backend URL when deploying.

---

## Notes

* Plants include realistic names, prices, and categories.
* Focused on scalability, clean code, and smooth user experience.
* API responses optimized for fast performance.

Do you want me to make that?
