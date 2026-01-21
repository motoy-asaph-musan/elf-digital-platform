
# ELF Digital Platform
**Competency-Based Learning & Examination System**

A full-stack web platform designed to support competency-based education models, learner assessment, and digital exam management.  
Built with a modern, scalable architecture suitable for educational institutions and professional bodies.

---

## 🚀 Project Overview

The ELF Digital Platform provides a centralized system for:
- Managing learners and institutions
- Conducting competency-based exams
- Viewing leaderboards and performance analytics
- Role-based access for administrators and users

The platform was designed and implemented as a **production-ready system**, not a demo or tutorial project.

---

## 🧱 Architecture

This repository follows a **monorepo structure**:

```
elf-digital-platform/
├── elf-platform-api/        # NestJS backend (REST API)
├── elf-frontend/            # React (Vite) frontend
├── elf-platform-mobile/     # Mobile app (future extension)
├── docs/                    # Documentation & diagrams
└── README.md
```

### Backend (API)
- **Framework:** NestJS (TypeScript)
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Auth:** JWT-based authentication (OAuth-ready)
- **Features:**
  - Role-based access control (Admin / User)
  - Secure exam submissions
  - Leaderboards with region-based filtering
  - Modular architecture (Users, Exams, Payments-ready)

### Frontend (Web)
- **Framework:** React + Vite
- **Language:** TypeScript
- **Features:**
  - Responsive UI (mobile-first)
  - Secure login & protected routes
  - Admin dashboard
  - Exam interface and results views

---

## 🔐 Authentication & Roles

- Admin / Superuser
- Standard User (Learner)

The system is designed to support:
- Google Authentication
- Facebook Authentication
- JWT-based session handling

---

## 💳 Payments (Planned & Integrated Design)

The backend architecture supports:
- Donations
- Subscriptions
- Payment retries
- Webhook handling

Designed for integration with:
- MTN Mobile Money
- Airtel Money
- Visa / Card payments

Each payment flow is modular and auditable.

---

## 📊 Admin Features

- View donations and subscriptions
- Monthly analytics summaries
- Leaderboards (national & regional)
- User and school management

---

## 🛠️ Tech Stack

**Frontend**
- React
- Vite
- TypeScript
- CSS

**Backend**
- NestJS
- Prisma ORM
- PostgreSQL

**DevOps**
- Git & GitHub
- Render (deployment)
- REST APIs

---

## ⚙️ Local Development

### Backend
```bash
cd elf-platform-api
npm install
npm run start:dev
```

### Frontend
```bash
cd elf-frontend
npm install
npm run dev
```

---

## 🌍 Deployment

- Deployed on Render
- Indexed by Google
- Production-ready configuration

---

## 📌 Status

This project is actively maintained and serves as a **portfolio-grade full-stack system** demonstrating real-world architecture, security, and scalability.

---

## 👤 Author

**Motoy Asaph Musan**  
Biomedical Engineer | Full-Stack Developer  
Specialized in HealthTech, Education Systems, and Scalable Web Platforms

---

## 📄 License

This project is proprietary and showcased for professional and portfolio purposes.
