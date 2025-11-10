import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./Components/navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Community from "./pages/Community";
import Thread from "./pages/Thread";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Lesson from "./pages/Lesson";
import InstructorApply from "./pages/InstructorApply";
import InstructorDashboard from "./pages/InstructorDashboard";
import InstructorLessonEditor from "./pages/InstructorLessonEditor";
import ProtectedRoute from "./Components/ProtectedRoute";
import Certificate from "./Components/Certificate";

export default function Router() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/community" element={<Community />} />
              <Route path="/community/thread/:id" element={<Thread />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              <Route path="/lesson/:id" element={
                <ProtectedRoute>
                  <Lesson />
                </ProtectedRoute>
              } />
              
              <Route path="/instructor/apply" element={
                <ProtectedRoute>
                  <InstructorApply />
                </ProtectedRoute>
              } />
              
              <Route path="/instructor/dashboard" element={
                <ProtectedRoute requireInstructor>
                  <InstructorDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/instructor/lesson/new" element={
                <ProtectedRoute requireInstructor>
                  <InstructorLessonEditor />
                </ProtectedRoute>
              } />
              
              <Route path="/instructor/lesson/:id" element={
                <ProtectedRoute requireInstructor>
                  <InstructorLessonEditor />
                </ProtectedRoute>
              } />
              
              <Route path="/certificates/:id" element={
                <ProtectedRoute>
                  <Certificate />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}