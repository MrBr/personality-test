import React from "react";

import Questionnaire from "../index";
import { questions } from "./fixtures";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Questionnaire",
  component: Questionnaire,
};

export const Initial = () => (
  <Questionnaire
    questions={questions}
    onCancel={() => {}}
    onComplete={() => {}}
  >
    Questionnaire
  </Questionnaire>
);
