// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MultiStepForm from "./pages/MultiStepForm";
import Posts from "./pages/Posts";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MultiStepForm />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </Router>
  );
};

export default App;
