import logo from "./logo.svg";
import "./App.css";
import TeacherList from "./components/teacherList.jsx";
import TeacherPos from "./components/teacherPos/teacherPos.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainScreen from "./screens/MainScreen.jsx";

function App() {
  return <MainScreen />;
}

export default App;
