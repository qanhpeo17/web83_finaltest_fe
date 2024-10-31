import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeacherList from "../components/teacherList.jsx";
import TeacherPos from "../components/teacherPos/teacherPos.jsx";
import CreateTeacher from "../components/CreateTeacherForm/CreateTeacher.jsx";
import CreatePosition from "../components/CreatePositionForm/CreatePosition.jsx";
function MainScreen() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<TeacherList />} />
          <Route path="/teacher-positions" element={<TeacherPos />} />
          <Route path="/create-teacher" element={<CreateTeacher />} />
          <Route path="/create-teacher-position" element={<CreatePosition />} />
        </Routes>
      </Router>
    </div>
  );
}

export default MainScreen;
