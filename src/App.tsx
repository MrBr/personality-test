import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { Paths } from "./constants";
import Landing from "./pages/landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Paths.Home} element={<Landing />} />
        <Route path={Paths.Quiz} element={<div>Quiz</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
