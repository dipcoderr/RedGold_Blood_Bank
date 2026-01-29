# RedGold Blood Bank Management System

A comprehensive blood bank management system built with React.js frontend and Node.js backend, designed to streamline blood donation and booking processes.

## 🩸 Features

- **User Authentication**: Secure login/register system with JWT tokens
- **Blood Donation**: Easy appointment booking for blood donation
- **Blood Bank Management**: View and manage available blood inventory
- **Booking System**: Book blood for medical needs
- **Admin Panel**: Administrative controls for managing the system
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Tech Stack

### Frontend
- React.js 17
- React Router DOM
- Bootstrap 5
- React Toastify for notifications
- Moment.js for date handling
- React Spinners for loading states

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled
- dotenv for environment variables

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/dipcoderr/RedGold_Blood_Bank.git
   cd RedGold_Blood_Bank
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application**
   ```bash
   # Start server (from server directory)
   npm start
   
   # Start client (from client directory)
   npm start
   ```

   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 🌐 Deployment

This project is configured for deployment on Vercel with the following setup:

### Environment Variables (Production)
- `MONGO_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: production

### Deploy to Vercel
1. Fork/Clone this repository
2. Connect to Vercel
3. Set environment variables
4. Deploy!

## 📱 Usage

### For Donors
1. Register/Login to the system
2. Navigate to Dashboard
3. Click "Donate" to schedule an appointment
4. View your donation history

### For Recipients
1. Register/Login to the system
2. Browse available blood inventory
3. Book blood based on your requirements
4. Track your booking status

### For Administrators
1. Login with admin credentials
2. Manage blood inventory
3. View all appointments and bookings
4. Manage user accounts

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Profile Management
- `GET /api/profile/:userId` - Get user profile
- `PUT /api/profile/update/:userId` - Update user profile

### Blood Management
- `GET /api/blood/all` - Get all blood inventory
- `POST /api/blood/add` - Add blood to inventory (Admin)
- `DELETE /api/blood/delete/:bloodId` - Remove blood (Admin)

### Appointments (Donations)
- `GET /api/appointment/all` - Get all appointments
- `POST /api/appointment/new` - Create new appointment
- `DELETE /api/appointment/delete/:appointmentId` - Cancel appointment

### Bookings
- `GET /api/booking/all` - Get all bookings
- `POST /api/booking/new` - Create new booking
- `DELETE /api/booking/delete/:bookingId` - Cancel booking

## 🛡️ Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected routes with middleware
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Dipanshu** - [@dipcoderr](https://github.com/dipcoderr)

## 🙏 Acknowledgments

- Thanks to all blood donors who save lives every day
- Bootstrap team for the amazing UI framework
- React.js community for excellent documentation
- MongoDB team for the robust database solution

---

**Made with ❤️ for saving lives through technology**