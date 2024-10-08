import React from "react";
import DocumentEditor from "./components/DocumentEditor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DocPage from "./pages/DocPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={DocPage}></Route>
        <Route path="/editor" exact Component={DocumentEditor}></Route>
      </Routes>
    </Router>
  );
}

export default App;
