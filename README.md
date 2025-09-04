 
# 📚 CYBERTETRA – MERN Cybersecurity Learning Platform

![MERN](https://img.shields.io/badge/MERN-Stack-blueviolet?style=for-the-badge&logo=mongodb&logoColor=white) 
![React](https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react?logoColor=black) 
![Node.js](https://img.shields.io/badge/Node.js-Express-success?style=for-the-badge&logo=node.js?logoColor=white) 
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge&logo=jsonwebtokens) 
![Database](https://img.shields.io/badge/Database-MongoDB-green?style=for-the-badge&logo=mongodb) 
![Payment](https://img.shields.io/badge/Payments-Razorpay-0676E8?style=for-the-badge&logo=razorpay) 

---

## 📖 Overview

**CYBERTETRA** is a full-stack **MERN application** designed to be a comprehensive **online learning platform** focused on cybersecurity education. It allows students to **explore, enroll in, and learn from courses**, while providing administrators with a robust system to **manage courses, student data, and transactions**.

👉 This project is developed to provide a secure and intuitive platform for aspiring cybersecurity professionals.

---

## ✨ Features

### **👤 Student Features (Frontend)**

* **🔍 Course Discovery:** Browse a catalog of cybersecurity courses with filtering options based on topic, difficulty level, and ratings.
* **📚 Course Details:** View detailed course pages with syllabi, video previews, instructor profiles, and student reviews.
* **💳 Seamless Enrollment:** An end-to-end enrollment process with secure payment integration via **Razorpay**.
* **🚀 Personalized Dashboard:** A dedicated student dashboard to track enrolled courses, view progress, and manage profile information.
* **⭐ Reviews & Ratings:** Students can rate and review courses to help the community.

---

### **🛠️ Admin Features (Backend)**

* **🔑 Secure Admin Login:** Access the admin dashboard with a secure, role-based login.
* **📊 Dashboard Analytics:** Gain insights into key metrics such as student enrollment, revenue, and popular courses.
* **👨‍🏫 Course Management:** A powerful CMS for admins to add new courses, update content, manage video lessons, and organize course categories.
* **🎓 Student Management:** View and manage a list of all enrolled students, their course progress, and enrollment history.
* **💰 Transaction History:** Track all payment transactions and manage refunds.
* **📝 Content Moderation:** Moderate student reviews and manage static pages like About Us, FAQ, and Privacy Policy.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | ![React](https://img.shields.io/badge/React-Vite-61DAFB?style=flat&logo=react) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express) |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb) (Atlas) |
| **Auth** | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens) + ![bcrypt](https://img.shields.io/badge/bcrypt-Password--Hashing-orange) |
| **Payments** | ![Razorpay](https://img.shields.io/badge/Razorpay-0079C1?style=flat&logo=razorpay) |

---

## 📂 Folder Structure

The project follows a standard MERN stack structure, separating the client and server codebases for modularity and scalability.

## 🚀 Getting Started

### Prerequisites

* Node.js (v14.x or later)
* MongoDB (local or cloud-based like Atlas)
* npm or yarn
* A Razorpay account for payment gateway integration

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/cybertetra.git](https://github.com/your-username/cybertetra.git)
    cd cybertetra
    ```

2.  **Set up the backend:**
    ```bash
    cd server
    npm install
    ```
    Create a `.env` file in the `server/` directory with your environment variables:
    ```
    MONGO_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=your_jwt_secret_key
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    ```

3.  **Set up the frontend:**
    ```bash
    cd ../client
    npm install
    ```
    Create a `.env` file in the `client/` directory with your environment variables:
    ```
    VITE_SERVER_URL=http://localhost:5000/api
    ```

### Running the application

1.  **Start the backend server:**
    ```bash
    cd server
    npm start
    ```

2.  **Start the frontend development server:**
    ```bash
    cd ../client
    npm run dev
    ```

The application will now be live. The frontend will be accessible at `http://localhost:5173` (or the default port for Vite), and the backend API will be running on `http://localhost:5000`.

---

## 🤝 Contributing

We welcome contributions to CYBERTETRA! Please read our `CONTRIBUTING.md` file for detailed guidelines on how to contribute.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
