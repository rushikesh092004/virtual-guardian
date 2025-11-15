# Virtual Guardian – Project Skeleton (3-Folder Structure)

## 📂 Folder Structure

```
virtual-guardian/
│
├── frontend/     → React Native mobile app
├── backend/      → Node.js backend (APIs + cron)
└── database/     → DB models, schema & connection files
```

## 📝 What Goes Where?

### 🟦 frontend/
All mobile app code:
- App.js
- screens/
- components/
- services/api.js
- services/location.js

### 🟧 backend/
Node.js backend:
- server.js
- routes/
- controllers/
- cron/
- services/

### 🟩 database/
Database-related:
- models/
- db.js
- schema diagrams
- sample documents

## 🚀 How Team Members Use This

### Mobile Team → work inside `/frontend`
### Backend API Team → work inside `/backend`
### Database Team → work inside `/database`

Subfolders can be created later as required.

## 👍 Simple, clean & perfect for hackathons
