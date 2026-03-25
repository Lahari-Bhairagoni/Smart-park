# Virtual Smart Parking Management System

## Overview

The Virtual Smart Parking Management System is a web-based application designed to improve urban parking efficiency by enabling users to view available parking slots, book them in advance, and complete payments digitally. The system minimizes manual intervention and enhances user convenience through an intuitive interface and intelligent features.

---

## Features

* User Authentication (Register and Login)
* Real-time Parking Slot Availability (Simulated)
* Slot Booking System
* Payment Validation (Card, UPI, Wallet)
* User-Specific Booking History (My Bookings)
* AI-Based Slot Recommendation
* Route Suggestion with Traffic Awareness
* Responsive and User-Friendly Interface

---

## Technologies Used

**Frontend**

* HTML
* CSS
* JavaScript

**Backend**

* Node.js
* Express.js

**Data Storage**

* JSON-based file storage

---

## System Architecture

The application follows a client-server architecture:

* The frontend handles user interaction and sends requests to the backend.
* The backend processes API requests and manages data storage.
* Data is stored in JSON files for simplicity and rapid development.

---

## Project Structure

```
smart-park/
│
├── backend/
│   ├── data/
│   │   ├── bookings.json
│   │   └── users.json
│   ├── routes/
│   │   ├── auth.js
│   │   ├── bookings.js
│   │   ├── payments.js
│   │   └── slots.js
│   └── server.js
│
├── frontend/
│   ├── css/
│   ├── js/
│   └── pages/
│
└── README.md
```

---

## Installation and Setup

### 1. Clone the Repository

```
git clone https://github.com/Lahari-Bhairagoni/Smart-park.git
cd Smart-park
```

### 2. Install Backend Dependencies

```
cd backend
npm install
```

### 3. Start the Backend Server

```
node server.js
```

The backend will run on:

```
http://localhost:5000
```

### 4. Run the Frontend

Open the frontend pages (e.g., `index.html`) in a browser or using a local server.

---

## Usage Flow

1. Register a new user account
2. Login with valid credentials
3. View available parking slots
4. Select and book a slot
5. Enter vehicle details
6. Complete payment with validation
7. View booking details in "My Bookings"

---

## AI Features

The system includes basic rule-based intelligent features:

* **Slot Recommendation**: Suggests an optimal parking slot based on availability
* **Route Suggestion**: Provides a route recommendation considering traffic conditions and estimated time

These features simulate intelligent decision-making and can be extended using machine learning models.

---

## Limitations

* Uses JSON for data storage instead of a database
* No real-time IoT integration for slot detection
* Basic authentication without encryption or token-based security
* Simulated traffic and availability data

---

## Future Enhancements

* Integration with IoT sensors for real-time parking detection
* Implementation of machine learning models for predictive analytics
* Secure authentication using JWT and password hashing
* Mobile application development
* Cloud deployment and scalability improvements

---

## Conclusion

This project demonstrates a scalable prototype for smart parking management using modern web technologies. It provides a foundation that can be extended into a fully automated system with real-time data and advanced AI capabilities.

---

## Author

Lahari Bhairagoni

---
