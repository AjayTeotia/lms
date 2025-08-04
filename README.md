# Vibe 🚀  
**The Ultimate LMS Platform**  
_Build full-featured, secure, and scalable LMS platforms effortlessly._

---

## ✨ Features

- 🌐 **Next.js 15 (Turbopack)**
- 🎨 **Tailwind CSS** & **Shadcn UI**
- 🔐 **Authentication** via **Better-Auth** (Email OTP + GitHub OAuth)
- 🛡️ **Arcjet Security** – Protects against XSS, SQL Injection, & more
- 📈 **Progress & Lesson Completion Tracking**
- 🧑‍💼 **Admin Dashboard** + 👤 **Customer Dashboard**
- 🚫 **Rate Limiting**
- 🎥 **Custom Video Player**
- 📊 **Interactive Analytics** with Recharts
- 📁 **File Uploads with Presigned S3 URLs**
- 💳 **Stripe Payment Integration**
- 🖱️ **Drag & Drop Course Builder**
- 📝 **Custom Rich Text Editor with TipTap**
- 🧮 **Neon Postgres DB + Prisma ORM**
- 🚀 **Vercel Deployment Ready**

---

## 🛠️ Tech Stack

| Category            | Tech Used                              |
|---------------------|----------------------------------------|
| **Frontend**        | React 19, TypeScript, Tailwind CSS     |
| **UI Components**   | Shadcn UI, Radix UI, Lucide Icons      |
| **Backend**         | Next.js 15 (Turbopack), tRPC           |
| **Authentication**  | Better-Auth (Email OTP, GitHub OAuth)  |
| **Security**        | Arcjet                                 |
| **Database**        | Prisma + Neon PostgreSQL               |
| **Storage**         | AWS S3 (Presigned URLs)                |
| **Payments**        | Stripe                                 |
| **Deployment**      | Vercel                                 |

---

## 🚀 Getting Started

### 1. **Clone the Repository**

```bash
git clone https://github.com/AjayTeotia/lms.git
cd lms
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Configure Environment Variables**

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Fill it in with your credentials:

```env
# Auth
BETTER_AUTH_SECRET=""
BETTER_AUTH_URL="

# Database
DATABASE_URL=""

# GitHub OAuth
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Email
RESEND_API_KEY=""

# Arcjet
ARCJET_KEY=""

# AWS S3
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_ENDPOINT_URL_S3=""
AWS_ENDPOINT_URL_IAM=""
AWS_REGION=auto
NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES=""

# Stripe
STIPE_SECRET_KEY=""
STIPE_WEBHOOK_SECRET=""
```

### 4. **Setup Prisma**

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. **Run the App**

```bash
npm run dev
```

Now, visit **[http://localhost:3000](http://localhost:3000)** to access your LMS!

---

## 📁 Project Structure

```
lms/
├── src/
│   ├── app/              # Next.js 15 app directory
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utilities, config, auth
├── prisma/               # Prisma schema and migrations
├── public/               # Static files
└── package.json
```

---

## 🔧 Available Scripts

| Script             | Purpose                                          |
|--------------------|--------------------------------------------------|
| `npm run dev`      | Launch in development mode (hot reload)          |
| `npm run build`    | Bundle the app for production                    |
| `npm run start`    | Start the production server                      |
| `npm run lint`     | Lint code with ESLint                            |
| `npm run postinstall` | Generate Prisma client                        |

---

## 🎯 Key Functionalities

| Module                 | Description                                 |
|------------------------|---------------------------------------------|
| **Authentication**     | Email OTP, GitHub OAuth (Better-Auth)       |
| **Security**           | Bot detection, request validation (Arcjet)  |
| **Rich Content**       | Drag & drop builder, rich text with TipTap  |
| **File Uploads**       | Secure AWS S3 presigned URLs                |
| **Payments**           | Stripe Checkout & Webhooks                  |
| **Admin Tools**        | Course creation, analytics, uploads         |
| **User Tools**         | Dashboard, progress tracker, videos         |

---

## 🤝 Contributing

We welcome contributions!

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License – see the LICENSE file for more details.

---

## 🙏 Acknowledgments

- **Vercel** for Next.js and deployment platform
- **Better-Auth** for simple, secure authentication
- **Arcjet** for robust security
- **Neon, Postgres** for scalable database
- **Tailwind CSS & Shadcn UI** for styling
- **Stripe** for payment handling
- **Radix UI & Lucide** for UI and icons
- **AWS S3** for file storage
