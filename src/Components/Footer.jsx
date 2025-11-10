import React from "react";

/*
  Footer placed at path expected by router import.
  If you already have Components/Footer.jsx, this keeps import paths consistent.
*/
export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600">
        © {new Date().getFullYear()} Victor Robotics — Built for learning. <a className="text-sky-600" href="#">Terms</a> • <a className="text-sky-600" href="#">Privacy</a>
      </div>
    </footer>
  );
}