
#  LearnSphere — Modern eLearning Platform

LearnSphere is a **full-stack eLearning platform** designed to deliver a complete, real-world digital learning experience.  
It enables instructors to build structured courses and learners to engage through interactive lessons, quizzes, progress tracking, and gamification.

This project was built during a **hackathon**, with a strong focus on **product thinking, business logic, and scalable architecture**.

---

##  Key Features

###  Instructor / Admin (Backoffice)
- Create, edit, and manage courses
- Add lessons: **Video, Document, Image, Quiz**
- Publish / unpublish courses
- Configure access rules:
  - Open
  - Invitation only
  - Paid courses
- Build quizzes with **attempt-based scoring**
- Invite learners via email
- View detailed learner progress reports

### Learner (Website / App)
- Browse and enroll in courses
- Full-screen immersive lesson player
- Resume learning from last progress
- Attempt quizzes with multiple retries
- Earn **points and badges**
- Submit **ratings and reviews**
- Track course completion status

---

##  Core Concepts Implemented

- Role-based access control (Admin / Instructor / Learner)
- Progress-driven learning flow
- Gamification using points & badge levels
- Attempt-based quiz rewards
- Paid and invitation-only course access
- Course ratings & reviews
- Accurate progress and completion tracking

---

##  Tech Stack

### Frontend
- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **shadcn/ui**
- **Lucide Icons**

### Architecture
- Context API for authentication & user state
- Modular component-based structure
- Clean separation of pages, components, and logic
- Mock data layer (API-ready)

---

##  Project Structure

```
src/
├── components/
│   ├── courses/
│   ├── ui/
│   └── common/
│
├── pages/
│   ├── CourseDetailPage.tsx
│   ├── LessonPlayerPage.tsx
│   └── MyCoursesPage.tsx
│
├── contexts/
│   └── AuthContext.tsx
│
├── data/
│   └── mockData.ts
│
├── types/
│   └── index.ts
│
└── lib/
    └── utils.ts
```

---

##  Learning Experience

### Course Detail Page
- Course overview with progress indicators
- Lesson list with completion status
- Search lessons by name
- Enroll / Buy / Continue learning
- Ratings & reviews section

### Full-Screen Lesson Player
- Sidebar with lesson navigation
- Video / Document / Image viewer
- Integrated quiz engine
- Next / Back navigation
- Automatic progress tracking

### Quiz Engine
- One question per page
- Multiple attempts allowed
- Points decrease with each retry
- Completion synced with course progress

---

##  Gamification System

| Badge Level | Points |
|------------|--------|
| Newbie     | 20     |
| Explorer   | 40     |
| Achiever   | 60     |
| Specialist | 80     |
| Expert     | 100    |
| Master    | 120    |

Points are primarily earned through quiz completion.

---

##  Visibility & Access Rules

| Visibility | Access Rule | Description |
|-----------|-------------|-------------|
| Everyone  | Open        | Anyone can access |
| Signed In | Invitation  | Only invited users |
| Signed In | Paid        | Requires payment |

---

##  Payments (Mock)
- Payment modal simulation
- Course unlocks after purchase
- Easily replaceable with Stripe / Razorpay

---

##  Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation & Run

```bash
npm install
npm run dev
```

---

##  Why LearnSphere?

- Real-world LMS workflow
- Business-rule driven logic
- Clean, responsive UI
- Scalable and API-ready architecture
- Focused on real product use-cases

This project is **more than UI** — it reflects **industry-level system thinking**.

---

##  Future Enhancements
- Backend integration (Node / Firebase / Supabase)
- Real payment gateway
- Certificate generation
- Analytics dashboards
- Mobile application

---

##  Team
Built with ❤️ during a hackathon, optimized for **clarity, impact, and execution**.
CODING!  CREATION!  INNOVATION!