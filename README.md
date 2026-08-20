# VeltrixCRM

**VeltrixCRM** is a modern, lightweight Customer Relationship Management (CRM) web application designed to streamline client interactions, lead management, and team workflows. Built with a focus on performance, scalability, and ease of deployment, it provides teams with an intuitive platform to track and manage customer lifecycles effectively.

---

## Purpose & Overview

Managing customer relationships efficiently requires structured data tracking and seamless collaboration. VeltrixCRM solves common CRM workflow bottlenecks by offering:
* **Centralized Data Management:** Easily store, view, and organize customer information, accounts, and communication history.
* **Streamlined Authentication:** Quick and secure sign-ins using built-in Google OAuth integration alongside traditional authentication.
* **Modern Cloud Integration:** Optimized for serverless and containerized cloud environments to scale on demand.

---

## Tech Stack

* **Backend Framework:** PHP 8.2+ / [Laravel](https://laravel.com)
* **Frontend Asset Bundling:** [Vite](https://vitejs.dev)
* **Database:** [PostgreSQL](https://www.postgresql.org) (Serverless via [Neon](https://neon.tech)) / MySQL
* **Authentication:** Laravel Auth & Google OAuth
* **Containerization & Hosting:** Docker, [Render](https://render.com)

---

## Prerequisites

Before running the project locally, ensure you have installed:
* **PHP** >= 8.2
* **Composer**
* **Node.js & npm**
* **PostgreSQL** or **MySQL**

---

## Quickstart / Local Setup

1. **Clone the repository**
```bash
   git clone [https://github.com/Balaji-Sri-Ram/VeltrixCRM.git](https://github.com/Balaji-Sri-Ram/VeltrixCRM.git)
   cd VeltrixCRM
```
   
2. **Install Backend & Frontend Dependencies**
```bash
composer install
npm install

```


3. **Configure Environment Variables**
```bash
cp .env.example .env

```


*Update `.env` with your database credentials and Google OAuth API keys.*
4. **Generate Application Key**
```bash
php artisan key:generate

```


5. **Run Migrations & Seeders**
```bash
php artisan migrate:fresh --seed

```


6. **Build Frontend Assets & Start the Server**
```bash
npm run build
php artisan serve

```


*Visit `http://localhost:8000` in your browser.*

---

## Deployment (Render & Neon)

VeltrixCRM includes full Docker support and is optimized for direct deployment on **[Render](https://render.com)** backed by a **[Neon PostgreSQL](https://neon.tech)** serverless database.

### Production Environment Configuration

Set the following environment variables in your deployment dashboard:

```env
APP_ENV=production
APP_DEBUG=false
DB_CONNECTION=pgsql
DB_HOST=ep-your-neon-host.aws.neon.tech
DB_PORT=5432
DB_DATABASE=neondb
DB_USERNAME=neondb_owner
DB_PASSWORD="endpoint=ep-your-neon-endpoint;your_actual_password"
DB_SSLMODE=require
QUEUE_CONNECTION=sync

```

> **Note:** The `endpoint=...;` prefix in `DB_PASSWORD` is required for specific older `libpq` drivers and local Windows development. On modern Linux containers (such as Render native builds), you can use the raw database password.

Live Demo Link : https://veltrixcrm.onrender.com
