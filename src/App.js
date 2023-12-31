import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HackerNewsSearch from "./Components/HackerNewsSearch";
import Header from "./Components/Header";
import PostDetails from "./Components/PostDetails";
import Footer from "./Components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <div style={{ margin: "20px 20px" }}>
        <Routes>
          <Route path="/" element={<HackerNewsSearch />} />
          <Route path="/items/:objectID" element={<PostDetails />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
