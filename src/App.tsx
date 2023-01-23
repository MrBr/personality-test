import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { QuestionsProvider } from "./contexts/questions";

import { Paths } from "./constants";
import Landing from "./pages/landing";
import Quiz from "./pages/quiz";

function App() {
  return (
    <QuestionsProvider>
      <BrowserRouter>
        <Routes>
          <Route path={Paths.Home} element={<Landing />} />
          <Route path={Paths.Quiz} element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </QuestionsProvider>
  );
}

export default App;
