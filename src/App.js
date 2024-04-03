import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PdfDetails from "./PdfDetails";
import CreatePdf from "./CreatePdf";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<CreatePdf />} />
        <Route path="/pdfDetails" element={<PdfDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
