# 📝 Notes App

![GitHub repo size](https://img.shields.io/github/repo-size/MrXaid/notes-app) 
![GitHub language count](https://img.shields.io/github/languages/count/MrXaid/NotesAppChallenge) 
![GitHub top language](https://img.shields.io/github/languages/top/MrXaid/NotesAppChallenge)
![License](https://img.shields.io/github/license/MrXaid/NotesAppChallenge)

A **full-stack notes application** built with **Spring Boot** (backend) and **React** (frontend). Store, edit, and manage your notes securely and efficiently.

---

## 🌟 Features

- ✅ User Authentication with JWT
- ✅ Add, Edit, Delete, View Notes (CRUD)
- ✅ Responsive design for mobile and desktop
- ✅ Secure backend with Spring Boot, JPA, and Spring Security
- ✅ Frontend with React and Tailwind CSS
- ✅ Role-based access ready for future enhancements

---

## 🖼 Screenshots

### Login Page
![Login](./notes-frontend/screenshots/login.png)

### Notes Dashboard
![Dashboard](./notes-frontend/screenshots/dashboard.png)

### Add / Edit Note
![Add Note](./notes-frontend/screenshots/add-note.png)

---

## ⚙️ Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| React    | Spring Boot | H2 / MySQL |
| Tailwind CSS | Java 17 | JPA / Hibernate |
| Axios | Spring Security | |

---

## 🚀 Getting Started

### Prerequisites

- Java 17+
- Maven
- Node.js & npm
- Git

---

### Clone the Repository
```bash
git clone https://github.com/<your-username>/notes-app.git
cd notes-app
Backend Setup
cd notes-backend
mvn clean install
mvn spring-boot:run


Backend runs on http://localhost:8080

Frontend Setup
cd notes-frontend
npm install
npm start
