// App.jsx (Main App Component)
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import UserDashboard from "./pages/UserPages/Dashboard";
import ProfilePage from "./pages/UserPages/ProfilePage";
import Dashboard from "./pages/AdminPages/Dashboard";
import UserPage from "./pages/UserPages/UserPage";
import Users from "./pages/AdminPages/Users";
import CalendarPage from "./pages/UserPages/CalendarPage";
import AuthProvider from "./contexts/AuthContext";
import NotificationsPage from "./pages/UserPages/NotificationsPage";
import NotificationProvider from "./contexts/NotificationContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import ManageUsers from "./pages/AdminPages/ManageUsers";
import ManageTasks from "./pages/AdminPages/ManageTasks";
import Settings from "./pages/AdminPages/Settings";
import ResetPassword from "./components/auth/ResetPassword";
import PublicRoute from "./components/routes/PublicRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import Tasks from "./pages/Tasks";
import UserTasks from "./pages/UserPages/UserTasks";
function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />

            {/* Pubilc Routes */}
            <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
            <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />

            {/* Private Routes */}
            <Route path="/" element={<PrivateRoute><Landing /></PrivateRoute>} />
            <Route path="/task-list" element={<PrivateRoute><Tasks /></PrivateRoute>} />
            <Route path="/user/userpage" element={<PrivateRoute><UserPage /></PrivateRoute>} />
            <Route path="/user/tasks" element={<PrivateRoute><UserTasks /></PrivateRoute>} />
            <Route path="/user/notifications" element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
            <Route path="/user/calendar" element={<PrivateRoute><CalendarPage /></PrivateRoute>} />
            <Route path="/user/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/admin/users" element={<PrivateRoute><Users /></PrivateRoute>} />
            <Route path="/admin/manage-users" element={<PrivateRoute><ManageUsers /></PrivateRoute>} />
            <Route path="/admin/manage-tasks" element={<PrivateRoute><ManageTasks /></PrivateRoute>} />
            <Route path="/admin/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />


          </Routes>
          <Footer />
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
