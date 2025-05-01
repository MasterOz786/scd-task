# 🐳 MERN Application: Dockerized Deployment Project

## 🎯 Assignment Objective
This project demonstrates the deployment of a MERN (MongoDB, Express.js, React, Node.js) stack application using Docker and Docker Compose. It highlights how environment inconsistencies can hinder deployment and how containerization resolves those issues.

---

## 🧱 Project Structure
```
root/
├── backend/
│   ├── Dockerfile
│   ├── .env
│   └── src/
├── frontend/
│   ├── Dockerfile
│   ├── public/
│   └── src/
├── docker-compose.yml
└── README.md
```

---

## 📌 Part 1: Understanding Environment Inconsistency

- **Node.js v16 installed using official NodeSource instructions.**
- Verified using:
  ```bash
  node -v
  npm -v
  ```

- **Code Pulled From GitHub**:
  https://github.com/zaheersani/SCD-SP25-NodeApp

- **Deployment Issues Faced**:
  - Application crashed on Node 16 due to incompatible syntax or missing dependencies.
  - Hardcoded MongoDB URI made deployment difficult.

---

## 🐳 Part 2: Solving with Docker

- Identified compatible Node version (e.g., Node 14) from package.json / testing.
- Used Dockerfile to encapsulate correct environment.

### 🧾 Dockerfile (Backend)
```Dockerfile
FROM node:14
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
```

- Tested locally with:
  ```bash
  docker build -t node-backend .
  docker run -p 3000:3000 node-backend
  ```

- Image pushed to DockerHub: [your-dockerhub-link]

---

## ⚙️ Part 3: MERN Boilerplate Features

- ✅ Enhanced TODO edit behavior with clear UI indicators.
- ✅ Displayed timestamps using `moment.js` or `date-fns`.
- ✅ Added deletion confirmation dialog.
- ✅ MongoDB URI moved to `.env`.

---

## 🐳 Part 4: Containerizing MERN

### 📁 Dockerfile (Frontend)
```Dockerfile
FROM node:16
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 80
CMD ["npx", "serve", "build"]
```

### 🧪 Local Testing
- Built and ran both containers using MongoDB from DockerHub.
- Verified logs and running services.

---

## 🚀 Final Project Repository

- Includes updated Dockerfiles, `.env`, `docker-compose.yml`, and README.
- All components tested and deployed in simulated production.

---

## 🔗 Docker Hub Images
- Frontend: [https://hub.docker.com/repository/docker/masteroz/frontend]
- Backend: [https://hub.docker.com/repository/docker/masteroz/backend]

---

## 📝 Author
**Mohammad Hassaan Ejaz**  
FAST NUCES ISB
